<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const youtubeUrl = ref("");
const valid = ref(null);
const videoLoaded = ref(false);
const videoData = ref(null);
const rating = ref(null);
const title = ref("");
const content = ref("");
const uploadError = ref("");
const validScore = ref(true);


function formatSeconds(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

function validateYoutubeVideoUrl() {
  const youtubeVideoRegex =
    /^(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]+)$/;
  if (youtubeVideoRegex.test(youtubeUrl.value)) {
    fetchVideo();
  }
}

async function fetchVideo() {
  videoLoaded.value = false;
  const videoId = youtubeUrl.value.split("v=")[1];
  const data = await $fetch("/api/v1/video/" + videoId);
  if (!data.id) {
    valid.value = false;
    return;
  }

  valid.value = true;
  videoData.value = data;
  videoLoaded.value = true;
}

const newTab = (url) => {
  window.open(url, "_blank");
};

const cutHttpAndWww = (url) => {
  // cut https://www.
  return url.slice(12);
};

const inputUrlChange = () => {
  const url = youtubeUrl.value;
  if (url.includes("https://www.")) {
    youtubeUrl.value = cutHttpAndWww(url);
  }
};

async function submitReview() {
  if (!title.value || !content.value || !rating.value) {
    uploadError.value = "missing fields";
    return;
  }
  uploadError.value = "";

  let video = await client
    .from("videos")
    .select("*")
    .eq("youtube_id", videoData.value.id);
  if (video?.data?.length == 0) {
    const vid = {
      youtube_id: videoData.value.id,
      youtube_data: videoData.value,
      average: rating.value,
    };
    await client.from("videos").insert(vid);

    video = await client
      .from("videos")
      .select("*")
      .eq("youtube_id", videoData.value.id).data[0];
  } else {
    video = video.data[0];
    // push the new youtube data
    await client
      .from("videos")
      .update({ youtube_data: videoData.value })
      .eq("id", video.id);

    // update the average
    const reviews = await client
      .from("reviews")
      .select("rating")
      .eq("video", video.id);

    let total = 0;
    for (let i = 0; i < reviews.data.length; i++) {
      total += reviews.data[i].rating;
    }

    const average = total / reviews.data.length;

    await client
      .from("videos")
      .update({ average: average })
      .eq("id", video.id);
      
  }


  const review_data = {
    title: title.value,
    content: content.value,
    rating: rating.value,
    user: {
        id: user.value.id,
        username: user.value.user_metadata.full_name,
    },
    video: video.id,
  };

  const review = await client.from("reviews").insert(review_data);
  if (review.error) {
    uploadError.value = review.error.message;
    return;
  }

  router.push("/videos/" + video.youtube_id);
}
</script>

<template>
  <div class="main">
    <div class="grid grid-flow-col justify-stretch">
      <div>
        <h1 class="mb-4">submit a review</h1>
        <div class="divider"></div>
        <p>video url</p>
        <input
          type="text"
          class="mt-3"
          placeholder="youtube.com/"
          v-model="youtubeUrl"
          @change="validateYoutubeVideoUrl"
          @input="validateYoutubeVideoUrl"
          @keydown="inputUrlChange"
        />
        <p v-if="!valid" class="mt-3 text-red-400">> invalid youtube url</p>
        <p v-if="valid" class="mt-3 text-green-400">> valid youtube url</p>
        <div v-if="valid" class="mt-3">
            <p class="my-2.5">> {{ videoData.views.text }}</p>
            <p class="my-2.5">> published on {{ videoData.published.pretty }}</p>
            <p class="my-2.5">> uploaded by {{ videoData.channel.name }}</p>
            <p class="my-2.5">> {{ videoData.channel.subscribers.pretty }}</p>
            <p class="my-2.5">> {{ videoData.category.toLowerCase() }}</p>
            <p class="my-2.5">> {{ formatSeconds(videoData.duration.lengthSec) }}</p>
        </div>
      </div>
      <div class="mx-auto pl-10 w-[400px]">
        <div v-if="valid">
          <LoadersSpinner v-if="!videoLoaded" class="mt-5" />
          <div class="mt-5" v-if="videoLoaded">
            <p
              class="link"
              @click="newTab('https://youtube.com/watch?v=' + videoData.id)"
            >
              <strong>{{ videoData.title }}</strong> by
              <strong>{{ videoData.channel.name }}</strong>
            </p>

            <iframe
              :src="
                'https://www.youtube-nocookie.com/embed/' +
                videoData.id +
                '?loop=1&modestbranding=1&rel=0&cc_load_policy=1&color=white&controls=0&disablekb=1&playlist=' +
                videoData.id +
                ''
              "
              width="400"
              height="225"
              :title="videoData.title"
              frameborder="0"
              allowfullscreen
              class="mt-4"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10" v-if="valid">
      <div class="divider"></div>
      <p class="mt-5">review title</p>
      <div class="flex">
        <input
          type="text"
          class="mt-3 w-[20vw]"
          placeholder="very good review"
          v-model="title"
        />
        <input
          type="text"
          class="mt-3 w-[5vw] ml-4"
          placeholder="score"
          v-model="rating"
          @keypress="validScore = rating > 100"
        />
        <p
          v-if="!Number(rating) || rating > 100 || rating < 0"
          class="mt-[2.5vh] ml-4 text-red-400"
        >
          > invalid score (1-100)
        </p>
      </div>
      <input
        type="text"
        class="mt-3 pb-[20vh]"
        v-model="content"
        placeholder="review content"
      />
      <div class="divider"></div>
      <div class="flex">
        <button class="mt-3 link" @click="submitReview">submit</button>
        <p v-if="uploadError" class="mt-[1.5vh] ml-3 text-red-400">
          > {{ uploadError }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.divider {
  border-bottom: 1px solid #413a53;
  margin: 10px 0;
  width: 100%;
}

input {
  background-color: #2f2539;
  border: 1px solid #413a53;
  border-radius: 1px;
  color: #bdc3c9;
  font-size: 1rem;
  padding: 5px;
  width: 100%;
}

.main {
  width: 53vw;
}
</style>
