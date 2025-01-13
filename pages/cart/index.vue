<template>
  <section class="container">
    <div class="w-full text-center">
      <UISectionTitle class="my-10">{{ t("cart.title") }}</UISectionTitle>
    </div>
    <div v-if="products.length">
      <div class="flex justify-between items-center mb-7">
        <h1 class="text-4xl font-bold">
          {{ amount }}
        </h1>
        <div>
          <UIButton
            class="bg-[#13357B] px-3 font-bold"
            @click="CheckoutModal = true"
          >
            {{ t("cart.checkout") }}
          </UIButton>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div
          class="flex justify-between items-center bg-[#F5F5F5] p-3 rounded-xl relative"
          v-for="product in products"
        >
          <div class="flex items-center gap-5">
            <div class="w-16">
              <NuxtImg :src="product.product.logo" alt="product" />
            </div>
            <div>
              <h3 class="text-lg font-bold">
                {{ product.product.name }}
              </h3>
              <p class="text-sm">
                {{ product.type }}
              </p>
              <p class="text-sm">{{ product.product.price }} KD</p>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <div class="w-10">
                <button
                  class="bg-[#13357B] text-white rounded-lg w-full h-10 text-xl"
                  @click="
                    decreaseProduct(product.id.toString(), product.quantity)
                  "
                >
                  -
                </button>
              </div>
              <span class="mx-3 text-xl font-semibold">{{
                product.quantity
              }}</span>
              <div class="w-10">
                <button
                  class="bg-[#13357B] text-white rounded-lg w-full h-10 text-xl"
                  @click="increaseProduct(product.id.toString())"
                >
                  +
                </button>
              </div>
            </div>
            <p class="font-semibold text-center mt-3">
              {{ product.product.price * product.quantity }} +
              {{ Number(product.product.delivery_cost) }} KD
            </p>
          </div>
          <div class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <button
              class="text-first bg-white border-[#13357B] border w-6 h-6 flex justify-center items-center rounded-full p-0"
              @click="removeProduct(product.id.toString())"
            >
              <font-awesome :icon="['fas', 'xmark']" class="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full text-center">
        <h1 class="text-4xl font-bold">{{ t("cart.empty") }}</h1>
      </div>
    </div>
    <UModal
      v-model="CheckoutModal"
      :ui="{
        background:
          ' items-center w-[385px_!important] flex align-center justify-center self-baseline mt-20',
      }"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800 w-full',
        }"
      >
        <template #header>
          <h1 class="text-2xl font-bold">{{ t("cart.checkout_title") }}</h1>
        </template>
        <div class="flex flex-col gap-5">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.total_amount") }}</h3>
            <p class="text-lg font-bold">
              {{ amount }} {{ t("cart.currency") }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.delivery_days") }}</h3>
            <p class="text-lg font-bold">{{ days }} {{ t("cart.days") }}</p>
          </div>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.country") }}</h3>
            <input
              type="text"
              class="border border-[#13357B] rounded-lg p-2 w-1/2"
              :placeholder="t('cart.country_placeholder')"
              v-model="shipping_data.country"
            />
          </div>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.city") }}</h3>
            <input
              type="text"
              class="border border-[#13357B] rounded-lg p-2 w-1/2"
              :placeholder="t('cart.city_placeholder')"
              v-model="shipping_data.city"
            />
          </div>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.street") }}</h3>
            <input
              type="text"
              class="border border-[#13357B] rounded-lg p-2 w-1/2"
              :placeholder="t('cart.street_placeholder')"
              v-model="shipping_data.street"
            />
          </div>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ t("cart.building") }}</h3>
            <input
              type="text"
              class="border border-[#13357B] rounded-lg p-2 w-1/2"
              :placeholder="t('cart.building_placeholder')"
              v-model="shipping_data.building_number"
            />
          </div>
        </div>
        <template #footer>
          <div class="flex justify-end gap-5">
            <UIButton class="bg-[#13357B]" @click="CheckoutModal = false">
              {{ t("cart.cancel") }}
            </UIButton>
            <UIButton class="bg-[#13357B]" @click="checkout">
              {{ t("cart.confirm_checkout") }}
            </UIButton>
          </div>
        </template>
      </UCard>
    </UModal>
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

const { t } = useI18n();
useSeoMeta({
  title: t("cart.seo.title"),
  description: t("cart.seo.description"),
  ogTitle: t("cart.seo.title"),
  ogDescription: t("cart.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("cart.seo.title"),
  twitterDescription: t("cart.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});

const BaseUrl = inject("BaseUrl") as string;
const token = useCookie("token");
const products = ref([]) as Ref<CartProduct[]>;
const amount = ref(0);
const days = ref(0);

async function getCart() {
  amount.value = 0;
  const { data } = await useAuthFetch<Api>(`${BaseUrl}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  products.value = data.value?.data.carts as CartProduct[];
  products.value.forEach((product) => {
    amount.value += product.product.price * product.quantity;
    amount.value += Number(product.product.delivery_cost);
    if (days.value < product.product.delivery_time) {
      days.value = product.product.delivery_time;
    }
  });
}
onMounted(() => {
  getCart();
});
async function removeProduct(id: string) {
  const data = await $fetch(`${BaseUrl}/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (data.id == id) {
    getCart();
  }
}
async function increaseProduct(id: string) {
  const data = await $fetch(`${BaseUrl}/increase-cart/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (data.id == id) {
    getCart();
  }
}
async function decreaseProduct(id: string, quantity: number) {
  if (quantity == 1) {
    removeProduct(id);
  } else {
    const data = await $fetch(`${BaseUrl}/decrease-cart/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (data.id == id) {
      getCart();
    }
  }
}

const CheckoutModal = ref(false);
const domainName = ref("");
if (!import.meta.server) {
  const url = window.location.href;
  domainName.value = url.split("/")[2];
}

const shipping_data = ref({
  amount: amount.value,
  delivery_days: days.value,
  country: "",
  city: "",
  street: "",
  building_number: "",
  payment_method: "knet",
});

async function checkout() {
  if (
    shipping_data.value.country &&
    shipping_data.value.city &&
    shipping_data.value.street &&
    shipping_data.value.building_number
  ) {
    const formData = new FormData();
    formData.append("amount", amount.value.toString());
    formData.append("delivery_days", days.value.toString());
    formData.append("country", shipping_data.value.country);
    formData.append("city", shipping_data.value.city);
    formData.append("street", shipping_data.value.street);
    formData.append("building_number", shipping_data.value.building_number);
    formData.append("payment_method", shipping_data.value.payment_method);
    const data = await $fetch(`${BaseUrl}/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    window.location.href = data.link;
  } else {
  }
}
</script>
