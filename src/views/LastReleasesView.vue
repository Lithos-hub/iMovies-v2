<template>
  <MenuFloat v-if="showFloatMenu" />
  <h1>Last releases</h1>
  <section
    data-testid="wrapper"
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="dataLoaded"
  >
    <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
      <div
        v-for="{ id, title, poster_path, release_date } of movies"
        :key="id"
        class="relative w-full"
      >
        <div
          class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
          @click="open($event, false, id)"
        ></div>
        <div
          class="bg-[#202020] p-2 absolute top-0 left-0 w-full text-center rounded-t-md"
        >
          <h3>
            {{ parseDate(release_date) }}
          </h3>
        </div>
        <img
          :src="poster_path ? imageBaseUrl + poster_path : errorImage"
          class="w-full rounded-md"
        />
        <div class="blurring__title--primary rounded-b-md">
          <small>{{ title }}</small>
        </div>
      </div>
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

import { CURRENT_DATE, ONE_MONTH_AGO, parseDate } from "../services/utils";
import { imageBaseUrl } from "../utils";

import { useMoviesStore } from "../stores/Movies";
import { useFloatMenuStore } from "../stores/FloatMenu";

import MenuFloat from "../components/FloatMenu.vue";

import Spinner from "../components/Spinner.vue";

const movieStore = useMoviesStore();
const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();
const { showFloatMenu } = storeToRefs(floatMenuStore);

const { movies, errorImage } = storeToRefs(movieStore);

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
