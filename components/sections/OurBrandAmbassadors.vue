<template>
  <section>
    <div class="container">
      <UISectionTitle class="mb-8">
        {{ t("our_brand_ambassadors_section.our_brand_ambassadors") }}
      </UISectionTitle>
      <div class="flex flex-wrap gap-10 justify-center">
        <div v-for="ambassador in ambassadors" :key="ambassador.id">
          <NuxtImg
            :src="ambassador.image"
            class="w-24 h-24 rounded-full mx-auto mb-5"
            alt=""
          />
          <p class="text-center">
            {{ ambassador.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl") as string;
const ambassadors = ref<Ambassador[]>([]);
const { data } = await useAuthFetch<Api>(`${BaseUrl}/brand-ambassador`);
ambassadors.value = data.value?.data.brandAmbassadors as Ambassador[];
</script>
