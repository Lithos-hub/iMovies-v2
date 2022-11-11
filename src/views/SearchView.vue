<template>
  <MenuFloat v-if="showFloatMenu" />
  <h1>Search movies or artists</h1>
  <SearchInput
    placeholder="Search by movie title, artist name, etc"
    variant="secondary"
    class="mt-5"
    @search="onPressEnter($event as Event)"
  />
  <section
    data-testid="wrapper"
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    v-if="dataLoaded"
  >
    <div class="grid grid-cols-2 gap-5 justify-items-center">
      <article>
        <h1>Movies</h1>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </article>
      <article>
        <h1>Artists</h1>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="{
              id,
              name,
              known_for_department,
              profile_path,
            } of artistResults"
            :key="id"
            class="relative w-full"
          >
            <div
              class="absolute top-0 left-0 w-full text-left pl-2 bg-[#202020] rounded-t-md"
            >
              {{ known_for_department }}
            </div>
            <div
              class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
            ></div>
            <img
              :src="profile_path ? imageBaseUrl + profile_path : errorImage"
              class="w-full rounded-md"
            />
            <div class="blurring__title--secondary rounded-b-md">
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMoviesStore } from "../stores/Movies";
import { useNavigationStore } from "../stores/Navigation";

import { imageBaseUrl } from "../utils";

import Spinner from "../components/Spinner.vue";
import SearchInput from "../components/SearchInput.vue";
import MenuFloat from "../components/FloatMenu.vue";
import { useFloatMenuStore } from "../stores/FloatMenu";

const movieStore = useMoviesStore();
const { goTo } = useNavigationStore();

const { movies, artistResults, errorImage } = storeToRefs(movieStore);
const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();
const { showFloatMenu } = storeToRefs(floatMenuStore);

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
