<template>
  <h1>New movie trailers</h1>
  <section
    data-testid="wrapper"
    class="mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="!isLoading && dataLoaded"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-5">
      <div
        v-for="{ id, title, trailer_key } of trailers"
        :key="trailer_key"
        class="relative w-full mb-10"
      >
        <h5
          class="hover:text-white hover:underline duration-200 cursor-pointer text-2xl tracking-widest mb-5"
          @click="goTo(`movie/${id}`)"
        >
          {{ title }}
        </h5>
        <iframe
          :src="`https://www.youtube.com/embed/${trailer_key}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-[350px] lg:h-[400px] rounded-[10px]"
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
const { movies, trailers } = storeToRefs(useMoviesStore());

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
