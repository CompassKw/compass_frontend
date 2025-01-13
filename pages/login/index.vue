<template>
  <section
    class="bg-[linear-gradient(180deg,#DAE9FF_0%,#FFFFFF_100%)] w-full min-h-[85vh] flex items-center justify-center"
  >
    <div
      class="bg-white w-[630px] py-8 px-12 shadow-[0px_0px_10.4px_3px_#00000040] flex flex-col items-center justify-center"
    >
      <NuxtImg :src="logo" class="w-1/3 mx-auto mb-9" alt="logo" />
      <form class="w-full flex flex-col gap-5" @submit.prevent="login">
        <div>
          <h5 class="text-first text-xl font-medium mb-3">
            {{ t("login_page.welcome_back") }}
          </h5>
          <p class="text-fourth">
            {{ t("login_page.dont_have_account") }}
            <NuxtLink :to="localPath('/register')" class="text-[#3554D1]">
              {{ t("login_page.sign_up_for_free") }}
            </NuxtLink>
          </p>
        </div>
        <input
          type="email"
          :placeholder="t('login_page.email')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.email"
        />
        <input
          type="password"
          :placeholder="t('login_page.password')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.password"
        />
        <NuxtLink :to="localPath('/rest')" class="text-[#3554D1]">
          {{ t("login_page.forget_your_password") }}
        </NuxtLink>
        <p class="text-red-500 text-sm">{{ errMsg }}</p>
        <UIButton class="bg-[#3554D1]" type="submit">
          {{ t("login_page.login") }}
        </UIButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const logo = inject("logo") as string;
const BaseUrl = inject("BaseUrl") as string;

const form = ref({
  email: "",
  password: "",
});

const errMsg = ref("");

async function login() {
  if (!form.value.email || !form.value.password) {
    errMsg.value = "Please fill all the fields";
    return;
  } else {
    const formData = new FormData();
    formData.append("email", form.value.email);
    formData.append("password", form.value.password);

    const { data } = await useFetch<Api>(`${BaseUrl}/login`, {
      method: "POST",
      body: formData,
    });
    if (data.value?.message === "messages.userLoginSuccess") {
      const token = useCookie("token");
      token.value = data.value?.data.token as string;
      const name = useCookie("name");
      name.value = data.value?.data.user.name as string;
      navigateTo(localPath("/"));
      errMsg.value = "";
      form.value = {
        email: "",
        password: "",
      };
    } else {
      errMsg.value = data.value?.message as string;
    }
  }
}

useSeoMeta({
  title: t("login_page.seo.title"),
  description: t("login_page.seo.description"),
  ogTitle: t("login_page.seo.title"),
  ogDescription: t("login_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("login_page.seo.title"),
  twitterDescription: t("login_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
