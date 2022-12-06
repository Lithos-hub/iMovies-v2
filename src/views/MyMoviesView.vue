<template>
  <FloatMenu v-if="showFloatMenu" />
  <div data-testid="wrapper">
    <h1>My Movies</h1>

    <section
      data-testid="wrapper"
      class="mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg mx-auto"
    >
      <div class="grid grid-cols-2 justify-center">
        <h5 class="text-2xl tracking-widest mb-5">Favourite</h5>
        <h5 class="text-2xl tracking-widest mb-5">Wishlist</h5>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[#05050575] p-5 rounded-md justify-items-center"
        >
          <article v-for="movie of favouriteData">
            <MovieCard class="w-[200px]" :data="movie" />
          </article>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[#05050575] p-5 rounded-md justify-items-center"
        >
          <article v-for="movie of wishlistData">
            <MovieCard class="w-[200px]" :data="movie" />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import { useMoviesStore } from "../stores/Movies";
import { storeToRefs } from "pinia";

import MoviesServices from "../services/Movies";
import { MovieDetailsModel } from "../models/interfaces/Movie";

import FloatMenu from "../components/FloatMenu.vue";
import MovieCard from "../components/MovieCard.vue";

import { useFloatMenuStore } from "../stores/FloatMenu";

const { favourite, wishlist } = storeToRefs(useMoviesStore());
const { showFloatMenu } = storeToRefs(useFloatMenuStore());

const favouriteData: Ref<MovieDetailsModel[]> = ref([]);
const wishlistData: Ref<MovieDetailsModel[]> = ref([]);

onMounted(async () => {
  favouriteData.value = await Promise.all(
    favourite.value.map((id) => MoviesServices.getMovieById(id))
  ).then((res) => res as MovieDetailsModel[]);

  wishlistData.value = await Promise.all(
    wishlist.value.map((id) => MoviesServices.getMovieById(id))
  ).then((res) => res as MovieDetailsModel[]);
});
</script>

<style scoped></style>
