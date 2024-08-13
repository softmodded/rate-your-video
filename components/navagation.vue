<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  text-align: center;
  border-bottom: 1px solid var(--site-card-border-color);
  margin-inline: 20px;
}

.header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-links {
  display: flex;
  gap: 10px;
}

.header-links a {
  color: var(--site-links-color);
  text-decoration: none;
  transition: color 0.3s;
}

.header-links a:hover {
  color: var(--site-links-color-hover);
  text-decoration: underline;
}

.random-text {
  display: flex;
  align-items: center;
}
</style>

<script setup>
const router = useRouter();
const openLogin = useState("openLogin");
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const goto = (path) => {
  router.push(path);
};

const openLoginPopup = () => {
  openLogin.value = true;
};

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/");
};
</script>

<template>
  <header class="select-none">
    <div class="header-container">
      <div class="random-text header-links">
        <a class="cursor-pointer" @click="goto('/')">
          <strong>rateyv</strong>
        </a>
      </div>
      <div class="header-content">
        <div class="header-links">
          <a class="cursor-pointer" @click="goto('/')">[ home ]</a>
          <a class="cursor-pointer" @click="goto('/videos/top')">[ videos ]</a>
          <a class="cursor-pointer" @click="goto('/reviews/submit')">[ submit ]</a>
          <a class="cursor-pointer" v-if="!user" @click="openLoginPopup()">[ login ]</a>
          <a class="cursor-pointer" v-if="user" @click="logout()">[ logout ]</a>
        </div>
      </div>
    </div>
  </header>
</template>
