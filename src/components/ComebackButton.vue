<template>
  <button class="button__primary" @click="comeback">
    <span><i class="fa-solid fa-arrow-left mr-2"></i> Comeback</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const comeback = () => router.go(-1);
</script>

<style scoped></style>
