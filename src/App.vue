<template>
  <Navbar v-if="user" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { createApp, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import App from "./App.vue";

import Navbar from "./components/Navbar.vue";

import { useUserStore } from "./stores/User";
import { useMediaStore } from "./stores/Media";
import { useMoviesStore } from "./stores/Movies";

const { user } = useUserStore();
const { getScreenType } = useMediaStore();
const movieStore = useMoviesStore();

const route = useRoute();

watch(
  () => route.path,
  () => movieStore.$reset()
);

onMounted(() => {
  window.onresize = getScreenType;
});
</script>

<style scoped></style>
