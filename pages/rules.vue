<template>
  <section>
    <div class="container">
      <div class="grid md:grid-cols-4 grid-cols-1 gap-10">
        <div>
          <div class="py-8 px-7 border border-[#DDDDDD] flex flex-col">
            <NuxtLink
              :to="localPath('/rules/General-Terms-of-Use')"
              active-class="text-[#3554D1]"
              class="hover:underline mb-5 last:mb-0"
              >{{ t("rules_page.general_terms_of_use") }}</NuxtLink
            >
            <NuxtLink
              :to="localPath('/rules/Privacy-policy')"
              active-class="text-[#3554D1]"
              class="hover:underline mb-5 last:mb-0"
              >{{ t("rules_page.privacy_policy") }}</NuxtLink
            >
            <NuxtLink
              :to="localPath('/rules/Cookie-Policy')"
              active-class="text-[#3554D1]"
              class="hover:underline mb-5 last:mb-0"
              >{{ t("rules_page.cookie_policy") }}</NuxtLink
            >
            <NuxtLink
              :to="localPath('/rules/Best-Price-Guarantee')"
              active-class="text-[#3554D1]"
              class="hover:underline mb-5 last:mb-0"
              >{{ t("rules_page.best_price_guarantee") }}</NuxtLink
            >
          </div>
        </div>
        <div class="md:col-span-3">
          <NuxtPage />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const localPath = useLocalePath();
</script>
