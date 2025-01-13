<template>
  <div class="border border-[#DFDFDF] rounded-[20px]">
    <NuxtLink :to="localPath('/store/' + product.id.toString())">
      <div>
        <div class="w-full h-[300px]">
          <NuxtImg
            :src="product.logo"
            class="w-full rounded-t-[20px] h-[300px]"
            alt=""
          />
        </div>
        <div class="py-3 px-2">
          <small class="text-fourth flex items-center gap-3 mb-3">
            <span> {{ t("store_page.compass_merchandise") }} </span>
          </small>
          <h5 class="text-2xl leading-7 font-medium mb-9">
            {{ product.name }}
          </h5>
          <h6 class="text-end text-2xl font-medium">
            <span class="text-[#F75D37]">
              {{ t("store_page.price") }}
            </span>
            <span class="font-medium">{{ product.price }} KD</span>
          </h6>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const props = defineProps(["product"]);
const product = ref(props.product) as Ref<Product>;
</script>
