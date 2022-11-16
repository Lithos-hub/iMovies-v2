<template>
  <div class="z-50">
    <Navbar />
    <main class="mt-5">
      <router-view></router-view>
    </main>
    <Snackbar v-if="display" :message="message" :type="type" />
  </div>
  <div id="bg-blur" class="blur-[12rem] h-full w-full fixed top-0 left-0">
    <div class="fixed object-none bg-1" />
    <div class="fixed object-none bg-2" />
    <div class="fixed object-none bg-3" />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar/Snackbar.vue";

import { useMediaStore } from "./stores/Media";
import { useMoviesStore } from "./stores/Movies";
import { useFloatMenuStore } from "./stores/FloatMenu";
import { useSnackbarStore } from "./components/Snackbar/store";
import { storeToRefs } from "pinia";

const { getScreenType } = useMediaStore();
const movieStore = useMoviesStore();
const floatMenuStore = useFloatMenuStore();
const snackbarStore = useSnackbarStore();

const { message, type, display } = storeToRefs(snackbarStore);

const route = useRoute();

watch(
  () => route.path,
  () => {
    movieStore.$reset();
    floatMenuStore.$reset();
  }
);

watch(
  () => localStorage.getItem("id-token"),
  (val) => {
    console.log(val);
  }
);

onMounted(() => {
  window.onresize = getScreenType;
  // TODO: get the user when refresh de app
});
</script>

<style lang="scss">
@import "./scss/variables";

* > body :not(#bg-blur) {
  z-index: 1;
}

.bg-1 {
  background: radial-gradient($primary, transparent);
  animation: motion1 12s ease-out infinite;
  border-radius: 50%;
  mix-blend-mode: exclusion;
  z-index: -1;
  opacity: 0.25;
}
.bg-2 {
  background: radial-gradient($secondary, transparent);
  animation: motion2 15s ease-in infinite alternate;
  border-radius: 50%;
  mix-blend-mode: color-dodge;
  z-index: -1;
  opacity: 0.25;
}
.bg-3 {
  background: radial-gradient($tertiary, transparent);
  animation: motion3 12s ease infinite alternate;
  border-radius: 50%;
  mix-blend-mode: screen;
  z-index: -1;
  opacity: 0.25;
}

@keyframes motion1 {
  0% {
    opacity: 0.25;
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
  }
  25% {
    opacity: 0.25;
    transform: translate(-25%, 25%);
    width: 80%;
    height: 80%;
  }
  50% {
    opacity: 0.4;
    transform: translate(0%, 50%);
    width: 75%;
    height: 75%;
  }
  75% {
    opacity: 0.5;
    transform: translate(25%, 25%);
    width: 80%;
    height: 80%;
  }
  100% {
    opacity: 0.25;
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
  }
}

@keyframes motion2 {
  0% {
    opacity: 0.25;
    transform: translate(0%, 80%);
    width: 80%;
    height: 90%;
  }
  25% {
    opacity: 0.25;
    transform: translate(-20%, 60%);
    width: 70%;
    height: 70%;
  }
  50% {
    opacity: 0.4;
    transform: translate(0%, 40%);
    width: 80%;
    height: 80%;
  }
  75% {
    opacity: 0.5;
    transform: translate(25%, 80%);
    width: 60%;
    height: 60%;
  }
  100% {
    opacity: 0.25;
    transform: translate(0%, 80%);
    width: 80%;
    height: 90%;
  }
}

@keyframes motion3 {
  0% {
    opacity: 0.25;
    transform: translate(50%, 10%);
    width: 30%;
    height: 30%;
  }
  25% {
    opacity: 0.25;
    transform: translate(70%, 0%);
    width: 50%;
    height: 50%;
  }
  50% {
    opacity: 0.4;
    transform: translate(80%, -10%);
    width: 30%;
    height: 30%;
  }
  75% {
    opacity: 0.5;
    transform: translate(70%, 0%);
    width: 50%;
    height: 50%;
  }
  100% {
    opacity: 0.25;
    transform: translate(50%, 0%);
    width: 70%;
    height: 70%;
  }
}
</style>
