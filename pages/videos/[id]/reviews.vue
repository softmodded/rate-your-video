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
    <div v-if="video" class="text-center">
      <div class="flex justify-items-stretch">
        <div class="text-center">
          <h1 class="text-center text-4xl">{{ video.average }}</h1>
          <p class="text-center">average score</p>
          <div class="w-[10vw] mt-5 line-container">
            <div id="line" class="line"></div>
          </div>
          <div class="mt-10 grid grid-cols-3 gap-2">
            <review
              v-for="review in reviews"
              :key="review.id"
              :review="review"
              class="my-2"
            />
          </div>
        </div>
      </div>
      <p class="link mt-5" @click="goto('/videos/' + video.youtube_id )">< go back</p>
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
  margin: 0 auto;
  margin-top: 0.5rem;
}
</style>
