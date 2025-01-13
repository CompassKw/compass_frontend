<template>
  <section>
    <div class="container">
      <UISectionTitle class="mb-6">
        {{ t("gt_continent_section.group_tours_by_continent") }}
      </UISectionTitle>
      <div
        class="grid md:grid-cols-3 mintab:grid-cols-2 mob:grid-cols-1 gap-3 justify-items-center"
      >
        <NuxtLink
          :to="localPath('/search-page/europe')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 83.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.europe") }}
            </p>
            <small class="text-fourth"
              >{{ EuropeDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/africa')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 86.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.africa") }}
            </p>
            <small class="text-fourth"
              >{{ AfricaDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/asia')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 87.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.asia") }}
            </p>
            <small class="text-fourth"
              >{{ AsiaDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/australia')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 88.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.australia") }}
            </p>
            <small class="text-fourth"
              >{{ AustraliaDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/north merica')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 85.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.north_america") }}
            </p>
            <small class="text-fourth"
              >{{ NorthAmericaDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/south america')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="Ellipse 84.svg" class="w-28 rounded-full" alt="" />
          <div>
            <p class="text-lg font-medium min-w-[117px]">
              {{ t("gt_continent_section.south_america") }}
            </p>
            <small class="text-fourth"
              >{{ SouthAmericaDestinations }}
              {{ t("gt_continent_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
let AfricaDestinations = 0;
let AsiaDestinations = 0;
let AustraliaDestinations = 0;
let EuropeDestinations = 0;
let NorthAmericaDestinations = 0;
let SouthAmericaDestinations = 0;
const BaseUrl = inject("BaseUrl") as string;
const trips = ref([]) as Ref<Trip[]>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/trips`);
trips.value = data.value?.data.trips as Trip[];
for (const trip of trips.value) {
  const continent = trip.continent.name.toLowerCase();
  switch (continent) {
    case "africa":
      AfricaDestinations++;
      break;
    case "asia":
      AsiaDestinations++;
      break;
    case "australia":
      AustraliaDestinations++;
      break;
    case "europe":
      EuropeDestinations++;
      break;
    case "north america":
      NorthAmericaDestinations++;
      break;
    case "south america":
      SouthAmericaDestinations++;
      break;
  }
}
</script>
