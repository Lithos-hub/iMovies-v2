<template>
  <div v-if="screen !== 'sm'" class="navbar">
    <ul class="flex justify-around align-middle">
      <li>
        <h1>iMovies</h1>
      </li>
      <li
        class="navbar__link text-[13px]"
        v-for="{ name, path } of navbarMenuLinks"
        @click="goTo(path)"
      >
        {{ name }}
      </li>
    </ul>
  </div>
  <div v-else class="flex flex-col justify-center">
    <div
      class="bg-cyan-800 bg-opacity-10 w-[40px] h-[40px] flex flex-col justify-center rounded-full mx-auto"
      @click="menu = !menu"
    >
      <i class="fa-solid fa-bars"></i>
    </div>
    <Transition name="fade">
      <div v-if="menu" class="navbar mt-2">
        <ul>
          <li
            class="navbar__link text-[15px]"
            v-for="{ name, path } of navbarMenuLinks"
            @click="goTo(path)"
          >
            {{ name }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { navbarMenuLinks } from "../utils";
import { useNavigationStore } from "../stores/Navigation";
import { useMediaStore } from "../stores/Media";

const { goTo } = useNavigationStore();
const mediaStore = useMediaStore();

const screen = computed(() => mediaStore.getScreen);
const menu = ref(false);
</script>

<style scoped></style>
