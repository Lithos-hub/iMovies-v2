<template>
  <main
    ref="floatMenu"
    :class="`fixed z-50`"
    :style="`top: ${clientY}px; left: ${clientX}px`"
  >
    <div class="bg-[#202020] pa-5 w-[200px] rounded-md">
      <ul class="border border-cyan-900 rounded-md">
        <li
          class="p-2 border border-transparent hover:bg-cyan-900 hover:bg-opacity-50 duration-200 cursor-pointer rounded-t-md text-left"
          @click="goTo(`movie/${id}`)"
        >
          Show details
        </li>
        <hr />
        <li
          class="p-2 border border-transparent hover:bg-cyan-900 hover:bg-opacity-50 duration-200 cursor-pointer rounded-b-md text-left"
          @click="goTo(`movie/${id}/video`)"
        >
          Show trailer
        </li>
      </ul>
    </div>
  </main>
  <div
    id="overlay"
    class="z-40 fixed top-0 left-0 w-full h-full"
    @click="showFloatMenu = false"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useFloatMenuStore } from "../stores/FloatMenu";
import { useNavigationStore } from "../stores/Navigation";

const floatMenuStore = useFloatMenuStore();
const { id } = useFloatMenuStore();
const { clientX, clientY, showFloatMenu } = storeToRefs(floatMenuStore);
const { goTo } = useNavigationStore();

const floatMenu = ref();

onMounted(() => {
  document.addEventListener("scroll", (e) => {
    e.stopImmediatePropagation();
    showFloatMenu.value = false;
  });
});
</script>

<style scoped></style>
