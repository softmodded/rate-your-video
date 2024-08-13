<script setup>
const router = useRouter();

const goTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div>
    <div class="flex">
      <div class="absolute top-[20%] w-full">
        <h1 class="font-bold text-4xl">rateyv</h1>
        <p class="absolute top-10 w-[100%]">rate your video</p>
      </div>
      <div class="absolute top-[22.5%] w-full text-right">
        <h1 @click="goTo('/videos/top')" class="text-xl link">check it out ></h1>
      </div>
    </div>

  </div>
</template>
