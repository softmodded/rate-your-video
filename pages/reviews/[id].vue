<script setup>
const client = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const reviewId = route.params.id;
const review = ref(null);
const video = ref(null);

onMounted(async () => {
  const { data, error } = await client
    .from("reviews")
    .select()
    .eq("id", reviewId);
  if (error) {
    console.error(error);
    router.push("/");
  } else {
    review.value = data[0];

    const { data: videoData, error: videoError } = await client
      .from("videos")
      .select()
      .eq("id", review.value.video);

    if (videoError) {
      console.error(videoError);
      router.push("/");
    } else {
      video.value = videoData[0];
    }
  }
});

function goto(path) {
  router.push(path);
}

function newTab(url) {
  window.open(url, "_blank");
}
</script>

<template>
  <div>
    <div v-if="review">
        <h1>review from {{ review.user.username }}</h1>
        <p class="my-5 font-bold">{{ review.title }}</p>
        <p class="my-5">{{ review.content }}</p>
        <p class="my-5">rating: {{ review.rating }}/100</p>
        <p class="link" @click="newTab('https://youtube.com/watch?v=' + video.youtube_id)">video: <strong>{{ video.youtube_data.title }}</strong> by <strong>{{ video.youtube_data.channel.name }}</strong></p>
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
          <p class="link mt-5" @click="goto('/videos/' + video.youtube_id + '/reviews')">< see all reviews</p>
    </div>
    <div v-else>
        <h1>loading...</h1>
    </div>
  </div>
</template>
