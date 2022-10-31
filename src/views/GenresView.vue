<template>
  <main class="mt-[50px]">
    <MenuFloat v-if="showFloatMenu" />
    <h1>Movies by genre</h1>
    <section
      data-testid="data-results"
      class="container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg text-right grid md:grid-cols-3 gap-2"
      v-if="dataLoaded"
    >
      <article
        v-for="({ genreName, movies }, i) of getSorted(moviesByGenre)"
        :key="i"
        class="relative font-bold border border-[#202020] hover:bg-cyan-900 hover:bg-opacity-20 hover:brightness-150 cursor-pointer duration-200"
        @click="openDialog(genreName, movies)"
      >
        <img
          :src="
            movies[i].backdrop_path
              ? imageBaseUrl + movies[i].backdrop_path
              : errorImagePan
          "
          class="relative brightness-50 object-cover w-full"
        />
        <div
          id="genre__name"
          class="absolute bottom-0 left-0 text-center text-[2rem] lg:text-[3rem] w-full p-3 font-bold uppercase"
        >
          {{ genreName }}
        </div>
      </article>
    </section>
  </main>
  <Dialog
    v-if="showDialog"
    :title="selected_genre"
    class="w-[1000px]"
    @close="showDialog = false"
  >
    <section
      data-testid="data-results"
      class="bg-[#050505] bg-opacity-50 p-5 rounded-lg"
    >
      <div class="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        <div
          v-for="{ id, title, poster_path } of selected_movies"
          :key="id"
          class="relative w-full"
        >
          <div
            class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
            @click="open(id, $event)"
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
  </Dialog>
  <div v-if="isLoading && !dataLoaded">
    <Spinner
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, toRefs, reactive, computed, onMounted } from "vue";

import { movieGenres } from "../utils";
import { imageBaseUrl } from "../utils";

import { useMoviesStore } from "../stores/Movies";
import { useFloatMenuStore } from "../stores/FloatMenu";
import { storeToRefs } from "pinia";

import { MovieListModel } from "../models/interfaces/Movie";

import MenuFloat from "../components/FloatMenu.vue";
import Spinner from "../components/Spinner.vue";
import Dialog from "../components/Dialog.vue";

const movieStore = useMoviesStore();
const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();

const { movies, errorImage, errorImagePan } = storeToRefs(movieStore);
const { showFloatMenu } = storeToRefs(floatMenuStore);

const moviesByGenre: Ref<Record<string, any>[]> = ref([]);

const selectedData = reactive({
  selected_genre: "" as string,
  selected_movies: [] as MovieListModel[],
});

const { selected_genre, selected_movies } = toRefs(selectedData);

const isLoading = ref(true);
const showDialog = ref(false);

const dataLoaded = computed(() => movies.value.length > 0);

const openDialog = (genre: string, movies: MovieListModel[]) => {
  showDialog.value = true;
  selected_genre.value = genre;
  selected_movies.value = movies;
};

const getExcludedGenres = (genreWillNotExclude: number) =>
  movieGenres
    .filter(({ id }) => id !== genreWillNotExclude)
    .map(({ id }) => id)
    .join(",");

const getMoviesByGenre = () => {
  movieGenres.forEach(async ({ id, name }) => {
    await movieStore.getMovies({
      page: 1,
      with_genres: id,
      exclude_genres: getExcludedGenres(id),
      ["vote_average.gte"]: 7,
      sort_by: "popularity.desc",
    });
    console.log(getExcludedGenres(id));
    moviesByGenre.value.push({
      genreId: id,
      genreName: name,
      movies: movies.value as MovieListModel[],
    });
  });
};

const getSorted = (array: any[]) =>
  array.sort((a, b) =>
    a.genreName > b.genreName ? 1 : b.genreName > a.genreName ? -1 : 0
  );

onMounted(async () => {
  await getMoviesByGenre();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

#genre__name {
  color: #05050580;
  text-shadow: 1px 1px $primary, -1px -1px #202020;
  mix-blend-mode: hard-light;
  backdrop-filter: blur(20px);
  filter: brightness(1.5);
}
</style>
