<template>
  <main
    id="float-menu"
    data-testid="wrapper"
    ref="floatMenu"
    class="fixed"
    :style="`top: ${clientY}px; left: ${clientX}px`"
  >
    <div class="bg-[#202020] pa-5 w-[200px] rounded-md">
      <ul class="border border-cyan-900 rounded-md" v-if="!items">
        <li
          class="movieFloatMenuItem rounded-t-md"
          @click="goTo(`movie/${id}`)"
        >
          Show details
        </li>
        <hr />
        <li
          class="movieFloatMenuItem rounded-b-md"
          @click="goTo(`movie/${id}/video`)"
        >
          Show trailer
        </li>
      </ul>
      <ul v-else class="border border-blue-900 rounded-md">
        <li
          class="defaultFloatMenuItem"
          v-for="{ name, path } of items"
          @click="goTo(path)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </main>
  <div
    id="overlay"
    class="fixed top-0 left-0 w-full h-full"
    @click="
      showFloatMenu = false;
      showDefaultFloatMenu = false;
    "
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useFloatMenuStore } from "../stores/FloatMenu";
import { useNavigationStore } from "../stores/Navigation";

import { Link } from "../models/types/Link";

defineProps<{
  items?: Link[];
}>();

const floatMenuStore = useFloatMenuStore();
const { id } = useFloatMenuStore();
const { clientX, clientY, showFloatMenu, showDefaultFloatMenu } =
  storeToRefs(floatMenuStore);
const { goTo } = useNavigationStore();

const floatMenu = ref();

onMounted(() => {
  document.addEventListener("scroll", (e) => {
    e.stopImmediatePropagation();
    showFloatMenu.value = false;
  });
});
</script>

<style lang="scss" scoped>
#float-menu {
  z-index: 999;
}

#overlay {
  z-index: 998;
}
</style>
