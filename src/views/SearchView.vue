<template>
  <main class="mt-[50px]">
    <input
      data-testid="input"
      class="input__secondary"
      placeholder="Search by movie title, actor name, etc"
      @keydown.enter="onPressEnter($event as Event)"
    />
    <section
      data-testid="data-results"
      class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
      v-if="dataLoaded"
    >
      <div
        class="grid grid-cols-2 gap-5 md:grid-cols-9 lg:gap-0 lg:grid-cols-11 justify-items-center"
      >
        <article class="col-span-none md:col-span-4 lg:col-span-5">
          <h1>Movies</h1>
          <div
            class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <div
              v-for="{ id, title, poster_path } of movies"
              :key="id"
              class="relative w-full lg:w-[180px]"
            >
              <img
                :src="poster_path ? imageBaseUrl + poster_path : errorImage"
                class="w-full lg:w-[180px]"
              />
              <div class="blurring__title--primary">
                <small>{{ title }}</small>
              </div>
            </div>
          </div>
        </article>
        <article class="hidden md:block md:col-span-1 lg:col-span-1"></article>
        <article class="col-span-none md:col-span-4 lg:col-span-5">
          <h1>Artists</h1>
          <div
            class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <div
              v-for="{
                id,
                name,
                known_for_department,
                profile_path,
              } of artistResults"
              :key="id"
              class="relative w-full lg:w-[180px]"
            >
              <div
                class="absolute top-0 left-0 w-full text-left pl-2 bg-[#202020]"
              >
                {{ known_for_department }}
              </div>
              <img
                :src="profile_path ? imageBaseUrl + profile_path : errorImage"
                class="w-full lg:w-[180px]"
              />
              <div class="blurring__title--secondary">
                <small>{{ name }}</small>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
    <div v-if="isLoading && !dataLoaded">
      <Spinner
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMoviesStore } from "../stores/Movies";

import { imageBaseUrl } from "../utils";

import Spinner from "../components/Spinner.vue";

const movieStore = useMoviesStore();

const { movies, artistResults, errorImage } = storeToRefs(movieStore);

const dataLoaded = computed(
  () => movies.value.length > 0 || artistResults.value.length
);
const isLoading = ref(false);

const onPressEnter = async (event: Event) => {
  isLoading.value = true;
  if (event) event.preventDefault();
  await movieStore.onSearch({
    page: 1,
    sort_by: "popularity.desc",
    query: (event.target as HTMLInputElement).value as string,
  });
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
