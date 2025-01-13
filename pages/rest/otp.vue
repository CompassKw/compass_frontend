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
            {{ t("rest_page.enter_otp_code_sent_to_your_email") }}
          </h5>
        </div>
        <input
          type="text"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.otp"
          @input="otpValidation"
          :class="{ 'border-red-500': !otpValid }"
        />
        <p class="text-red-500 text-sm">{{ errMsg }}</p>
        <UIButton class="bg-[#3554D1]" type="submit">
          {{ t("rest_page.verify_otp") }}
        </UIButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const localPath = useLocalePath();
definePageMeta({
  middleware: function (to, from) {
    const mail = useState("mail");
    if (from.path !== "/rest" && !mail.value) {
      navigateTo(localPath("/rest"));
    }
  },
});

const { t } = useI18n();
const logo = inject("logo") as string;
const BaseUrl = inject("BaseUrl") as string;

const form = ref({
  otp: "",
});

const errMsg = ref("");
const otpValid = ref(true);

function otpValidation() {
  if (form.value.otp.length != 4) {
    otpValid.value = false;
    errMsg.value = t("rest_page.please_enter_a_valid_otp");
  } else {
    otpValid.value = true;
    errMsg.value = "";
  }
}

async function VerifyOTP() {
  if (!form.value.otp) {
    errMsg.value = t("rest_page.please_fill_all_fields");
    return;
  }
  if (!otpValid.value) {
    errMsg.value = t("rest_page.please_enter_a_valid_otp");
    return;
  } else {
    const formData = new FormData();
    formData.append("otp", form.value.otp);
    const mail = useState("mail");
    formData.append("email", mail.value as string);

    const { data } = await useFetch<Api>(`${BaseUrl}/verify-otp`, {
      method: "POST",
      body: formData,
    });
    if (data.value?.data.message === "OTP verified successfully.") {
      navigateTo(localPath("/rest/reset-password"));
      errMsg.value = "";
      form.value = {
        otp: "",
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
