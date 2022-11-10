<template>
  <Navbar />
  <main class="mt-5">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "./components/Navbar.vue";

import { useUserStore } from "./stores/User";
import { useMediaStore } from "./stores/Media";
import { useMoviesStore } from "./stores/Movies";
import { useFloatMenuStore } from "./stores/FloatMenu";

const { user } = useUserStore();
const { getScreenType } = useMediaStore();
const movieStore = useMoviesStore();
const floatMenuStore = useFloatMenuStore();

const route = useRoute();

watch(
  () => route.path,
  () => {
    movieStore.$reset();
    floatMenuStore.$reset();
  }
);

onMounted(() => {
  window.onresize = getScreenType;
});
</script>

<style lang="scss"></style>
