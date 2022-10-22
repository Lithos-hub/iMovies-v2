<template>
  <Navbar v-if="user" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useUserStore } from "./stores/User";
import { useMediaStore } from "./stores/Media";
import { onMounted } from "vue";

const { user } = useUserStore();
const { getScreenType } = useMediaStore();

onMounted(() => {
  window.onresize = getScreenType;
});
</script>

<style scoped></style>
