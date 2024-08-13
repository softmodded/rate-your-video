<template>
  <div v-if="openLogin" class="popup">
    <div class="popup-content">
      <div>
        <h1 class="text-center text-gray-400">[ login ]</h1>

        <div
          class="text-center mx-auto w-[100%] select-none grid justify-items-center mt-8"
        >
          <div class="flex link text-center" @click="login('discord')">
            <Icon
              name="ic:baseline-discord"
              class="h-5 w-5 bg-[#d4cdff] mr-1"
            />
            <a class="text-center">[ log in with discord ]</a>
          </div>
          <div class="flex link text-center py-3" @click="login('github')">
            <Icon
              name="tabler:brand-github"
              class="h-5 w-5 bg-[#d4cdff] mr-1"
            />
            <a class="text-center">[ log in with github ]</a>
          </div>
          <div class="flex link text-center" @click="login('google')">
            <Icon
              name="tabler:brand-google-filled"
              class="h-5 w-5 bg-[#d4cdff] mr-1"
            />
            <a class="text-center">[ log in with google ]</a>
          </div>
        </div>
      </div>
      <a
        class="link text-center mx-auto absolute bottom-5 left-[39%]"
        @click="closePopup"
        >[ cancel ]</a
      >
    </div>
  </div>
</template>

<script setup>
const openLogin = useState("openLogin");
const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const closePopup = () => {
  openLogin.value = false;

  if (route.path === "/login") {
    router.push("/");
  }
};

const login = (provider) => {
  supabase.auth.signInWithOAuth({ provider });
};
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2f2539;
  padding: 20px;
  border-radius: 10px;
  width: 25%;
  height: 30%;
}
</style>
