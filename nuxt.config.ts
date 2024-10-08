// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon", "@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      include: undefined,
      exclude: ['/', '/videos/top', '/videos/*', '/videos/*/reviews'],
      cookieRedirect: false,
    }
  },
})