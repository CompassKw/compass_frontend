<template>
  <section class="bg-[#2262AD] mb-5">
    <div class="bg-hero h-[75vh]">
      <div class="container flex items-center h-full">
        <div class="w-full">
          <div class="mb-16">
            <h1
              class="md:text-6xl text-3xl text-white flex items-start flex-wrap tracking-wider mb-7"
            >
              <span class="text-nowrap">
                {{ t("hero_section.best_travel") }}
              </span>
              <span class="text-[#F78248] inline-block tracking-wider relative"
                ><span>{{ t("hero_section.experience") }}</span>
                <span
                  class="h-5 bg-[url('/assets/images/Vector.svg')] w-full inline-block bg-no-repeat absolute -bottom-5 left-0"
                ></span>
              </span>
            </h1>
            <p class="text-white">
              {{ t("hero_section.experience_the_various_exciting_tours") }}
            </p>
          </div>
          <div
            class="md:w-2/3 mx-auto bg-white rounded md:p-5 p-3 flex items-center md:gap-3 gap-2 minsmart:text-sm"
          >
            <span class="md:text-2xl text-lg">
              <font-awesome :icon="['fas', 'location-dot']" />
            </span>
            <label class="w-full">
              <span>{{
                t("hero_section.search_for_destinations_months_continent")
              }}</span>
              <input
                type="text"
                v-model="search"
                class="w-full border-none focus:outline-none text-[#697488]"
                :placeholder="t('hero_section.ie_asia')"
              />
            </label>
            <div class="md:w-36 w-16">
              <UIButton class="bg-[#13357B]" @click="navigateToSearch">
                <span>
                  <font-awesome :icon="['fas', 'magnifying-glass']" />
                </span>
                <span>{{ t("hero_section.search") }}</span>
              </UIButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <h3 class="text-4xl text-[#13357B] font-bold" v-if="name">
    {{ t("hero_section.welcome") }} {{ name }}.
  </h3>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localPath = useLocalePath();
const name = useState("name");
name.value = useCookie("name");
const search = ref("");
function navigateToSearch() {
  navigateTo(localPath(`/search-page/${search.value}`));
}
</script>
<style scoped>
.bg-hero {
  background-image: url(/assets/images/images.png);
  background-position: right top;
  background-size: contain;
  background-repeat: no-repeat;
}
h1 {
  text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff,
    -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
}
</style>
