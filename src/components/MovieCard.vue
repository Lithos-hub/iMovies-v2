<template>
  <div data-testid="wrapper" class="relative w-full">
    <div
      class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
      @click="open($event, false, id)"
    ></div>
    <div
      v-if="showDateInfo"
      class="bg-[#202020] p-2 absolute top-0 left-0 w-full text-center rounded-t-md"
    >
      <h3>
        {{ parseDate(release_date) }}
      </h3>
    </div>
    <img
      :src="poster_path ? TMDB_IMG_BASE_URL + poster_path : errorImage"
      class="w-full rounded-md z-10"
    />
    <div class="blurring__title--primary rounded-b-md">
      <small>{{ title }}</small>
    </div>
    <div class="movie-card--options grid grid-cols-2 justify-items-center">
      <div>
        <i class="fa-solid fa-heart movie-card--buttons hover:bg-red-400"></i>
      </div>
      <div>
        <i class="fa-solid fa-eye movie-card--buttons hover:bg-green-400"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MovieListModel } from "../models/interfaces/Movie";
import { parseDate } from "../services/utils";
import { useFloatMenuStore } from "../stores/FloatMenu";
import { useMoviesStore } from "../stores/Movies";
import { TMDB_IMG_BASE_URL } from "../utils";

const { open } = useFloatMenuStore();
const movieStore = useMoviesStore();

const { errorImage } = storeToRefs(movieStore);

const props = defineProps<{
  data: MovieListModel;
  showDateInfo?: boolean;
}>();

const { id, title, poster_path, release_date } = props.data;
</script>

<style scoped></style>
