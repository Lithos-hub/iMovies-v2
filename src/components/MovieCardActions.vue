<template>
  <div
    class="movie-card--actions grid grid-cols-2 justify-items-center"
    v-if="user"
  >
    <div @click="postMovie(id, 'favourite')">
      <i
        class="fa-solid fa-heart movie-card--buttons hover:bg-red-400 active:bg-white active:text-[#202020] active:scale-125"
        :class="{
          'text-red-400 hover:bg-transparent hover:text-white':
            favourite.includes(id),
        }"
      ></i>
    </div>
    <div @click="postMovie(id, 'wishlist')">
      <i
        class="fa-solid fa-eye movie-card--buttons hover:bg-green-400 active:bg-white active:text-[#202020] active:scale-125"
        :class="{
          'text-green-400 hover:bg-transparent hover:text-white':
            wishlist.includes(id),
        }"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useMoviesStore } from "../stores/Movies";
import { useUserStore } from "../stores/User";

defineProps<{
  id: number;
}>();

const movieStore = useMoviesStore();
const { favourite, wishlist, callCounter } = storeToRefs(movieStore);
const { postMovie } = useMoviesStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  if (user.value && callCounter.value === 0) {
    await movieStore.getMyMovies();
  }
});
</script>
