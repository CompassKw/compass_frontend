<template>
  <section>
    <div class="container mb-28">
      <div class="w-full text-center">
        <UISectionTitle class="mb-2">{{ t("blog.title") }}</UISectionTitle>
        <p class="text-fourth">
          {{ t("blog.subtitle") }}
        </p>
      </div>
      <div class="flex">
        <div class="w-full">
          <div v-for="post in posts" class="mb-5 last:mb-0" :key="post.id">
            <NuxtLink :to="localPath(`/blog/${post.slug.toString()}`)">
              <div class="flex items-center gap-4">
                <NuxtImg
                  :src="post.image"
                  class="md:w-[250px] md:h-[250px] w-[80px] h-[80px] rounded-xl mb-6"
                />
                <div class="flex flex-col md:gap-4">
                  <span class="text-fourth">
                    {{
                      new Date(post.created_at).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }}
                  </span>
                  <h4 class="text-first font-medium text-lg">
                    {{ post.title }}
                  </h4>
                  <p class="text-fourth">
                    {{ post.excerpt.split(" ", 15).join(" ") + "..." }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="minsmart:hidden">
          <NuxtImg
            src="image 139.svg"
            class="w-[300px] shadow-[0px_0px_27.9px_1px_#00000040]"
            alt=""
          />
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
              :aria-label="t('blog.pagination.prev')"
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
              :aria-label="t('blog.pagination.next')"
            >
              <div class="pagination-button-next">
                <font-awesome :icon="['fas', 'chevron-right']" />
              </div>
            </button>
          </template>
        </UPagination>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localPath = useLocalePath();
const BaseUrl = inject("BaseUrl") as string;
const posts = ref<Post[]>([]);
const records = ref(0);
const page = ref(1);
const pageSize = 5;

// fetch data for a specific page
async function fetchData(pageNumber: number) {
  const { data } = await useAuthFetch<Api>(
    `${BaseUrl}/posts?page=${pageNumber}&per_page=${pageSize}`
  );
  posts.value = data.value?.data.posts as Post[];
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

const route = useRoute();
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
  title: t("blog.seo.title"),
  description: t("blog.seo.description"),
  ogTitle: t("blog.seo.title"),
  ogDescription: t("blog.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("blog.seo.title"),
  twitterDescription: t("blog.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
