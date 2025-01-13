<template>
  <div class="grid md:grid-cols-4 mintab:grid-cols-2 mob:grid-cols-1 gap-7">
    <div v-for="tour in tours" :key="tour.id">
      <UITourCard :tour="tour" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tours: Trip[];
}>();
const tours = ref(props.tours) as Ref<Trip[]>;
</script>
