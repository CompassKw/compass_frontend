<template>
  <Swiper
    class="product-slider"
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="1"
    :loop="true"
    :prevent-clicks="false"
    :navigation="true"
    :a11y="{
      enabled: true,
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    }"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: true,
    }"
    :speed="500"
  >
    <SwiperSlide v-for="img in imgs">
      <NuxtImg :src="img" class="w-full h-[500px] rounded-xl" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
const props = defineProps(["images"]);
const imgs = ref(props.images) as Ref<string[]>;
</script>
