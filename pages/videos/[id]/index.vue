<script setup>
const client = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const videoId = route.params.id;
const video = ref(null);
const reviews = ref(null);

onMounted(async () => {
  const { data, error } = await client
    .from("videos")
    .select()
    .eq("youtube_id", videoId);
  if (error) {
    console.error(error);
    router.push("/");
  } else {
    video.value = data[0];
    setTimeout(() => {
      handleLine();
    }, 150);

    const reviewRaw = await client
      .from("reviews")
      .select()
      .eq("video", video.value.id);
    reviews.value = reviewRaw.data.slice(0, 5);
  }
});

function handleLine() {
  const line = document.getElementById("line");
  line.style.width = `${video.average}%`;

  console.log(video.value.average);

  // if the average is 100-80, the color is green
  if (video.value.average >= 80) {
    line.style.backgroundColor = "#b4f1b4";
  }

  // if the average is 79-60, the color is yellow
  if (video.value.average < 80 && video.value.average >= 60) {
    line.style.backgroundColor = "#f5cdff";
  }

  // if the average is 59-40, the color is orange
  if (video.value.average < 60 && video.value.average >= 40) {
    line.style.backgroundColor = "#ff9f9f";
  }

  // if the average is 39-0, the color is red
  if (video.value.average < 40) {
    line.style.backgroundColor = "#ff9f9f";
  }
}

function goto(path) {
  router.push(path);
}
</script>

<template>
  <div>
    <div v-if="video">
      <div class="flex justify-items-stretch">
        <div>
          <h1>
            > <strong>{{ video.youtube_data.title }}</strong>
          </h1>
          <h1 class="mt-2">
            > uploaded by <strong>{{ video.youtube_data.channel.name }}</strong>
          </h1>
          <iframe
            :src="
              'https://www.youtube-nocookie.com/embed/' +
              video.youtube_id +
              '?loop=1&modestbranding=1&rel=0&cc_load_policy=1&color=white&controls=0&disablekb=1&playlist=' +
              video.youtube_id +
              ''
            "
            width="400"
            height="225"
            :title="video.youtube_data.title"
            frameborder="0"
            allowfullscreen
            class="mt-4"
          ></iframe>
          <p class="link mt-5" @click="goto('/videos/' + video.youtube_id + '/reviews')">see all reviews ></p>
        </div>

        <div class="rightscore text-right">
          <h1 class="text-right text-4xl">{{ video.average }}</h1>
          <p class="text-right mb-10">average score</p>
          <div class="w-[10vw] mb-10 line-container">
            <div id="line" class="line"></div>
          </div>
          <div class="mt-10">
            <review
              v-for="review in reviews"
              :key="review.id"
              :review="review"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="text-center mx-auto" v-if="!video">loading...</p>
    </div>
  </div>
</template>

<style scoped>
.rightscore {
  width: 28vw;
  font-weight: bold;
}

.line {
  height: 10px;
  background-color: #f5cdff;
  border-radius: 2px;
}

.line-container {
  width: 10vw;
  height: 10px;
  background-color: #2e293b;
  border-radius: 2px;
  margin-top: 1rem;
  position: absolute;
  top: 17vh;
  right: 2vw;
}
</style>
