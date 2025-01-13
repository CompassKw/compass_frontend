<template>
  <div class="flex flex-col justify-between min-h-screen">
    <NavBar :logo="about?.logo || ''" />
    <div>
      <slot />
    </div>
    <TheFooter :about="about" />
  </div>
</template>

<script setup lang="ts">
const BaseUrl = "https://thecompasskw.store/api";
provide("BaseUrl", BaseUrl);

const about = ref({}) as Ref<About>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/brief-about`);
about.value = data.value?.about as About;
const logo = ref(about.value?.logo || "");
provide("logo", logo);
useHead({
  titleTemplate: "%s - COMPASS",
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/icon",
      href: `${logo}`,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<style>
@tailwind components;
body {
  @apply text-first font-Jost;
}
html {
  scroll-behavior: smooth;
}

body {
  scroll-behavior: smooth;
}

span {
  text-wrap: wrap;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #2262ad;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: #dddddd;
}

.swiper-pagination {
  bottom: 0px !important;
}

.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  background-color: #dddddd;
}

.swiper-pagination-bullet-active {
  width: 8px;
  height: 8px;
  background-color: #3554d1;
}

.swiper-button-prev,
.swiper-button-next {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 10px 35px 0px #0510361a;
  color: #051036;
  &::after {
    font-size: 20px;
  }
}

.swiper-button-prev {
  left: 0px;
}

.swiper-button-next {
  right: 0px;
}

.product-slider {
  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }
}

@layer components {
  .nav-item {
    @apply lab:py-12 relative smart:w-full;
  }

  .nav-link {
    @apply lab:nav-link-md smart:nav-link-minsmart;
  }

  .nav-link-md {
    @apply font-medium text-lg hover:text-secondary hover:font-semibold transition-all duration-300 block;
  }

  .nav-link-minsmart {
    @apply flex items-center gap-x-5 py-3 pe-4 w-full;
  }

  .active {
    @apply smart:active-minsmart after:absolute after:bg-third after:start-0 text-third hover:text-third;
  }

  .active-minsmart {
    @apply px-4 bg-[#FFF7F2] after:w-[6px] after:h-4/5 after:top-1/2 after:-translate-y-1/2 after:rounded-md rounded-lg font-medium;
  }

  .row {
    @apply flex flex-wrap flex-row justify-between;
  }

  .btn {
    @apply w-full p-2 md:text-xl font-medium block text-center md:rounded-lg minsmart:rounded text-nowrap;
  }

  .menu-bar {
    @apply bg-[#FFF3E9] absolute top-0 start-0 h-screen w-2/3 px-7 flex flex-col justify-evenly;
  }
}
</style>
