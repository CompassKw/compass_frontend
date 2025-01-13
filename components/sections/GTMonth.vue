<template>
  <section>
    <div class="container">
      <UISectionTitle class="mb-6">
        {{ t("gt_month_section.group_tours_by_month") }}
      </UISectionTitle>
      <div class="grid md:grid-cols-4 mintab:grid-cols-3 mob:grid-cols-2 gap-3">
        <NuxtLink
          :to="localPath('/search-page/january')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img1.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.january") }}
            </p>
            <small class="text-fourth"
              >{{ JanuaryDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/february')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img2.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.february") }}
            </p>
            <small class="text-fourth"
              >{{ FebruaryDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/march')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img3.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.march") }}
            </p>
            <small class="text-fourth"
              >{{ MarchDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/april')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img4.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.april") }}
            </p>
            <small class="text-fourth"
              >{{ AprilDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/may')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img5.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.may") }}
            </p>
            <small class="text-fourth"
              >{{ MayDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/june')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img6.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.june") }}
            </p>
            <small class="text-fourth"
              >{{ JuneDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/july')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img1.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.july") }}
            </p>
            <small class="text-fourth"
              >{{ JulyDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/august')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img2.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.august") }}
            </p>
            <small class="text-fourth"
              >{{ AugustDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/september')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img3.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.september") }}
            </p>
            <small class="text-fourth"
              >{{ SeptemberDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/october')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img4.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.october") }}
            </p>
            <small class="text-fourth"
              >{{ OctoberDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/november')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img5.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.november") }}
            </p>
            <small class="text-fourth"
              >{{ NovemberDestinations }}
              {{ t("gt_month_section.destinations") }}</small
            >
          </div>
        </NuxtLink>
        <NuxtLink
          :to="localPath('/search-page/december')"
          class="flex gap-5 items-center"
        >
          <NuxtImg src="img6.svg" class="w-28 mob:w-20 rounded" alt="" />
          <div>
            <p class="text-lg font-medium">
              {{ t("gt_month_section.december") }}
            </p>
            <small class="text-fourth"
              >{{ DecemberDestinations }}
              {{ t("gt_month_section.destinations") }}</small
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
let JanuaryDestinations = 0;
let FebruaryDestinations = 0;
let MarchDestinations = 0;
let AprilDestinations = 0;
let MayDestinations = 0;
let JuneDestinations = 0;
let JulyDestinations = 0;
let AugustDestinations = 0;
let SeptemberDestinations = 0;
let OctoberDestinations = 0;
let NovemberDestinations = 0;
let DecemberDestinations = 0;
const BaseUrl = inject("BaseUrl") as string;
const trips = ref([]) as Ref<Trip[]>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/trips`);
trips.value = data.value?.data.trips as Trip[];
for (const trip of trips.value) {
  const month = new Date(trip.start_date).getMonth();
  switch (month) {
    case 0:
      JanuaryDestinations++;
      break;
    case 1:
      FebruaryDestinations++;
      break;
    case 2:
      MarchDestinations++;
      break;
    case 3:
      AprilDestinations++;
      break;
    case 4:
      MayDestinations++;
      break;
    case 5:
      JuneDestinations++;
      break;
    case 6:
      JulyDestinations++;
      break;
    case 7:
      AugustDestinations++;
      break;
    case 8:
      SeptemberDestinations++;
      break;
    case 9:
      OctoberDestinations++;
      break;
    case 10:
      NovemberDestinations++;
      break;
    case 11:
      DecemberDestinations++;
      break;
  }
}
</script>
