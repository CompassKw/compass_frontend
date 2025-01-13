<template>
  <section>
    <div class="text-center flex items-center">
      <div class="w-full">
        <UISectionTitle class="mb-2">
          {{ t("blog_section.get_inspiration_for_your_next_trip") }}
        </UISectionTitle>
        <p class="text-fourth">
          {{
            t(
              "blog_section.check_our_blog_for_the_latest_articles_about_tourism"
            )
          }}
        </p>
      </div>
      <div class="p-3 shrink-0">
        <NuxtLink :to="localPath('/blog')" class="bg-[#3554D10D] py-2 px-4">
          {{ t("blog_section.view_all") }}
        </NuxtLink>
      </div>
    </div>
    <div class="grid gap-10 md:grid-cols-3 grid-cols-1">
      <div v-for="post in posts">
        <NuxtLink
          :to="localPath('/blog/' + post.slug.toString())"
          class="hover:underline"
        >
          <NuxtImg :src="post.image" class="w-full h-[320px] rounded-xl mb-6" />
          <div>
            <h4 class="text-first font-medium text-lg mb-2">
              {{ post.title }}
            </h4>
            <p class="text-fourth">
              {{ post.excerpt.split(" ", 15).join(" ") + "..." }}
            </p>
            <span class="text-third">
              {{
                new Date(post.created_at).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localPath = useLocalePath();
const BaseUrl = inject("BaseUrl") as string;
const posts = ref<Post[]>([]);
const { data } = await useAuthFetch<Api>(`${BaseUrl}/posts?page=1&per_page=3`);
posts.value = data.value?.data.posts as Post[];
</script>
