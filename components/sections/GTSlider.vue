<template>
  <section>
    <div class="container">
      <UISectionTitle>
        {{ t("gt_slider_section.most_trending_group_tours") }}
      </UISectionTitle>
      <Swiper
        class="p-[20px_!important]"
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
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
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :a11y="{
          enabled: true,
          prevSlideMessage: t('gt_slider_section.previous_slide'),
          nextSlideMessage: t('gt_slider_section.next_slide'),
        }"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: true,
        }"
        :speed="500"
      >
        <SwiperSlide v-for="tour in tours" :key="tour.id">
          <UITourCard :tour="tour" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl") as string;
const tours = ref<Trip[]>([]);
const { data } = await useAuthFetch<Api>(
  `${BaseUrl}/trips?filter[is_trending]=1`
);
tours.value = data.value?.data.trips as Trip[];
</script>
