<script setup>
const client = useSupabaseClient();
const router = useRouter();

const videos = ref(null);
const videosReplica = ref(null);
const query = ref("");

onMounted(async () => {
  // get 40 random videos
  const { data, error } = await client.from("videos").select();

  if (error) {
    console.error(error);
  } else {
    videos.value = data;
    videosReplica.value = data;
  }
});

function goto(path) {
  router.push(path);
}

async function searchTitle() {
  if (query.value === "") {
    videos.value = videosReplica.value;
    return;
  }

  const returnedVideos = [];

  for (let i = 0; i < videos.value.length; i++) {
    if (
      videos.value[i].youtube_data.title
        .toLowerCase()
        .includes(query.value.toLowerCase())
    ) {
      returnedVideos.push(videos.value[i]);
    }
  }

  videos.value = returnedVideos;
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1>videos</h1>
      <div class="pl-[24.5vw]">
        <input
          v-model="query"
          type="text"
          class="ml-5 w-[20vw]"
          placeholder="search..."
        />
        <button @click="searchTitle" class="ml-2 link">search</button>
      </div>
    </div>
    <div class="select-none" v-if="videos">
      <div
        v-for="video in videos"
        :key="video.id"
        class="mt-5 cursor-pointer transition-all hover"
        @click="goto('/videos/' + video.youtube_id)"
      >
        <div class="flex">
          <div class="relative">
            <img
              :src="video.youtube_data.thumbnails[4].url"
              class="rounded-lg w-[20vw]"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white"
            ></div>
          </div>
          <div>
            <p class="mt-3 ml-5">{{ video.youtube_data.title }}</p>
            <p class="mt-3 ml-5">
              > uploaded by {{ video.youtube_data.channel.name }}
            </p>
            <p class="mt-3 ml-5">> average score: {{ video.average }}</p>
            <p class="mt-3 ml-5">> {{ video.youtube_data.views.text }}</p>
            <p class="mt-3 ml-5">
              > uploaded on {{ video.youtube_data.published.pretty }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="mt-5">loading...</p>
    </div>
  </div>
</template>

<style>
.hover:hover {
  transform: scale(1.05);
}

input {
  background-color: #2f2539;
  border: 1px solid #413a53;
  border-radius: 1px;
  color: #bdc3c9;
  font-size: 1rem;
  padding: 1px;
  width: 40%;
}
</style>
