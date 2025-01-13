<template>
  <section class="bg-[#F5F5F5] py-4">
    <div class="container flex items-center">
      <NuxtLink :to="localPath('/')" class="text-fourth text-sm">
        {{ t("header_navigate.home") }}
      </NuxtLink>
      <font-awesome
        :icon="['fas', 'chevron-right']"
        class="text-fourth text-xs mx-2"
      />
      <NuxtLink
        :to="
          from === 1
            ? localPath('/private-trips')
            : from === 0
            ? localPath('/group-trips')
            : localPath('/store')
        "
        class="text-fourth text-sm"
      >
        {{
          from === 1
            ? t("header_navigate.private_trips")
            : from === 0
            ? t("header_navigate.group_trips")
            : t("header_navigate.store")
        }}
      </NuxtLink>
      <font-awesome
        :icon="['fas', 'chevron-right']"
        class="text-fourth text-xs mx-2"
      />
      <span class="text-first text-sm"> {{ title }} </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const props = defineProps(["title", "from"]);
</script>
