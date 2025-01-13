<template>
  <nav class="bg-white fixed w-full z-50 shadow-searchBox">
    <div class="container font-cairo">
      <div class="flex justify-between items-center min-h-28">
        <NuxtLink :to="localPath('/')" class="w-[180px] h-[80px]">
          <NuxtImg :src="logo" alt="logo" class="h-full" />
        </NuxtLink>
        <button @click="openNav = true" class="lab:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7 16H16"
              stroke="#4B4949"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 10H25"
              stroke="#4B4949"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 22H25"
              stroke="#4B4949"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div
          class="smart:menu-bar z-50 lab:translate-x-0 transition-transform smart:px-6"
          :class="{ '-translate-x-full': !openNav }"
        >
          <NuxtImg :src="logo" class="lab:hidden w-2/3 mx-auto" alt="" />
          <div class="w-full lab:hidden">
            <button @click="handleClick" class="btn bg-third text-white">
              {{ text }}
            </button>
          </div>
          <ul class="flex smart:flex-col smart:gap-5 gap-3">
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.home") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/group-trips')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.group_trips") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/private-trips')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.private_trips") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/cart')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.cart") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/rules/General-Terms-of-Use')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.terms") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/blog')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.blog") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/about-us')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.about_us") }}
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="localPath('/store')"
                active-class="active"
                exact-active-class="active"
                @click="openNav = false"
                class="nav-link"
              >
                {{ t("nav.store") }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <USelectMenu
          class="w-[84px]"
          v-model="currentLocale"
          :options="locales"
        >
          <template #leading>
            {{ t(currentLocale.name) }}
          </template>
          <template #option="{ option: loc }">
            {{ t(loc.name) }}
          </template>
        </USelectMenu>
        <div class="lab:w-48 smart:w-32 smart:hidden">
          <button @click="handleClick" class="btn bg-third text-white">
            {{ $t(text) }}
          </button>
        </div>
        <div
          @click="openNav = false"
          class="absolute top-0 end-0 h-screen w-full bg-[rgba(0,0,0,0.4)] z-40"
          :class="{ hidden: !openNav }"
        ></div>
      </div>
    </div>
  </nav>

  <div class="md:pt-[124px] pt-[112px]"></div>
</template>

<script setup lang="ts">
const stateName = useState("name");
const { locale, setLocale, t } = useI18n();
const localPath = useLocalePath();
const locales = useLanguages();
const text = ref(stateName.value ? "logout" : "login");
const name = useCookie("name");

watch(
  () => stateName.value,
  () => {
    if (stateName.value) {
      text.value = "logout";
    } else {
      text.value = "login";
    }
  }
);

function handleClick() {
  const token = useCookie("token");
  if (token.value) {
    token.value = null;
    name.value = null;
    stateName.value = null;
    text.value = "login";
    navigateTo(localPath("/"));
  } else {
    navigateTo(localPath("/login"));
  }
}
const openNav = ref(false);
const props = defineProps(["logo"]);
const logo = ref(props.logo);

const currentLocale = ref({} as Language);
currentLocale.value = locales.find(
  (loc) => loc.value === locale.value
) as Language;
useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === "ar" ? "rtl" : "ltr",
  },
});

watch(
  () => currentLocale.value,
  (newVal) => {
    setLocale(newVal.value as "en" | "ar");
    useHead({
      htmlAttrs: {
        lang: newVal.value,
        dir: newVal.value === "ar" ? "rtl" : "ltr",
      },
    });
  }
);
</script>
