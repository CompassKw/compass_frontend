<template>
  <section>
    <div
      class="bg-[linear-gradient(180deg,#4B6D9B_0%,#FFFFFF_115.5%)] w-full py-[100px] text-center text-[#FFFFFF] mb-11"
    >
      <h3 class="text-[40px] font-semibold mb-4">
        {{ t("about.hero.title") }}
      </h3>
      <p>{{ t("about.hero.subtitle") }}</p>
    </div>
    <div class="container">
      <div class="text-center mb-16">
        <h4 class="text-3xl font-semibold mb-2">{{ t("about.why.title") }}</h4>
        <p class="text-fourth mb-10">
          {{ t("about.why.subtitle") }}
        </p>
        <div class="grid md:grid-cols-3 grid-cols-1">
          <div>
            <div class="w-3/4 mx-auto">
              <div class="flex justify-center items-center mb-8">
                <NuxtImg src="security.svg" width="70" height="70" />
              </div>
              <h5 class="text-lg font-medium mb-3">
                {{ t("about.why.price.title") }}
              </h5>
              <p class="text-fourth">{{ t("about.why.price.description") }}</p>
            </div>
          </div>
          <div>
            <div class="w-3/4 mx-auto">
              <div class="flex justify-center items-center mb-8">
                <NuxtImg src="page-speed.svg" width="70" height="70" />
              </div>
              <h5 class="text-lg font-medium mb-3">
                {{ t("about.why.booking.title") }}
              </h5>
              <p class="text-fourth">
                {{ t("about.why.booking.description") }}
              </p>
            </div>
          </div>
          <div>
            <div class="w-3/4 mx-auto">
              <div class="flex justify-center items-center mb-8">
                <NuxtImg src="customer-service.svg" width="70" height="70" />
              </div>
              <h5 class="text-lg font-medium mb-3">
                {{ t("about.why.support.title") }}
              </h5>
              <p class="text-fourth">
                {{ t("about.why.support.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 items-center my-11">
        <div class="flex flex-col gap-4">
          <h5 class="text-[#2262AD] text-lg font-semibold">
            {{ t("about.contact.title") }}
          </h5>
          <div>
            <span>{{ t("about.contact.email") }}: </span>
            <a :href="'mailto:' + about.email" class="text-[#F75D37]">
              {{ about.email }}
            </a>
          </div>
          <div>
            <span>{{ t("about.contact.collaboration") }}: </span>
            <a :href="'mailto:' + about.collaboration" class="text-[#F75D37]">
              {{ about.collaboration }}
            </a>
          </div>
          <div>
            <span>{{ t("about.contact.phone") }}: </span>
            <a :href="'tel:' + about.phone" class="text-[#F75D37]">
              {{ about.phone }}
            </a>
          </div>
        </div>
        <a :href="about.location" target="_blank">
          <NuxtImg src="Rectangle 4532.svg" class="w-full shadow-crad" />
        </a>
      </div>
    </div>
    <SectionsOurAchievements />
    <div class="container my-12 text-wrap">
      <h3 class="text-[40px] font-semibold mb-4">
        {{ t("about.company.title") }}
      </h3>
      <div v-html="about.description"></div>
    </div>
    <div class="container">
      <SectionsOurPartners />
      <SectionsOurCompanies class="mb-20" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl");
const about = ref({}) as Ref<AboutPage>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/about`);
about.value = data.value?.data.about as AboutPage;

useSeoMeta({
  title: t("about.seo.title"),
  description: t("about.seo.description"),
  ogTitle: t("about.seo.title"),
  ogDescription: t("about.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("about.seo.title"),
  twitterDescription: t("about.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
