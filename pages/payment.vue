<template>
  <section class="container py-10">
    <div class="w-full text-center">
      <UISectionTitle class="my-10">
        {{
          route.query.payment_id
            ? t("payment_page.payment_success")
            : t("payment_page.payment_failed")
        }}
      </UISectionTitle>
    </div>
    <div class="w-1/2 mx-auto">
      <div
        class="bg-[#F5F5F5] py-5 rounded-xl flex flex-col justify-center items-center mb-5"
      >
        <div
          class="w-[60px] h-[60px] rounded-full bg-first text-white flex justify-center items-center text-4xl"
        >
          <font-awesome
            v-if="route.query.payment_id"
            :icon="['fas', 'check']"
          />
          <font-awesome v-else :icon="['fas', 'xmark']" />
        </div>
        <div v-if="route.query.payment_id">
          <p class="text-lg">
            {{ t("payment_page.payment_success_message") }}
          </p>
          <p class="text-lg">
            {{ t("payment_page.payment_id_message") }}:
            {{ route.query.payment_id }}
          </p>
        </div>
        <div v-else>
          <p class="text-lg">
            {{ t("payment_page.payment_failed_message") }}
          </p>
        </div>
      </div>
      <NuxtImg
        v-if="route.query.payment_id"
        src="success.png"
        alt="payment success"
      />
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({
  title: t("payment_page.seo.title"),
  description: t("payment_page.seo.description"),
  ogTitle: t("payment_page.seo.title"),
  ogDescription: t("payment_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("payment_page.seo.title"),
  twitterDescription: t("payment_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
const route = useRoute();
</script>
