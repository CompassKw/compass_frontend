<template>
  <section>
    <div class="container pb-5">
      <NuxtImg src="booking.png" class="px-20 mb-20" alt="banner" />
      <div class="grid grid-cols-3 gap-10">
        <div class="col-span-2 flex flex-col gap-5">
          <div>
            <p class="text-xl text-first font-medium mb-5">
              {{ t("booking.form.title") }}
            </p>
            <div
              class="border border-[#DDDDDD] rounded-lg w-full p-3 flex items-center"
            >
              <p class="text-lg font-medium text-fourth text-nowrap">
                {{ t("booking.form.number_of_travelers") }}
              </p>
              <div class="w-full flex justify-center text-third text-xl gap-4">
                <span
                  @click="
                    traverlersCount > 1
                      ? (traverlersCount -= 1)
                      : traverlersCount
                  "
                >
                  <font-awesome
                    :icon="['fas', 'minus']"
                    class="cursor-pointer"
                  />
                </span>
                <span class="font-medium">
                  {{ traverlersCount }}
                </span>
                <span @click="traverlersCount += 1">
                  <font-awesome
                    :icon="['fas', 'plus']"
                    class="cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
          <UPopover
            :popper="{ placement: 'bottom-start' }"
            v-if="trip.is_private == 1"
          >
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="
                t('booking.trip.start_date') + format(startDate, 'd MMM, yyy')
              "
              class="border border-[#DDDDDD] rounded-lg w-full p-3 bg-white text-fourth hover:bg-white"
            />

            <template #panel="{ close }">
              <UIDatePicker v-model="startDate" is-required @close="close" />
            </template>
          </UPopover>
          <div
            v-for="(traverler, index) in traverlers"
            :key="index"
            class="flex flex-col gap-4"
          >
            <p class="text-third font-medium text-lg">
              {{ t("booking.form.traveler") }} {{ index + 1 }}
            </p>
            <input
              type="text"
              class="border border-[#DDDDDD] rounded-lg w-full p-3"
              :placeholder="t('booking.form.name_placeholder')"
              v-model="traverler.name"
            />
            <input
              type="text"
              class="border border-[#DDDDDD] rounded-lg w-full p-3"
              :placeholder="t('booking.form.nationality_placeholder')"
              v-model="traverler.nationality"
            />
            <input
              type="text"
              class="border border-[#DDDDDD] rounded-lg w-full p-3"
              :placeholder="t('booking.form.country_of_residence_placeholder')"
              v-model="traverler.country_of_residence"
            />
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                icon="i-heroicons-calendar-days-20-solid"
                :label="
                  t('booking.form.date_of_birth') +
                  format(traverler.date_of_birth, 'd MMM, yyy')
                "
                class="border border-[#DDDDDD] rounded-lg w-full p-3 bg-white text-fourth hover:bg-white"
              />

              <template #panel="{ close }">
                <UIDatePicker
                  v-model="traverler.date_of_birth"
                  is-required
                  @close="close"
                />
              </template>
            </UPopover>
            <USelectMenu
              selectedCategory-icon="i-heroicons-hand-thumb-up-solid"
              size="xl"
              :placeholder="t('booking.form.gender_placeholder')"
              :options="gender"
              option-attribute="label"
              value-attribute="value"
              v-model="traverler.gender"
              class="border border-[#DDDDDD] rounded-lg w-full"
            />
            <div class="flex gap-5">
              <label>
                <input
                  type="radio"
                  v-model="traverler.room_type"
                  :name="'type' + index"
                  value="single"
                  @change="changeCost(index)"
                />
                <span>
                  {{ t("booking.trip.single_room") }} {{ trip?.single_price }}
                  KD
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  v-model="traverler.room_type"
                  :name="'type' + index"
                  value="sharing"
                  @change="changeCost(index)"
                />
                <span>
                  {{ t("booking.trip.sharing_room") }} {{ trip?.sharing_price }}
                  KD
                </span>
              </label>
            </div>
            <input
              type="file"
              class="border border-[#DDDDDD] rounded-lg w-full p-3"
              placeholder="Upload Passport Copy"
              @change="imgUpload($event, index)"
            />
            <div class="text-end">
              {{ t("booking.trip.price") }}: {{ traverler.cost }} KD
            </div>
          </div>
          <div class="flex justify-end">
            <UIButton
              class="bg-first text-white rounded-lg p-3"
              @click="booking"
            >
              {{ t("booking.form.submit") }}
            </UIButton>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] p-[30px]"
          >
            <p class="mb-6 text-lg font-medium">
              {{ t("booking.trip.booking_details") }}
            </p>
            <div class="grid grid-cols-3 items-center gap-2">
              <NuxtImg :src="trip?.image_link" class="rounded-lg" alt="trip" />
              <div class="col-span-2">
                <p class="text-first">{{ trip?.title }}</p>
                <p class="text-fourth">
                  {{ t("booking.trip.duration") }}: {{ trip.number_of_days }}
                  {{ t("booking.trip.days") }}
                </p>
                <p class="text-first font-medium" v-if="trip.is_private == 0">
                  {{ t("booking.trip.dates") }}: {{ startDate }} -
                  {{ endDate }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] p-[30px]"
          >
            <p class="mb-6 text-lg font-medium">
              {{ t("booking.trip.coupon") }}
            </p>
            <div class="flex flex-col items-center gap-4">
              <input
                type="text"
                class="border border-[#DDDDDD] rounded-lg w-full p-3"
                :placeholder="t('booking.form.coupon_placeholder')"
                v-model="coupon"
              />
            </div>
          </div>
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] overflow-hidden"
            v-for="addon in trip?.addons"
            :key="addon.id"
          >
            <div class="grid grid-cols-4 gap-3">
              <NuxtImg
                :src="addon.logo"
                :alt="addon.name"
                class="w-full h-[110px]"
              />
              <div class="col-span-3 p-2 flex flex-col justify-between">
                <div>
                  <p class="text-first font-semibold">{{ addon.name }}</p>
                  <p class="text-[#2262AC] text-sm">{{ addon.description }}</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-third font-semibold">{{ addon.price }} KD</p>
                  <input
                    type="number"
                    class="border border-[#DDDDDD] rounded-lg w-1/2 p-2"
                    :placeholder="t('booking.form.quantity_placeholder')"
                    v-model="addon.quantity"
                    @change="changeAddons"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] p-[30px]"
          >
            <p class="mb-6 text-lg font-medium">
              {{ t("booking.trip.price_summary") }}
            </p>
            <div class="flex flex-col items-center gap-4">
              <div class="flex justify-between w-full">
                <p class="text-fourth">
                  {{ t("booking.trip.trip_fees") }}
                </p>
                <p class="text-first">{{ totalTravelersCost }} KD</p>
              </div>
              <div class="flex justify-between w-full">
                <p class="text-fourth">{{ t("booking.trip.addons") }}</p>
                <p class="text-first">{{ totalAddons }} KD</p>
              </div>
              <div
                class="flex justify-between w-full bg-[#E5F0FD] p-4 text-first font-medium"
              >
                <p>{{ t("booking.trip.total") }}</p>
                <p>{{ total }} KD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localPath = useLocalePath();
