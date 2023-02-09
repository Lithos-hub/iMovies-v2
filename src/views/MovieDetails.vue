<template>
  <section
    data-testid="wrapper"
    class="mt-10 rounded-[15px] relative mx-auto bg-[#050505]"
    v-if="dataLoaded"
  >
    <div
      class="bg-gradient-to-b text-left p-5 from-cyan-900 to-[#050505] rounded-[15px] relative top-0 left-0 w-full h-[800px]"
    >
      <img
        :src="
          movie.backdrop_path
            ? TMDB_IMG_BASE_URL + movie.backdrop_path
            : errorImage
        "
        class="absolute top-0 left-0 mix-blend-multiply rounded-[15px] h-full w-full object-cover"
      />

      <div class="md:grid md:grid-cols-12 gap-5">
        <div class="col-span-6 lg:col-span-9">
          <h1
            id="movie__title"
            class="relative text-[18px] md:text-2xl lg:text-4xl"
          >
            {{ movie.title }}
          </h1>
          <q v-if="movie.tagline" class="relative text-cyan-200 text-[15px]">
            {{ movie.tagline }}
          </q>
          <div class="relative mt-5">
            Release date:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200"
              >{{ parseDate(movie.release_date as string) }}</span
            >
          </div>
          <div class="relative mt-5">
            Genres:
            <span
              v-for="{ name } of movie.genres"
              class="bg-[#050505] bg-opacity-70 p-1 mx-1 px-5 rounded-full text-cyan-200"
              >{{ name }}</span
            >
          </div>
          <div class="relative mt-5">
            Spoken languages:
            <span
              v-for="{ english_name } of movie.spoken_languages"
              class="bg-[#050505] bg-opacity-70 p-1 mx-1 px-5 rounded-full text-cyan-200"
              >{{ english_name }}</span
            >
          </div>
          <div class="relative mt-5">
            Original language:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200 uppercase"
              >{{ movie.original_language }}</span
            >
          </div>
          <div class="relative mt-5">
            Budget:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200"
              >{{
                movie.budget ? movie.budget.toLocaleString() + " $" : "unknown"
              }}</span
            >
          </div>
          <div class="relative mt-5">
            Revenue:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200"
              >{{
                movie.revenue
                  ? movie.revenue.toLocaleString() + " $"
                  : "unknown"
              }}</span
            >
          </div>
          <div class="relative mt-5">
            Profit:
            <span class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full"
              ><span
                :class="
                  movie.revenue - movie.budget > 0
                    ? 'text-green-300'
                    : 'text-red-300'
                "
                >{{ (movie.revenue - movie.budget).toLocaleString() }}</span
              >
              $</span
            >
          </div>
          <div class="relative mt-5">
            Runtime:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200"
              >{{ movie.runtime ? movie.runtime + " minutes" : "unknown" }}
            </span>
          </div>
          <div class="relative mt-5">
            Vote average:
            <span
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-full text-cyan-200"
              >{{ movie.vote_average }}
              <span class="text-cyan-50"
                >({{ movie.vote_count.toLocaleString() }} votes)</span
              ></span
            >
          </div>
          <div class="relative mt-5 flex">
            Overview:
            <p
              class="bg-[#050505] bg-opacity-70 p-1 mx-2 px-5 rounded-md text-justify max-h-[150px] md:max-h-[250px] overflow-auto"
            >
              <span
                :class="movie.overview ? 'text-cyan-200' : 'text-red-300'"
                >{{ movie.overview || "No overview available" }}</span
              >
            </p>
          </div>
        </div>
        <div
          class="justify-self-end col-span-6 lg:col-span-3 mt-5 md:mt-0 text-center flex flex-col gap-5"
        >
          <div>
            <img
              :src="
                movie.poster_path
                  ? TMDB_IMG_BASE_URL + movie.poster_path
                  : errorImage
              "
              class="hidden md:block relative rounded-t-[15px] shadow-lg w-full max-w-[400px] h-auto"
            />
            <MovieCardActions :id="id" />
          </div>
          <div class="flex justify-between">
            <button
              class="relative button__primary"
              @click="goTo(`/movie/${id}/video`)"
            >
              Show trailer
            </button>
            <a
              v-if="movie.homepage"
              :href="movie.homepage"
              target="_blank"
              class="relative button__secondary"
            >
              Visit webpage
            </a>
          </div>
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
import { useRoute } from "vue-router";

import { TMDB_IMG_BASE_URL } from "../utils";

import { storeToRefs } from "pinia";
import { useMoviesStore } from "../stores/Movies";

import Spinner from "../components/Spinner.vue";
import { useNavigationStore } from "../stores/Navigation";
import MovieCardActions from "../components/MovieCardActions.vue";
import { parseDate } from "../services/utils";

const route = useRoute();
const movieStore = useMoviesStore();
const { goTo } = useNavigationStore();
const id = Number(route.params.id);

const { movie, errorImage } = storeToRefs(useMoviesStore());

const isLoading = ref(true);
const dataLoaded = computed(() => Object.keys(movie.value).length > 0);

const getMovie = async () => {
  await movieStore.getMovieDetails(id).then(() => {
    isLoading.value = false;
  });
};
onMounted(() => getMovie());
</script>
