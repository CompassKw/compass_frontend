<template>
  <section class="w-full bg-downloadbannar bg-[100%_100%] bg-no-repeat">
    <div class="grid lab:grid-cols-2 tab:grid-cols-1 smart:py-5 items-center">
      <div>
        <div class="w-3/4 mx-auto">
          <NuxtImg src="appScreens.svg" class="w-full" alt="" />
        </div>
      </div>
      <div>
        <div class="w-2/3 mob:w-full mob:px-4 mx-auto text-white">
          <h2 class="text-4xl font-bold">
            {{ t("download_app.download_our_app") }}
          </h2>
          <p class="font-extrabold mb-5">
            {{ t("download_app.available_on_ios_and_android") }}
          </p>
          <p class="font-semibold mb-10">
            {{
              t(
                "download_app.you_can_book_and_manage_your_booking_easily_from_the_app"
              )
            }}
          </p>
          <div class="flex mob:flex-wrap justify-between gap-5">
            <div class="basis-1/2 mob:basis-full">
              <a
                href="#"
                class="btn bg-third flex items-center justify-center gap-2 shadow-btn"
              >
                <div class="flex items-center justify-center gap-2 py-2">
                  <span><font-awesome :icon="['fab', 'apple']" /></span>
                  <span class="">{{ t("download_app.download_for_ios") }}</span>
                </div>
              </a>
            </div>
            <div class="basis-1/2 mob:basis-full">
              <a
                href="#"
                class="btn bg-third flex items-center justify-center gap-2 shadow-btn"
              >
                <div class="flex items-center justify-center gap-2 py-2">
                  <span><font-awesome :icon="['fab', 'google-play']" /></span>
                  <span class="text-lg">
                    {{ t("download_app.download_for_android") }}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
