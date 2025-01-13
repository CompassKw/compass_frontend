<template>
  <UIHeaderNavigte :title="trip?.title" :from="trip?.is_private" />
  <section class="pb-48">
    <div class="container">
      <div class="py-10">
        <UISectionTitle class="mb-3">{{ trip?.title }}</UISectionTitle>
        <div class="flex gap-4 items-center text-fourth">
          <FontAwesome :icon="['fas', 'location-dot']" />
          <span>
            {{ trip?.country.name }}
          </span>
        </div>
      </div>
      <div class="grid md:grid-cols-3 grid-cols-1 mb-10 gap-10">
        <div class="md:col-span-2">
          <UIProductSlider :images="trip?.gallery" />
        </div>
        <div>
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] px-8 pb-4 pt-9"
          >
            <div class="flex items-center gap-2 mb-4">
              <small class="text-fourth">
                {{ t("tour_card.sharing_price") }}
              </small>
              <span class="text-xl font-medium text-first"
                >{{ trip?.sharing_price }} {{ t("tour_card.kd_person") }}</span
              >
            </div>
            <div class="flex items-center gap-2 mb-8">
              <small class="text-fourth">
                {{ t("tour_card.single_price") }}
              </small>
              <span class="text-xl font-medium text-first"
                >{{ trip?.single_price }} {{ t("tour_card.kd_person") }}</span
              >
            </div>
            <div
              class="rounded border border-[#DDDDDD] py-3 px-5"
              v-if="trip.is_private == 0"
            >
              <p class="text-first font-medium">
                {{ t("tour_card.date") }}
              </p>
              <p class="text-fourth">
                {{ startDate }} {{ $t("tour_card.to") }} {{ endDate }}
              </p>
            </div>
            <div class="flex justify-center gap-2 my-6">
              <div class="pt-1">
                <font-awesome
                  :icon="['far', 'clock']"
                  class="text-[#3554D1] text-xl"
                />
              </div>
              <div class="text-first">
                <p>{{ t("tour_card.duration") }}:</p>
                <span class="text-fourth ml-2"
                  >{{ trip.number_of_days }} {{ t("tour_card.days") }}</span
                >
              </div>
            </div>
            <NuxtLink :to="localPath('/booking/' + tripID.toString())">
              <UIButton class="bg-third">
                {{ t("tour_card.book_now") }}
              </UIButton>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-3xl font-medium text-[#13357B] mb-5">
          {{ t("tour_card.overview") }}
        </h3>
        <ul>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.trip_start") }}:
            </span>
            <span class="ms-2" v-html="trip.trip_start"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.trip_end") }}:
            </span>
            <span class="ms-2" v-html="trip.trip_end"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.the_price_includes") }}:
            </span>
            <span class="ms-2" v-html="trip.the_price_includes"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.the_price_does_not_include") }}:
            </span>
            <span class="ms-2" v-html="trip.the_price_does_not_include"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.andventures_and_site_that_will_be_covered") }}:
            </span>
            <span
              class="ms-2"
              v-html="trip.andventures_and_site_that_will_be_covered"
            ></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.accommodation_type") }}:
            </span>
            <span class="ms-2" v-html="trip.accommodation_type"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.level_of_difficulty") }}:
            </span>
            <span class="ms-2" v-html="trip.level_of_difficulty"></span>
          </li>
          <li class="text-[#696969] mb-3 last:m-0">
            <span class="text-first font-medium text-lg">
              {{ t("tour_card.theme") }}:
            </span>
            <span class="ms-2" v-html="trip.theme"></span>
          </li>
        </ul>
        <div v-if="trip?.itinerary" class="mt-8">
          <h3 class="text-3xl font-medium text-[#13357B] mb-5">
            {{ t("tour_card.itinerary") }}
          </h3>
          <ul>
            <li
              class="text-[#696969] mb-3 last:m-0"
              v-for="(item, index) in trip.itinerary"
            >
              <span class="text-third font-medium text-lg">
                {{ t("tour_card.day") }} {{ index + 1 }}:
              </span>
              <span class="ms-2" v-html="item"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localPath = useLocalePath();
const props = defineProps(["tripID"]);
const tripID = ref(props.tripID);
const BaseUrl = inject("BaseUrl") as string;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/trip/${tripID.value}`);
const trip = ref(data.value?.data.trip) as Ref<Trip>;
const startDate = ref(
  new Date(trip.value?.start_date).toLocaleDateString(locale.value, {
    day: "numeric",
    month: "long",
  })
);
const endDate = ref(
  new Date(trip.value?.end_date).toLocaleDateString(locale.value, {
    day: "numeric",
    month: "long",
  })
);
const Duration = ref(
  new Date(trip.value?.end_date).getTime() -
    new Date(trip.value?.start_date).getTime()
);
const days = ref(Duration.value / 1000 / 60 / 60 / 24);
const title = ref(trip.value?.title);
useSeoMeta({
  title: title.value,
  description: t("detail_trip.seo.description"),
  ogTitle: title.value,
  ogDescription: t("detail_trip.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: title.value,
  twitterDescription: t("detail_trip.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
