<template>
  <section
    class="bg-[linear-gradient(180deg,#DAE9FF_0%,#FFFFFF_100%)] w-full min-h-[85vh] flex items-center justify-center"
  >
    <div
      class="bg-white w-[630px] py-8 px-12 shadow-[0px_0px_10.4px_3px_#00000040] flex flex-col items-center justify-center"
    >
      <NuxtImg :src="logo" class="w-1/3 mx-auto mb-9" alt="logo" />
      <form class="w-full flex flex-col gap-5" @submit.prevent="GetOTP">
        <div>
          <h5 class="text-first text-xl font-medium mb-3">
            {{ t("rest_page.enter_email_used_in_registration") }}
          </h5>
        </div>
        <input
          type="email"
          placeholder="Email"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.email"
        />
        <p class="text-red-500 text-sm">{{ errMsg }}</p>
        <UIButton class="bg-[#3554D1]" type="submit">
          {{ t("rest_page.get_otp") }}
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
});

const errMsg = ref("");

async function GetOTP() {
  if (!form.value.email) {
    errMsg.value = t("rest_page.please_fill_all_fields");
    return;
  } else {
    const formData = new FormData();
    formData.append("email", form.value.email);

    const { data } = await useFetch<Api>(`${BaseUrl}/forget-password`, {
      method: "POST",
      body: formData,
    });
    if (data.value?.data.message === "OTP has been sent to your email.") {
      const mail = useState("mail");
      mail.value = form.value.email;
      navigateTo(localPath("/rest/otp"));
      errMsg.value = "";
      form.value = {
        email: "",
      };
    } else {
      errMsg.value = data.value?.data.message as string;
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
