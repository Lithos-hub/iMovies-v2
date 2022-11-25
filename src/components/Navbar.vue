<template>
  <div data-testid="wrapper">
    <div v-if="screen !== 'sm'" class="navbar">
      <ul class="flex justify-between align-middle px-2">
        <!-- NAVBAR MENU ITEMS -->
        <li
          class="my-auto cursor-pointer hover:-hue-rotate-30 hover:brightness-125 duration-200"
          @click="goTo('/')"
        >
          <h1>iMovies</h1>
        </li>
        <li
          class="navbar__link text-[13px]"
          v-for="{ name, path } of navbarMenuLinks"
          @click="goTo(path)"
        >
          {{ name }}
        </li>
        <!-- USER IS LOGGED -->
        <li
          v-if="TOKEN_ID"
          @click="open($event, true)"
          class="navbar__link text-[13px]"
        >
          <i
            class="fa-solid fa-user border border-cyan-500 text-cyan-500 p-2 rounded-full"
          ></i>
        </li>

        <!-- USER IS NOT LOGGED -->
        <button
          v-else
          class="button__tertiary text-[13px]"
          @click="goTo('/access')"
        >
          Sign in
        </button>
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
          <ul class="py-2">
            <li
              class="navbar__link text-[15px]"
              v-for="{ name, path } of navbarMenuLinks"
              @click="goTo(path)"
            >
              {{ name }}
            </li>
            <!-- USER IS LOGGED -->
            <li
              v-if="TOKEN_ID"
              @click="open($event, true)"
              class="navbar__link text-[13px]"
            >
              <i
                class="fa-solid fa-user border border-cyan-500 text-cyan-500 p-2 rounded-full"
              ></i>
            </li>
            <!-- USER IS NOT LOGGED -->
            <button
              v-else
              class="button__tertiary text-[13px] mt-2"
              @click="goTo('/access')"
            >
              Sign in
            </button>
          </ul>
        </div>
      </Transition>
    </div>
  </div>

  <FloatMenu v-if="showDefaultFloatMenu" :items="accountMenuItems" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { navbarMenuLinks, accountMenuItems } from "../utils";

import { useNavigationStore } from "../stores/Navigation";
import { useMediaStore } from "../stores/Media";
import { useFloatMenuStore } from "../stores/FloatMenu";

import FloatMenu from "../components/FloatMenu.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/User";

const { goTo } = useNavigationStore();
const userStore = useUserStore();
const { TOKEN_ID } = storeToRefs(userStore);

const mediaStore = useMediaStore();

const floatMenuStore = useFloatMenuStore();
const { open } = useFloatMenuStore();

const { showDefaultFloatMenu } = storeToRefs(floatMenuStore);

const route = useRoute();
const router = useRouter();

const screen = computed(() => mediaStore.getScreen);
const menu = ref(false);

watch(
  () => route.fullPath,
  () => (menu.value = false)
);
</script>

<style scoped></style>
