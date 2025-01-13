<template>
  <section
    class="bg-[linear-gradient(180deg,#DAE9FF_0%,#FFFFFF_100%)] w-full min-h-[85vh] flex items-center justify-center"
  >
    <div
      class="bg-white w-[630px] py-8 px-12 shadow-[0px_0px_10.4px_3px_#00000040] flex flex-col items-center justify-center"
    >
      <NuxtImg :src="logo" class="w-1/3 mx-auto mb-9" alt="logo" />
      <form class="w-full flex flex-col gap-5" @submit.prevent="VerifyOTP">
        <div>
          <h5 class="text-first text-xl font-medium mb-3">
            {{ t("rest_page.new_password") }}
          </h5>
        </div>
        <input
          type="password"
          :placeholder="t('rest_page.new_password')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.password"
        />
        <div>
          <input
            type="password"
            :placeholder="t('rest_page.confirm_new_password')"
            class="p-2 border border-[#DDDDDD] text-first w-full"
            :class="{ 'border-red-500': !passwordMatch }"
            v-model="form.password_confirmation"
            @input="confirmPassword"
          />
          <p v-if="!passwordMatch" class="text-red-500">
            {{ t("rest_page.password_does_not_match") }}
          </p>
        </div>
        <p class="text-red-500 text-sm">{{ errMsg }}</p>
        <UIButton class="bg-[#3554D1]" type="submit">
          {{ t("rest_page.change_password") }}
        </UIButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: function (to, from) {
    const mail = useState("mail");
    if (from.path !== "/rest/otp" && !mail.value) {
      navigateTo(localPath("/rest"));
    }
  },
});

const { t } = useI18n();
const logo = inject("logo") as string;
const BaseUrl = inject("BaseUrl") as string;
const localPath = useLocalePath();
const form = ref({
  password: "",
  password_confirmation: "",
});

const errMsg = ref("");
const passwordMatch = ref(true);

function confirmPassword(e: any) {
  if (form.value.password !== e.target.value) {
    passwordMatch.value = false;
  } else {
    passwordMatch.value = true;
  }
}

async function VerifyOTP() {
  if (!form.value.password && !form.value.password_confirmation) {
    errMsg.value = t("rest_page.please_fill_all_fields_to_reset_password");
    return;
  }
  if (!passwordMatch.value) {
    return;
  } else {
    const formData = new FormData();
    formData.append("password", form.value.password);
    formData.append("password_confirmation", form.value.password_confirmation);
    const mail = useState("mail");
    formData.append("email", mail.value as string);

    const { data } = await useFetch<Api>(`${BaseUrl}/reset-password`, {
      method: "POST",
      body: formData,
    });
    if (data.value?.message === "Password reset successfully.") {
      navigateTo(localPath("/login"));
      errMsg.value = "";
      form.value = {
        password: "",
        password_confirmation: "",
      };
    } else {
      errMsg.value = data.value?.message as string;
    }
  }
}

useSeoMeta({
  title: t("rest_page.seo.title"),
  description: t("rest_page.seo.description"),
  ogTitle: t("rest_page.seo.title"),
  ogDescription: t("rest_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("rest_page.seo.title"),
  twitterDescription: t("rest_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
