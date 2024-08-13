<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #bdc3c9;
  padding-top: 10%;
}

.error-page h1 {
  font-size: 5rem;
  margin-bottom: 2rem;
}

.error-page p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.error-page a {
  text-decoration: none;
  color: #f5cdff;
  font-size: 1.2rem;
}

.error-page a:hover {
  color: #ff88f3;
  text-decoration: underline;
}
</style>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>


<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p class="mt-3">{{ error.statusMessage || "An error occured" }}</p>
    <a class="link" @click="handleError">[ go home ]</a>
  </div>
</template>