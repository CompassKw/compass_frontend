<template>
  <SectionsHeroSection />
  <SectionsGTSlider class="my-10" />
  <SectionsGTContinent />
  <div class="container mt-6 mb-20">
    <NuxtImg
      src="Rectangle 4520.svg"
      class="w-full shadow-[0px_0px_10.4px_3px_#00000040]"
      alt=""
    />
  </div>
  <SectionsGTMonth class="mb-12" />
  <SectionsBLTours class="mb-10" />
  <SectionsOurBrandAmbassadors class="mb-5" />
  <SectionsDownloadApp />
  <SectionsOurAchievements />
  <!-- <SectionsReviewsTestimonials class="mb-8" /> -->
  <div class="container mb-9">
    <SectionsOurPartners />
    <SectionsOurCompanies />
    <NuxtImg
      src="Rectangle 4521.svg"
      class="w-full my-9 shadow-[0px_0px_10.4px_3px_#00000040]"
      alt=""
    />
    <SectionsBlog />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
useSeoMeta({
  title: t("home.seo.title"),
  description: t("home.seo.description"),
  ogTitle: t("home.seo.title"),
  ogDescription: t("home.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("home.seo.title"),
  twitterDescription: t("home.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
