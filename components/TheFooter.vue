<template>
  <section class="bg-[#0D2857]">
    <div class="container py-7 text-white">
      <div
        class="grid md:grid-cols-2 grid-cols-1 lab:gap-x-72 tab:gap-x-36 minsmart:gap-10"
      >
        <div>
          <div class="w-1/2">
            <NuxtImg
              :src="about?.logo || ''"
              class="shadow-logo w-full mb-7"
              alt="logo"
            />
          </div>
          <div class="flex justify-between mb-14">
            <div>
              <small class="mb-3 block">{{
                t("footer.customer_service")
              }}</small>
              <p class="text-lg font-medium">{{ about?.whatsapp_link }}</p>
            </div>
            <div>
              <small class="mb-3 block">{{ t("footer.live_support") }}</small>
              <p class="text-lg font-medium">info@compasskw.com</p>
            </div>
          </div>
          <div class="mb-16">
            <p class="font-medium mb-4">{{ t("footer.download_app") }}</p>
            <div class="flex justify-between gap-10">
              <a
                href="#"
                class="basis-1/2 bg-white bg-opacity-10 rounded flex justify-evenly items-center p-2"
              >
                <span class="text-3xl">
                  <font-awesome :icon="['fab', 'apple']" />
                </span>
                <div>
                  <small>{{ t("footer.download_on") }}</small>
                  <p class="text-[15px] font-medium">
                    {{ t("footer.apple_store") }}
                  </p>
                </div>
              </a>
              <a
                href="#"
                class="basis-1/2 bg-white bg-opacity-10 rounded flex justify-evenly items-center p-2"
              >
                <span class="text-3xl">
                  <font-awesome :icon="['fab', 'google-play']" />
                </span>
                <div>
                  <small>{{ t("footer.get_it_on") }}</small>
                  <p class="text-[15px] font-medium">
                    {{ t("footer.google_play") }}
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div>
            <p class="font-medium mb-4">{{ t("footer.follow_social") }}</p>
            <div class="flex justify-start gap-2 w-1/2">
              <a
                :href="about?.facebook_link"
                class="hover:bg-white hover:bg-opacity-10 transition-all rounded-full flex justify-center items-center w-10 h-10"
              >
                <span class="text-xl">
                  <font-awesome :icon="['fab', 'facebook-f']" />
                </span>
              </a>
              <a
                :href="about?.twitter_link"
                class="hover:bg-white hover:bg-opacity-10 transition-all rounded-full flex justify-center items-center w-10 h-10"
              >
                <span class="text-xl">
                  <font-awesome :icon="['fab', 'twitter']" />
                </span>
              </a>
              <a
                :href="about?.instagram_link"
                class="hover:bg-white hover:bg-opacity-10 transition-all rounded-full flex justify-center items-center w-10 h-10"
              >
                <span class="text-xl">
                  <font-awesome :icon="['fab', 'instagram']" />
                </span>
              </a>
              <a
                :href="about?.youtube_link"
                class="hover:bg-white hover:bg-opacity-10 transition-all rounded-full flex justify-center items-center w-10 h-10"
              >
                <span class="text-xl">
                  <font-awesome :icon="['fab', 'youtube']" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div class="mb-16 pt-8">
            <p class="font-medium mb-4">{{ t("footer.get_updates") }}</p>
            <div
              class="py-4 px-6 bg-white rounded flex justify-between items-center"
            >
              <input
                type="text"
                :placeholder="t('footer.your_email')"
                class="w-3/4 bg-transparent border-none focus:outline-none text-[#697488]"
              />
              <button class="text-[#051036] underline">
                {{ t("footer.subscribe") }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-10">
            <div>
              <p class="font-medium mb-4">{{ t("footer.company") }}</p>
              <ul class="list-none flex flex-col gap-4 text-sm">
                <li>
                  <NuxtLink
                    :to="localPath('/about-us')"
                    class="hover:underline"
                    >{{ t("nav.about_us") }}</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    :to="localPath('/private-trips')"
                    class="hover:underline"
                    >{{ t("nav.private_trips") }}</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink :to="localPath('/blog')" class="hover:underline">{{
                    t("footer.articles")
                  }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localPath('/store')" class="hover:underline">{{
                    t("nav.store")
                  }}</NuxtLink>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-medium mb-4">{{ t("footer.support") }}</p>
              <ul class="list-none flex flex-col gap-4 text-sm">
                <li>
                  <NuxtLink
                    :to="localPath('/rules/General-Terms-of-Use')"
                    class="hover:underline"
                    >{{ t("nav.terms") }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const props = defineProps(["about"]);
const about = ref(props.about) as Ref<About>;
</script>
