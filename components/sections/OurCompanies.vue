<template>
  <section>
    <UISectionTitle class="mb-8">
      {{ t("our_companies_section.our_companies") }}
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
          slidesPerView: 4,
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
      <SwiperSlide v-for="company in companies" :key="company.id">
        <NuxtImg :src="company.image" class="h-20 w-full" alt="" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl") as string;
const companies = ref<Company[]>([]);
const { data } = await useAuthFetch<Api>(`${BaseUrl}/companies`);
companies.value = data.value?.data.companies as Company[];
</script>
