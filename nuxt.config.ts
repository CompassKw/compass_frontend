// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@vesp/nuxt-fontawesome",
    "nuxt-swiper",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "ar",
        iso: "ar-EG",
        name: "العربية",
        file: "ar.json",
      },
    ],
    defaultLocale: "en",
  },
  fontawesome: {
    icons: {
      solid: [
        "location-dot",
        "magnifying-glass",
        "circle",
        "chevron-right",
        "chevron-left",
        "xmark",
        "check",
        "minus",
        "plus",
      ],
      regular: ["clock"],
      brands: [
        "apple",
        "google-play",
        "facebook-f",
        "twitter",
        "instagram",
        "youtube",
      ],
    },
  },
  colorMode: {
    preference: "light",
  },
  image: {
    dir: "public/assets/images",
  },
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
    },
  },
  routeRules: {
    "/blog/**": { prerender: false },
    "/group-trips/**": { prerender: false },
    "/private-trips/**": { prerender: false },
    "/rules/**": { prerender: false },
    "/rest/**": { prerender: false },
    "/login/**": { prerender: false },
    "/store/**": { prerender: false },
    "/cart/**": { prerender: false },
    "/booking/**": { prerender: false },
    "/search-page/**": { prerender: false },
    "/payment.vue": { prerender: false },
    "/index.vue": { prerender: false },
  },
});
