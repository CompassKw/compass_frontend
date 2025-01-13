<template>
  <section class="mb-28">
    <div class="w-full text-center">
      <UISectionTitle class="my-10">
        {{ t("search_page.seo.title") }}
      </UISectionTitle>
    </div>
    <div class="container" v-if="records">
      <div class="grid md:grid-cols-4 mintab:grid-cols-2 mob:grid-cols-1 gap-7">
        <div v-for="tour in tours" :key="tour.id">
          <UITourCard :tour="tour" />
        </div>
      </div>
      <div class="flex justify-center mt-10" v-if="records >= pageSize">
        <UPagination
          :active-button="{ variant: 'ghost', disabled: true }"
          :inactive-button="{ color: 'gray', variant: 'ghost' }"
          v-model="page"
          :page-count="pageSize"
          :total="records"
          :ui="{
            rounded:
              'font-medium text-sm flex text-first justify-center items-center w-10 h-10 rounded-full disabled:text-white disabled:bg-first hover:bg-[#F5F5F5] disabled:opacity-100 disabled:cursor-not-allowed mx-5',
          }"
          :next-button="{ disabled: true }"
          :prev-button="{ disabled: true }"
        >
          <template #prev="{ onClick }">
            <button
              @click="onClick"
              class="flex text-first justify-center items-center w-10 h-10 rounded-full disabled:text-[#D9D9D9_!important]"
              :disabled="page == 1"
            >
              <div class="pagination-button-prev">
                <font-awesome :icon="['fas', 'chevron-left']" />
              </div>
            </button>
          </template>

          <template #next="{ onClick }">
            <button
              @click="onClick"
              class="flex text-first justify-center items-center w-10 h-10 rounded-full disabled:text-[#D9D9D9_!important]"
              :disabled="page == records"
            >
              <div class="pagination-button-next">
                <font-awesome :icon="['fas', 'chevron-right']" />
              </div>
            </button>
          </template>
        </UPagination>
      </div>
    </div>
    <div v-else>
      <div class="w-full text-center">
        <UISectionTitle class="my-10">
          {{ t("search_page.no_results_found") }}
        </UISectionTitle>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const search = ref(route.params.search);
const BaseUrl = inject("BaseUrl") as string;
const tours = ref([]) as Ref<Trip[]>;

const records = ref(0);
const page = ref(1);
const pageSize = 12;

// fetch data for a specific page
async function fetchData(pageNumber: number) {
  const { data } = await useAuthFetch<Api>(
    `${BaseUrl}/trips?page=${pageNumber}&per_page=${pageSize}&query=${search.value}`
  );
  tours.value = data.value?.data.trips as Trip[];
  records.value = data.value?.data.records as number;
  changePage(pageNumber);
}

fetchData(page.value);

watch(
  page,
  (newPage) => {
    fetchData(newPage);
  },
  { immediate: true }
);
const router = useRouter();
const currentPage = ref(parseInt(route.query.page as string) as number);

watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage as string) as number;
  }
);

function changePage(pageNumber: number) {
  router.push({ query: { ...route.query, page: pageNumber.toString() } });
}

useSeoMeta({
  title: t("search_page.seo.title"),
  description: t("search_page.seo.description"),
  ogTitle: t("search_page.seo.title"),
  ogDescription: t("search_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("search_page.seo.title"),
  twitterDescription: t("search_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
