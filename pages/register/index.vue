<template>
  <section
    class="bg-[linear-gradient(180deg,#DAE9FF_0%,#FFFFFF_100%)] w-full py-[120px] flex items-center justify-center"
  >
    <div
      class="bg-white w-[630px] py-8 px-12 shadow-[0px_0px_10.4px_3px_#00000040] flex flex-col items-center justify-center"
    >
      <NuxtImg :src="logo" class="w-1/3 mx-auto mb-9" alt="logo" />
      <form class="w-full flex flex-col gap-5" @submit.prevent="register">
        <div>
          <h5 class="text-first text-xl font-medium mb-3">
            {{ t("register_page.sign_up_for_a_new_account") }}
          </h5>
          <p class="text-fourth">
            {{ t("register_page.do_have_an_account") }}
            <NuxtLink :to="localPath('/login')" class="text-[#3554D1]">
              {{ t("register_page.sign_in") }}
            </NuxtLink>
          </p>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <p class="text-fourth text-xl mr-5">
              {{ t("register_page.upload_profile_picture") }}
            </p>
            <label class="text-first font-semibold underline cursor-pointer">
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="imgUpload"
              />
              {{ t("register_page.upload") }}
            </label>
          </div>
          <p class="text-fourth">
            {{ t("register_page.optional") }}
          </p>
        </div>
        <input
          type="text"
          :placeholder="t('register_page.full_name')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.name"
        />
        <input
          type="email"
          :placeholder="t('register_page.email')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.email"
        />
        <div>
          <!-- country code and phone -->
          <div class="flex items-center gap-2">
            <input
              type="number"
              :placeholder="t('register_page.country_code')"
              class="p-2 border border-[#DDDDDD] text-first w-1/4"
              v-model="form.country_code"
            />
            <input
              type="tel"
              :placeholder="t('register_page.mobile_number')"
              class="p-2 border border-[#DDDDDD] text-first w-3/4"
              v-model="form.mobile"
            />
          </div>
        </div>
        <div>
          <!-- barthday date -->
          <input
            type="date"
            :placeholder="t('register_page.date_of_birth')"
            class="p-2 border border-[#DDDDDD] text-first w-full"
            v-model="form.date_of_birth"
          />
        </div>
        <input
          type="text"
          :placeholder="t('register_page.nationality')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.nationality"
        />
        <input
          type="text"
          :placeholder="t('register_page.country_of_residence')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.country"
        />
        <input
          type="text"
          :placeholder="t('register_page.area_city')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.city"
        />
        <input
          type="password"
          :placeholder="t('register_page.password')"
          class="p-2 border border-[#DDDDDD] text-first w-full"
          v-model="form.password"
        />
        <div>
          <input
            type="password"
            :placeholder="t('register_page.confirm_password')"
            class="p-2 border border-[#DDDDDD] text-first w-full"
            :class="{ 'border-red-500': !passwordMatch }"
            v-model="form.password_confirmation"
            @input="confirmPassword"
          />
          <p v-if="!passwordMatch" class="text-red-500">
            {{ t("register_page.password_does_not_match") }}
          </p>
        </div>
        <p class="text-red-500">{{ errMsg }}</p>
        <UIButton class="bg-[#3554D1]" type="submit">
          {{ t("register_page.register") }}
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
  name: "",
  image: "",
  email: "",
  country_code: "",
  mobile: "",
  nationality: "",
  country: "",
  city: "",
  date_of_birth: "",
  password: "",
  password_confirmation: "",
});

function imgUpload(e: any) {
  form.value.image = e.target.files[0];
}

const passwordMatch = ref(true);

function confirmPassword(e: any) {
  if (form.value.password !== e.target.value) {
    passwordMatch.value = false;
  } else {
    passwordMatch.value = true;
  }
}

const errMsg = ref("");

async function register() {
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.country_code ||
    !form.value.mobile ||
    !form.value.nationality ||
    !form.value.country ||
    !form.value.city ||
    !form.value.date_of_birth ||
    !form.value.password ||
    !form.value.password_confirmation
  ) {
    errMsg.value = t("register_page.please_fill_all_fields");
    return;
  } else if (form.value.password !== form.value.password_confirmation) {
    errMsg.value = t("register_page.password_does_not_match");
    return;
  } else {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("image", form.value.image);
    formData.append("email", form.value.email);
    formData.append("country_code", form.value.country_code.toString());
    formData.append("mobile", form.value.mobile);
    formData.append("nationality", form.value.nationality);
    formData.append("country", form.value.country);
    formData.append("city", form.value.city);
    formData.append("date_of_birth", form.value.date_of_birth);
    formData.append("password", form.value.password);
    formData.append("password_confirmation", form.value.password_confirmation);

    const { data } = await useFetch<Api>(`${BaseUrl}/register`, {
      method: "POST",
      body: formData,
    });
    if (data.value?.message === "User Registered Successfully") {
      navigateTo(localPath("/login"));
      errMsg.value = "";
      form.value = {
        name: "",
        image: "",
        email: "",
        country_code: "",
        mobile: "",
        nationality: "",
        country: "",
        city: "",
        date_of_birth: "",
        password: "",
        password_confirmation: "",
      };
    } else {
      errMsg.value = data.value?.message as string;
    }
  }
}

useSeoMeta({
  title: t("register_page.seo.title"),
  description: t("register_page.seo.description"),
  ogTitle: t("register_page.seo.title"),
  ogDescription: t("register_page.seo.description"),
  ogImage: "/favicon.ico",
  ogUrl: "[og:url]",
  twitterTitle: t("register_page.seo.title"),
  twitterDescription: t("register_page.seo.description"),
  twitterImage: "/favicon.ico",
  twitterCard: "summary",
});
</script>
