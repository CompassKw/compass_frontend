<template>
  <UIHeaderNavigte :title="product?.name" :from="3" />
  <section class="pb-48">
    <div class="container">
      <div class="py-10">
        <UISectionTitle class="mb-3">{{ product?.name }}</UISectionTitle>
        <div class="flex gap-4 items-center text-fourth">
          <span> {{ t("store_page.the_compass_store") }} </span>
        </div>
      </div>
      <div class="grid md:grid-cols-3 grid-cols-1 mb-10">
        <div class="md:col-span-2">
          <UIProductSlider :images="product?.gallery" />
        </div>
        <div>
          <div
            class="rounded border border-[#DDDDDD] bg-white shadow-[0px_10px_60px_0px_#0510360D] px-8 pb-4 pt-9"
          >
            <div class="flex items-center gap-2 mb-8">
              <small class="text-fourth"> {{ t("store_page.price") }} </small>
              <span class="text-xl font-medium text-primary"
                >{{ product?.price }} KD</span
              >
            </div>
            <div
              class="rounded border border-[#DDDDDD] py-3 px-5 flex flex-col gap-2"
            >
              <p class="text-primary font-medium">
                {{ t("store_page.option") }}
              </p>
              <label
                class="text-fourth pl-3"
                v-for="(type, index) in product?.type"
                :key="index"
              >
                <input
                  type="radio"
                  name="option"
                  :value="type"
                  v-model="selectedType"
                  :checked="index == 0"
                />
                <span class="ml-2">
                  {{ type }}
                </span>
              </label>
            </div>
            <div class="flex justify-center gap-2 my-6">
              <div class="pt-1">
                <font-awesome
                  :icon="['far', 'clock']"
                  class="text-[#3554D1] text-xl"
                />
              </div>
              <div>
                <div class="text-primary flex">
                  <p>{{ t("store_page.delivery_time") }}:</p>
                  <span class="text-fourth ml-2"
                    >{{ product?.delivery_time }}
                    {{ t("store_page.days") }}</span
                  >
                </div>
                <div class="text-primary flex">
                  <p>{{ t("store_page.delivery_cost") }}:</p>
                  <span class="text-fourth ml-2"
                    >{{ product?.delivery_cost }} KD</span
                  >
                </div>
              </div>
            </div>
            <NuxtLink>
              <UIButton class="bg-third" @click="addToCart">
                {{ t("store_page.add_to_cart") }}
              </UIButton>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="product?.description">
        <h3 class="text-3xl font-medium text-[#13357B] mb-5">
          {{ t("store_page.overview") }}
        </h3>
        <div class="text-[#696969]" v-html="product?.description"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const id = ref(route.params.id);
const BaseUrl = inject("BaseUrl") as string;
const product = ref({}) as Ref<SingleProduct>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/store/${id.value}`);
product.value = data.value?.data.store as SingleProduct;
const title = ref(product.value?.name);
useSeoMeta({
  title,
  description: t("store_page.seo.description"),
  ogTitle: title.value,
  ogDescription: t("store_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: title.value,
  twitterDescription: t("store_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
const selectedType = ref(product.value?.type[0]);
const token = useCookie("token");
async function addToCart() {
  const { data } = await useAuthFetch<Api>(`${BaseUrl}/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      product_id: product.value?.id,
      type: selectedType.value,
    },
  });
  toast.add({
    title: t("store_page.product_added_to_cart"),
    type: "success",
    timeout: 3000,
  });
}
</script>
