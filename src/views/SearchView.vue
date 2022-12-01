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
    class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg relative"
    v-if="dataLoaded"
  >
    <div
      id="search-tabs"
      class="grid grid-cols-2 justify-items-center bg-[#202020] p-2 rounded sticky top-0"
    >
      <div
        @click="show('movies')"
        class="hover:bg-cyan-800 hover:text-cyan-300 w-full p-1 rounded duration-200 bg-opacity-10 cursor-pointer text-3xl font-bold"
      >
        Movies results ({{ movies.length }})
      </div>
      <div
        @click="show('artists')"
        class="hover:bg-blue-800 hover:text-blue-300 w-full p-1 rounded duration-200 bg-opacity-10 cursor-pointer text-3xl font-bold"
      >
        Artists results ({{ artistResults.length }})
      </div>
    </div>
    <div
      class="mt-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 z-10 relative"
      v-if="category === 'movies'"
    >
      <MovieCard
        v-for="(movie, i) of movies"
        :key="i"
        :data="movie"
        show-date-info
      />
    </div>
    <div
      class="mt-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5"
      v-if="category === 'artists'"
    >
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
          :src="profile_path ? TMDB_IMG_BASE_URL + profile_path : errorImage"
          class="w-full rounded-md"
        />
        <div class="blurring__title--secondary rounded-b-md">
          <small>{{ name }}</small>
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
import { Ref, ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMoviesStore } from "../stores/Movies";

import { TMDB_IMG_BASE_URL } from "../utils";

import Spinner from "../components/Spinner.vue";
import SearchInput from "../components/SearchInput.vue";
import MenuFloat from "../components/FloatMenu.vue";
import { useFloatMenuStore } from "../stores/FloatMenu";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMoviesStore();

const { movies, artistResults, errorImage } = storeToRefs(movieStore);
const floatMenuStore = useFloatMenuStore();

const { showFloatMenu } = storeToRefs(floatMenuStore);

const dataLoaded = computed(
  () => movies.value.length > 0 || artistResults.value.length
);
const category: Ref<String> = ref("movies");
const isLoading: Ref<Boolean> = ref(false);

const show = (cat: string) => (category.value = cat);

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

<style lang="scss" scoped>
#search-tabs {
  z-index: 9999;
}
</style>
