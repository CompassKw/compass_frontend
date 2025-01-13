<template>
  <section class="py-16 bg-[linear-gradient(180deg,#FFFFFF_0%,#DAE2EE_100%)]">
    <UISectionTitle class="text-center mb-20">
      {{ t("reviews_testimonials_section.travelers_reviews_and_testimonials") }}
    </UISectionTitle>
    <div class="grid grid-cols-3 smart:grid-cols-1 items-stretch">
      <div>
        <div
          class="w-5/6 mx-auto flex flex-col justify-between h-full smart:hidden"
        >
          <div class="w-full">
            <NuxtImg
              src="5.png"
              class="w-[100px] h-[100px] rounded-full shadow-img ms-auto"
              alt=""
            />
          </div>
          <div class="w-full">
            <NuxtImg
              src="4.png"
              class="w-[75px] h-[75px] rounded-full shadow-img me-auto"
              alt=""
            />
          </div>
          <div class="w-full">
            <NuxtImg
              src="6.png"
              class="w-[80px] h-[80px] rounded-full shadow-img mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div class="w-5/6 mx-auto">
          <Swiper
            class="py-[25px_!important]"
            :modules="[SwiperAutoplay, SwiperPagination]"
            :slides-per-view="1"
            :loop="true"
            :prevent-clicks="false"
            :pagination="{
              clickable: true,
            }"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: true,
            }"
            :speed="500"
          >
            <SwiperSlide v-for="slide in 10" :key="slide">
              <div class="flex flex-col">
                <div class="mb-11">
                  <NuxtImg
                    src="user.png"
                    class="w-[100px] h-[100px] rounded-full shadow-img mx-auto"
                    alt=""
                  />
                </div>
                <h4 class="text-third text-center font-medium mb-5">
                  Khaled Al Nasser
                </h4>
                <p
                  class="text-first font-medium leading-7 text-center min-h-[85px] mb-10"
                >
                  "I have been traveling with this company for 5 years now and I
                  have never been disappointed. The guides are very professional
                  and the tours are very well organized."
                </p>
                <div class="text-center">
                  <p class="text-first font-medium text-[15px]">Hanadi</p>
                  <small class="text-fourth">Kuwait</small>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div>
        <div
          class="w-5/6 mx-auto flex flex-col justify-between h-full smart:hidden"
        >
          <div class="w-full">
            <NuxtImg
              src="2.png"
              class="w-[100px] h-[100px] rounded-full shadow-img ms-auto"
              alt=""
            />
          </div>
          <div class="w-full">
            <NuxtImg
              src="1.png"
              class="w-[75px] h-[75px] rounded-full shadow-img me-auto"
              alt=""
            />
          </div>
          <div class="w-full">
            <NuxtImg
              src="3.png"
              class="w-[80px] h-[80px] rounded-full shadow-img mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
