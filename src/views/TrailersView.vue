<template>
  <h1>New movie trailers</h1>
  <section
    data-testid="wrapper"
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="!isLoading && dataLoaded"
  >
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="{ id, title, trailer_key } of trailers"
        :key="trailer_key"
        class="relative w-full mt-5"
      >
        <h4
          class="pt-5 hover:text-white hover:underline duration-200 cursor-pointer"
          @click="goTo(`movie/${id}`)"
        >
          {{ title }}
        </h4>
        <iframe
          :src="`https://www.youtube.com/embed/${trailer_key}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-[350px] lg:h-full rounded-[10px] pb-5"
        ></iframe>
      </div>
    </div>
  </section>
  <div v-if="isLoading || !dataLoaded">
    <Spinner
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useMoviesStore } from "../stores/Movies";
import { useNavigationStore } from "../stores/Navigation";

import { MovieAxiosOptions } from "../models/interfaces/Movie";

import Spinner from "../components/Spinner.vue";

const movieStore = useMoviesStore();
const { goTo } = useNavigationStore();
const { movies, trailers } = storeToRefs(movieStore);

const dataLoaded = computed(() => trailers.value.length);
const isLoading = ref(true);

onMounted(async () => {
  await movieStore.getMovies({
    page: 1,
    sort_by: "popularity.desc",
    year: new Date().getFullYear(),
  } as MovieAxiosOptions);

  movies.value.forEach(
    async ({ id, title }) => await movieStore.getMovieTrailers(id, title)
  );

  setTimeout(() => (isLoading.value = false), 1500);
});
</script>

<style scoped></style>
