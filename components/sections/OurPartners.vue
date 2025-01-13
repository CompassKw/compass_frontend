<template>
  <section>
    <UISectionTitle class="mb-8">
      {{ t("our_partners_section.our_partners") }}
    </UISectionTitle>
    <Swiper
      class="p-[20px_!important]"
      :modules="[SwiperAutoplay]"
      :breakpoints="{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }"
      :loop="true"
      :prevent-clicks="false"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true,
      }"
      :speed="500"
    >
      <SwiperSlide v-for="partner in partners" :key="partner.id">
        <NuxtImg :src="partner.image" class="h-[90px] w-full" alt="" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl") as string;
const partners = ref<Partner[]>([]);
const { data } = await useAuthFetch<Api>(`${BaseUrl}/partner`);
partners.value = data.value?.data.partiners as Partner[];
</script>
