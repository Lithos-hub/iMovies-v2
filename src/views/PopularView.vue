<template>
  <MenuFloat v-if="showFloatMenu" />
  <h1>Popular movies by year</h1>
  <SearchInput
    v-model="year"
    placeholder="Write a year"
    variant="secondary"
    class="w-[200px] text-center p-0 mt-5 mx-auto"
    maxlength="4"
    :error-message="errorMessage"
    @search="onPressEnter($event as Event)"
  />
  <section
    data-testid="data-results"
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="dataLoaded"
  >
    <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
      <div
        v-for="{ id, title, poster_path } of movies"
        :key="id"
        class="relative w-full"
      >
        <div
          class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
          @click="open($event, false, id)"
        ></div>
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
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { imageBaseUrl } from "../utils";

import { useMoviesStore } from "../stores/Movies";
import { useNavigationStore } from "../stores/Navigation";

import MenuFloat from "../components/FloatMenu.vue";
import SearchInput from "../components/SearchInput.vue";
import Spinner from "../components/Spinner.vue";

import { useFloatMenuStore } from "../stores/FloatMenu";

const movieStore = useMoviesStore();
const { goTo } = useNavigationStore();

const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();
const { movies, errorImage } = storeToRefs(movieStore);
const { showFloatMenu } = storeToRefs(floatMenuStore);

const isLoading = ref(false);
const currentYear = new Date().getFullYear();
const year = ref("");
const errorMessage = computed(() =>
  (year.value && +year.value < 1878) || +year.value > currentYear + 6
    ? "Write a valid year"
    : ""
);

const dataLoaded = computed(() => movies.value.length > 0);

const onPressEnter = async (event: Event) => {
  movies.value = [];
  if (!errorMessage.value) {
    if (event) event.preventDefault();
    isLoading.value = true;
    await movieStore.getMovies({
      page: 1,
      sort_by: "popularity.desc",
      year: (event.target as HTMLInputElement).value as string,
    });
  }
  isLoading.value = false;
};
</script>
