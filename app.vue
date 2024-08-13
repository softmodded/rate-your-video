<script setup>
const openPopup = useState("openLogin");

const closePopup = () => {
  openPopup.value = false;
};

const openLogin = () => {
  openPopup.value = true;
};
</script>

<template>
  <div>
    <PopupsLogin />
    <div class="layout">
      <Navagation />
      <div class="main-container">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");

:root {
  --site-background-color: #201927;

  --site-card-background-color: #201927;
  --site-card-border-color: #2e293b;

  --site-general-text-color: #e1dede;
  --site-secondary-text-color: #adadad;

  --site-pill-color: #2e2736;
  --site-pill-hover-color: #483e56;

  --site-links-color: #d4cdff;
  --site-links-color-hover: #cba8f9;
}

body,
html {
  color: var(--site-general-text-color);
  font-size: 16px;
  line-height: 15px;
  font-family: "IBM Plex Mono", sans-serif;
  background: var(--site-background-color);
  height: 100%;
  margin: 0;
}

.layout {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 900px;
  background-color: var(--site-card-background-color);
  border: 3px solid var(--site-card-border-color);
  border-radius: 10px;
}

@media screen and (max-width: 1900px) {
  .layout {
    width: 100%;
    height: 100%;
    max-width: 900px;
    max-height: 100%;
    border-radius: 0px;
    border: 0px;
  }
  body,
  html {
    background-color: var(--site-card-background-color);
  }
}

.main-container {
  display: flex;
  flex: 2;
  padding: 20px;
  max-height: 100%;
  /* background-color: #2c22314f; */
  overflow: auto;
}

.link {
  color: var(--site-links-color);
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
  user-select: none;
}

.link:hover {
  color: var(--site-links-color-hover);
  text-decoration: underline;
}
</style>
