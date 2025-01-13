<template>
  <section>
    <div class="container mb-20">
      <div class="w-full text-center">
        <UISectionTitle class="mb-2">{{ t("blog.title") }}</UISectionTitle>
        <p class="text-fourth">
          {{ t("blog.subtitle") }}
        </p>
      </div>
      <div class="flex">
        <div class="w-full">
          <div>
            <div class="flex items-center gap-4">
              <NuxtImg
                :src="post?.image"
                class="md:w-[250px] md:h-[250px] w-[100px] h-[100px] rounded-xl mb-6"
              />
              <div class="flex flex-col md:gap-4">
                <span class="text-fourth">
                  {{
                    new Date(post?.created_at).toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                </span>
                <h4 class="text-first font-medium text-lg">
                  {{ post?.title }}
                </h4>
              </div>
            </div>
            <p class="text-fourth" v-html="post?.body"></p>
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
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;
const BaseUrl = inject("BaseUrl") as string;
const post = ref({}) as Ref<Post>;
const { data } = await useAuthFetch<Api>(`${BaseUrl}/post/${slug}`);
post.value = data.value?.data.post as Post;

useSeoMeta({
  title: post.value?.title || t("blog.seo.title"),
  description: post.value?.excerpt || t("blog.seo.description"),
  ogTitle: post.value?.title || t("blog.seo.title"),
  ogDescription: post.value?.excerpt || t("blog.seo.description"),
  ogImage: post.value?.image || "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: post.value?.title || t("blog.seo.title"),
  twitterDescription: post.value?.excerpt || t("blog.seo.description"),
  twitterImage: post.value?.image || "/favicon.ico",
  twitterCard: "summary",
});
</script>
