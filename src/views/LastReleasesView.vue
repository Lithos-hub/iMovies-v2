<template>
  <MenuFloat v-if="showFloatMenu" />
  <h1>Last releases</h1>
  <section
    data-testid="wrapper"
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="dataLoaded"
  >
    <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
      <MovieCard
        v-for="(movie, i) of movies"
        :key="i"
        :data="movie"
        show-date-info
      />
    </div>
  </section>
  <div v-if="isLoading && !dataLoaded">
    <Spinner
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { CURRENT_DATE, ONE_MONTH_AGO } from "../services/utils";

import { useMoviesStore } from "../stores/Movies";
import { useFloatMenuStore } from "../stores/FloatMenu";

import MenuFloat from "../components/FloatMenu.vue";

import Spinner from "../components/Spinner.vue";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMoviesStore();
const floatMenuStore = useFloatMenuStore();

const { showFloatMenu } = storeToRefs(floatMenuStore);

const { movies } = storeToRefs(movieStore);

const isLoading = ref(true);
const dataLoaded = computed(() => movies.value.length > 0);

onMounted(async () => {
  await movieStore.getMovies({
    page: 1,
    sort_by: "release_date.desc",
    "vote_average.gte": 7,
    "primary_release_date.gte": ONE_MONTH_AGO,
    "primary_release_date.lte": CURRENT_DATE,
  });
  isLoading.value = false;
});
</script>
