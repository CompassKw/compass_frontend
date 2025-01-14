<template>
  <section>
    <div class="container" v-if="ambassadors.length > 0">
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
    <div class="container" v-if="tourOperators.length > 0">
      <UISectionTitle class="mb-8">
        {{ t("our_brand_tour_operator_section.our_brand_tour_operator") }}
      </UISectionTitle>
      <div class="flex flex-wrap gap-10 justify-center">
        <div v-for="tourOperator in tourOperators" :key="tourOperator.id">
          <NuxtImg
            :src="tourOperator.image"
            class="w-24 h-24 rounded-full mx-auto mb-5"
            alt=""
          />
          <p class="text-center">
            {{ tourOperator.name }}
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
const tourOperators = ref<Ambassador[]>([]);
const { data } = await useAuthFetch<Api>(`${BaseUrl}/brand-ambassador`);
ambassadors.value = data.value?.data.brandAmbassadors as Ambassador[];
tourOperators.value = data.value?.data.tourOperator as Ambassador[];
</script>
