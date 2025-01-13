<template>
  <div>
    <UISectionTitle class="mb-4">
      {{ t("rules_page.best_price_guarantee") }}
    </UISectionTitle>
    <ul class="flex flex-col gap-9">
      <li v-for="(rule, index) in rules" :key="index">
        <h6 class="text-first font-medium">
          {{ `${index + 1}. ${rule.title}` }}
        </h6>
        <p
          v-for="text in rule.content"
          class="text-[15px] text-first mb-9 last:mb-0"
        >
          {{ text }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({
  title: t("rules_page.seo.title"),
  description: t("rules_page.seo.description"),
  ogTitle: t("rules_page.seo.title"),
  ogDescription: t("rules_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("rules_page.seo.title"),
  twitterDescription: t("rules_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
const rules = ref([
  {
    title: t("rules_page.your_agreement"),
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
  },
  {
    title: t("rules_page.your_agreement"),
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
  },
  {
    title: t("rules_page.your_agreement"),
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
  },
]);
</script>
