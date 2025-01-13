<template>
  <section>
    <div class="container">
      <UISectionTitle class="mb-5">
        {{ t("bl_tours_section.best_local_tours") }}
      </UISectionTitle>
      <UIGridFour :tours="tours" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const BaseUrl = inject("BaseUrl") as string;
const tours = ref<Trip[]>([]);
const { data } = await useAuthFetch<Api>(
  `${BaseUrl}/trips?page=1&per_page=4&query=Kuwait`
);
tours.value = data.value?.data.trips as Trip[];
</script>
