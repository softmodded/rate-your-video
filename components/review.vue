<script setup>
const props = defineProps({
  review: Object,
});

const router = useRouter();

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

function goto(path) {
  router.push(path);
}
</script>

<template>
  <div class="main-r" @click="goto('/reviews/' + review.id)">
    <div class="flex justify-between">
      <h1>{{ review.title }}</h1>
      <h1>{{ review.rating }}</h1>
    </div>
    <p class="cnt mt-3 text-sm">{{ truncate(review.content, 200) }}</p>

    <div class="mt-3">
      <p class="text-xs">by {{ review.user.username }}</p>
    </div>
  </div>
</template>

<style scoped>
.main-r {
  background-color: #30263a;
  margin-left: 10%;
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.3s;
  text-align: left;
}

.main-r:hover {
  background-color: #3a2f4b;
}

.cnt {
  color: #bdc3c9;
  font-family: "IBM Plex Mono", sans-serif;
}
</style>
