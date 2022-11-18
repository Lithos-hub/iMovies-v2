<template>
  <section data-testid="wrapper" v-if="dataLoaded">
    <MenuFloat v-if="showFloatMenu" />
    <div
      ref="carrousel"
      id="carrousel"
      class="fadeIn__slow bg-[#151515] shadow-lg mt-5"
      @wheel="onScroll"
    >
      <div
        v-for="{ id, backdrop_path, title } of movieStore.movies"
        class="relative"
      >
        <div
          class="absolute h-full w-full hover:bg-cyan-900 hover:bg-opacity-50 mix-blend-color-dodge cursor-pointer duration-100"
          @click="open($event, false, id)"
        ></div>
        <img class="carrousel__img" :src="TMDB_IMG_BASE_URL + backdrop_path" />
        <div class="blurring__title--primary">
          <small>{{ title }}</small>
        </div>
      </div>
    </div>
    <main class="pb-5">
      <div class="flex flex-col lg:grid lg:grid-cols-5 gap-5">
        <div class="lg:col-span-4">
          <h2 class="my-5">Movie of the week</h2>
          <hr class="mb-5" />
          <div class="flex flex-col lg:grid lg:grid-cols-2 gap-5">
            <iframe
              :src="`https://www.youtube.com/embed/${trailerOfTheWeek?.key}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-[350px] lg:h-full rounded-[10px]"
            ></iframe>

            <div class="flex flex-col lg:grid lg:grid-cols-3 gap-5">
              <div>
                <img
                  :src="`${TMDB_IMG_BASE_URL}${movieOfTheWeek?.poster_path}`"
                  class="w-auto h-auto rounded-[10px]"
                />
              </div>
              <div class="col-span-2">
                <h4
                  class="mb-5 cursor-pointer hover:text-white hover:underline duration-200"
                  @click="goTo(`movie/${String(movieOfTheWeek?.id)}`)"
                >
                  {{ movieOfTheWeek?.title }}
                </h4>
                <small
                  >Release date:
                  {{ parseDate(movieOfTheWeek?.release_date as string) }}</small
                >
                <div class="grid grid-cols-2 mt-5">
                  <div class="text-sm">Vote average</div>
                  <div class="text-sm">Vote account</div>
                  <div class="bg-cyan-600 rounded-sm w-[50px] mx-auto mt-2">
                    {{ movieOfTheWeek?.vote_average }}
                  </div>
                  <div class="text-cyan-300 mt-2">
                    {{ movieOfTheWeek?.vote_count }}
                  </div>
                </div>
                <p class="text-center lg:text-justify mt-5">
                  {{ movieOfTheWeek?.overview }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="my-5">Movie trivia (soon)</h2>
          <hr class="mb-5" />
          <button class="button__primary mx-auto">Play</button>
        </div>
      </div>
    </main>
  </section>
  <div v-else>
    <Spinner
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue";

import { MovieAxiosOptions } from "../models/interfaces/Movie";
import { useFloatMenuStore } from "../stores/FloatMenu";

import { useMoviesStore } from "../stores/Movies";
import { useNavigationStore } from "../stores/Navigation";

import Spinner from "../components/Spinner.vue";
import MenuFloat from "../components/FloatMenu.vue";

import { TMDB_IMG_BASE_URL } from "../utils";
import { parseDate } from "../services/utils";

const movieStore = useMoviesStore();
const { goTo } = useNavigationStore();
const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();
const { showFloatMenu } = storeToRefs(floatMenuStore);

const { movieOfTheWeek, trailerOfTheWeek } = storeToRefs(movieStore);
const carrousel = ref();
const dataLoaded = computed(
  () =>
    movieOfTheWeek.value !== undefined && trailerOfTheWeek.value !== undefined
);

const animateScroll = () => {
  const SCROLL_MAX = carrousel.value.scrollWidth - carrousel.value.offsetWidth;
  let i = 0;
  setInterval(() => {
    if (carrousel.value) {
      if (i < SCROLL_MAX) {
        carrousel.value.style.transition = "0.5s ease-out";
        carrousel.value.style.opacity = "1";
        carrousel.value.scrollLeft++;
        i++;
      }
      if (
        carrousel.value.scrollLeft >=
        carrousel.value.scrollWidth - carrousel.value.offsetWidth
      ) {
        carrousel.value.style.transition = "0.5s ease-out";
        carrousel.value.style.opacity = "0";
        carrousel.value.scrollLeft = 0;
        i = 0;
      }
    }
  }, 24);
};

const onScroll = (event: WheelEvent) => {
  carrousel.value.scrollLeft += event.deltaY * 0.8;
};

onMounted(async () => {
  await movieStore.getMovies({
    page: 1,
    sort_by: "popularity.desc",
    year: new Date().getFullYear(),
  } as MovieAxiosOptions);

  await movieStore.getMovieOfTheWeek();
  if (dataLoaded.value) setTimeout(() => animateScroll(), 250);
});
</script>

<style lang="scss" scoped>
#carrousel {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 100%;
  border-radius: 10px;
}

.carrousel__img {
  cursor: pointer;
  max-height: 100%;
  transition: all 0.3s ease-out;
  &:hover {
    filter: grayscale(0.5);
    opacity: 0.8;
  }
}

@media (max-width: 500px) {
  #carrousel > div {
    min-width: 100px;
  }
}
@media (max-width: 1000px) {
  #carrousel > div {
    min-width: 200px;
  }
}
@media (min-width: 1000px) {
  #carrousel > div {
    min-width: 400px;
  }
}
</style>
