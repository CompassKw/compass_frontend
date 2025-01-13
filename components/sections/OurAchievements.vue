<template>
  <section class="bg-[#0D2857] text-white" ref="OurAchievements">
    <div class="container py-16">
      <div
        class="grid grid-cols-4 mob:grid-cols-2 gap-y-5 justify-items-center text-center"
      >
        <div>
          <p class="text-[40px] font-semibold">{{ Destinations }}</p>
          <p class="text-xl">
            {{ t("our_achievements_section.destinations") }}
          </p>
        </div>
        <div>
          <p class="text-[40px] font-semibold">{{ Countries }}</p>
          <p class="text-xl">
            {{ t("our_achievements_section.countries") }}
          </p>
        </div>
        <div>
          <p class="text-[40px] font-semibold">{{ Continents }}</p>
          <p class="text-xl">
            {{ t("our_achievements_section.continents") }}
          </p>
        </div>
        <div>
          <p class="text-[40px] font-semibold">+{{ HappyCustomers }}</p>
          <p class="text-xl">
            {{ t("our_achievements_section.happy_customers") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const counterAnimted = ref(false);
const OurAchievements = ref(null);
function scrollCounter() {
  if (!counterAnimted.value) {
    const top = OurAchievements.value.getBoundingClientRect().top;
    const bottom = OurAchievements.value.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (top < windowHeight && bottom > 0) {
      counterAnimted.value = true;
      counterDestinations();
      counterCountries();
      counterContinents();
      counterHappyCustomers();
    }
  }
}
const Destinations = ref(0);
function counterDestinations() {
  const end = 321;
  const start = 0;
  const duration = 2;
  const range = end - start;
  let current = start;
  const increment = Math.ceil(end / 200);
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    Destinations.value = current;
  }, stepTime);
}
const Countries = ref(0);
function counterCountries() {
  const end = 66;
  const start = 0;
  const duration = 2;
  const range = end - start;
  let current = start;
  const increment = Math.ceil(end / 200);
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    Countries.value = current;
  }, stepTime);
}
const Continents = ref(0);
function counterContinents() {
  const end = 6;
  const start = 0;
  const duration = 2;
  const range = end - start;
  let current = start;
  const increment = Math.ceil(end / 200);
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    Continents.value = current;
  }, stepTime);
}
const HappyCustomers = ref(0);
function counterHappyCustomers() {
  const end = 5000;
  const start = 0;
  const duration = 2;
  const range = end - start;
  let current = start;
  const increment = Math.ceil(end / 200);
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    HappyCustomers.value = current;
  }, stepTime);
}
onMounted(() => {
  window.addEventListener("scroll", scrollCounter);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollCounter);
});
</script>
