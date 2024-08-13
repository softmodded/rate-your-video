<script setup>
const client = useSupabaseClient();
const router = useRouter();

const videos = ref(null);

onMounted(async () => {
  // get 40 random videos
  const { data, error } = await client
    .from("videos")
    .select()
    .order("average", { ascending: false })
    .limit(40);

  if (error) {
    console.error(error);
  } else {
    videos.value = data;
  }
});

function goto(path) {
  router.push(path);
}
</script>

<template>
  <div>
    <h1>videos</h1>
    <div class="select-none">
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
            <p class="mt-3 ml-5">> uploaded by {{ video.youtube_data.channel.name }}</p>
            <p class="mt-3 ml-5">> average score: {{ video.average }}</p>
            <p class="mt-3 ml-5">> {{ video.youtube_data.views.text }}</p>
            <p class="mt-3 ml-5">> uploaded on {{ video.youtube_data.published.pretty }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hover:hover {
  transform: scale(1.05);
}
</style>