definePageMeta({
  middleware: function () {
    const router = useRouter();
    const token = useCookie("token");
    if (!token.value) {
      router.push(localPath("/login"));
    }
  },
});
import { format } from "date-fns";
const route = useRoute();
const token = useCookie("token");
const toast = useToast();
const { t } = useI18n();
const tripID = ref(route.params.id);
const BaseUrl = inject("BaseUrl") as string;
const gender = [
  {
    label: t("booking.form.male"),
    value: "male",
  },
  {
    label: t("booking.form.female"),
    value: "female",
  },
];
const trip = ref({}) as Ref<Trip>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/trip/${tripID.value}`);
trip.value = data.value?.data.trip as Trip;
const startDate = ref(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
const endDate = ref(
  new Date(
    startDate.value.getTime() + trip.value?.number_of_days * 24 * 60 * 60 * 1000
  )
);
const coupon = ref("");
const selectAddons = ref([] as Addon[]);
const totalAddons = computed(() =>
  selectAddons.value.reduce(
    (acc, addon) => acc + Number(addon.price) * addon.quantity,
    0
  )
);
function changeAddons() {
  selectAddons.value = trip.value?.addons.filter((addon) => addon.quantity > 0);
}
changeAddons();
const traverlersCount = ref(1);
const traverlers = ref([] as Traveler[]);
traverlers.value.push({
  name: "",
  nationality: "",
  country_of_residence: "",
  date_of_birth: new Date(),
  gender: "",
  passport_copy: "",
  room_type: "single",
  cost: Number(trip.value?.single_price),
});
watch(traverlersCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    traverlers.value.push({
      name: "",
      nationality: "",
      country_of_residence: "",
      date_of_birth: new Date(),
      gender: "",
      passport_copy: "",
      room_type: "single",
      cost: Number(trip.value?.single_price),
    });
  } else {
    traverlers.value.pop();
  }
});
function imgUpload(e: any, index: number) {
  traverlers.value[index].passport_copy = e.target.files[0];
}
function changeCost(index: number) {
  if (traverlers.value[index].room_type === "single") {
    traverlers.value[index].cost = Number(trip.value?.single_price);
  } else {
    traverlers.value[index].cost = Number(trip.value?.sharing_price);
  }
}
const totalTravelersCost = computed(() =>
  traverlers.value.reduce((acc, traverler) => acc + traverler.cost, 0)
);
const total = computed(() => totalTravelersCost.value + totalAddons.value);

const domainName = ref("");
if (!import.meta.server) {
  const url = window.location.href;
  domainName.value = url.split("/")[2];
}
const error = ref("");
async function booking() {
  const addons = selectAddons.value.map((addon) => ({
    id: addon.id,
    quantity: addon.quantity,
  }));

  if (traverlers.value.length > 0) {
    const fillFields = ref(true);
    for (let i = 0; i < traverlers.value.length; i++) {
      if (
        !traverlers.value[i].name ||
        !traverlers.value[i].cost ||
        !traverlers.value[i].date_of_birth ||
        !traverlers.value[i].country_of_residence ||
        !traverlers.value[i].gender ||
        !traverlers.value[i].nationality ||
        !traverlers.value[i].passport_copy ||
        !traverlers.value[i].room_type
      ) {
        error.value = t("booking.form.error");
        toast.add({
          title: t("booking.form.error_title"),
          description: t("booking.form.error_description"),
          icon: "i-heroicons-x-circle-solid",
          color: "red",
        });
        fillFields.value = false;
      }
    }
    if (fillFields.value) {
      toast.add({
        title: t("booking.form.processing_title"),
        description: t("booking.form.processing_description"),
        icon: "i-heroicons-information-circle-solid",
      });
      const formData = new FormData();
      if (trip.value?.is_private === 1) {
        formData.append("start_date", format(startDate.value, "yyyy-MM-dd"));
      }
      formData.append("trip_id", String(tripID.value));
      formData.append("coupon_code", coupon.value);
      traverlers.value.forEach((traverler, index) => {
        formData.append(`traverlers[${index}][name]`, traverler.name);
        formData.append(
          `traverlers[${index}][cost]`,
          traverler.cost.toString()
        );
        formData.append(
          `traverlers[${index}][date_of_birth]`,
          new Date(traverler.date_of_birth).toISOString().split("T")[0]
        );
        formData.append(
          `traverlers[${index}][country_of_residence]`,
          traverler.country_of_residence
        );
        formData.append(`traverlers[${index}][gender]`, traverler.gender);
        formData.append(
          `traverlers[${index}][nationality]`,
          traverler.nationality
        );
        formData.append(
          `traverlers[${index}][passport_copy]`,
          traverler.passport_copy
        );
        formData.append(`traverlers[${index}][room_type]`, traverler.room_type);
      });
      addons.forEach((addon, index) => {
        formData.append(`addons[${index}][id]`, addon.id.toString());
        formData.append(
          `addons[${index}][quantity]`,
          addon.quantity.toString()
        );
      });
      formData.append("total_amount", String(total.value));
      formData.append("payment_method", "knet");

      const data = await $fetch(`${BaseUrl}/booking`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: formData,
      });
      console.log(data);

      window.location.href = data.link;
    }
  }
}

useSeoMeta({
  title: t("booking.form.title"),
  description: t("booking.form.description"),
  ogTitle: t("booking.form.title"),
  ogDescription: t("booking.form.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("booking.form.title"),
  twitterDescription: t("booking.form.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
