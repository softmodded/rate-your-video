<script setup>
const currentChar = ref("|");

const chars = ["|", "/", "-", "\\"];

let i = 0;

setInterval(() => {
  currentChar.value = chars[i];
  i = i === chars.length - 1 ? 0 : i + 1;
}, 100);
</script>

<template>
    <p class="spinner">{{ currentChar }}</p>
</template>

<style>
.spinner {
  font-size: 2rem;
  color: #d4cdff;
  display: inline-block;
}
</style>