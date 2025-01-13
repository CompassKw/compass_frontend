<template>
  <div class="border border-[#DFDFDF] rounded-[20px] relative">
    <span
      class="absolute top-3 start-3 p-1 rounded-md bg-secondary text-white"
      v-if="tour.is_private == 1"
    >
      {{ t("tour_card.private") }}
    </span>
    <NuxtLink
      :to="
        tour.is_private
          ? localPath('/private-trips/' + tour.id.toString())
          : localPath('/group-trips/' + tour.id.toString())
      "
    >
      <div>
        <div class="w-full h-[300px]">
          <NuxtImg
            :src="tour.image_link"
            class="w-full rounded-t-[20px] h-[300px]"
            alt=""
          />
        </div>
        <div class="py-3 px-2">
          <small class="text-fourth flex items-center gap-3 mb-3">
            <span> {{ tour.number_of_days }} {{ t("tour_card.days") }} </span>
            <font-awesome :icon="['fas', 'circle']" class="text-[5px]" />
            <span> {{ tour.continent.name }} </span>
          </small>
          <h5 class="text-2xl leading-7 font-medium mb-9">
            {{ tour.title }}
          </h5>
          <h6 class="text-right">
            <small class="text-fourth">
              {{ t("tour_card.starting_from") }}
            </small>
            <span class="font-medium"
              >{{ tour.sharing_price }} {{ t("tour_card.kd_person") }}
            </span>
          </h6>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const props = defineProps(["tour"]);
const tour = ref(props.tour) as Ref<Trip>;
const Duration = ref(
  new Date(tour.value.end_date).getTime() -
    new Date(tour.value.start_date).getTime()
);
const days = ref(Duration.value / 1000 / 60 / 60 / 24);
</script>
