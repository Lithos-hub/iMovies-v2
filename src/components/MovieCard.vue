<template>
  <div data-testid="wrapper" class="relative">
    <div
      class="image-overlay fadeIn__fast"
      @click="open($event, false, id)"
    ></div>
    <div
      v-if="showDateInfo"
      class="bg-[#202020] p-1 absolute top-0 left-0 w-full text-center rounded-t-md"
    >
      <h4>
        {{ parseDate(release_date) }}
      </h4>
    </div>
    <img
      :src="poster_path ? TMDB_IMG_BASE_URL + poster_path : errorImage"
      class="w-full rounded-t-md z-10"
    />
    <div class="blurring__title--primary">
      <small>{{ title }}</small>
    </div>
    <MovieCardActions :id="id" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MovieListModel } from "../models/interfaces/Movie";
import { parseDate } from "../services/utils";
import { useFloatMenuStore } from "../stores/FloatMenu";
import { useMoviesStore } from "../stores/Movies";
import { TMDB_IMG_BASE_URL } from "../utils";
import MovieCardActions from "./MovieCardActions.vue";

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
