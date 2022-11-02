<template>
  <main>
    <section
      data-testid="data-results"
      class="container mt-5 rounded-[15px] relative mx-auto bg-[#050505]"
      v-if="dataLoaded"
    >
      <div
        class="bg-gradient-to-b text-left p-5 bg-cyan-900 bg-opacity-50 rounded-[15px] relative top-0 left-0 w-full"
      >
        <ComebackButton class="mb-2" />
        <iframe
          :src="`https://www.youtube.com/embed/${movieTrailer.key}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-[350px] lg:h-[700px] rounded-[10px]"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { storeToRefs } from "pinia";
import { useMoviesStore } from "../stores/Movies";

import ComebackButton from "../components/ComebackButton.vue";

const route = useRoute();
const movieStore = useMoviesStore();

const { movieTrailer } = storeToRefs(movieStore);

const dataLoaded = computed(() => Object.keys(movieTrailer).length);

onMounted(() => movieStore.getMovieTrailer(Number(route.params.id)));
</script>

<style scoped></style>
