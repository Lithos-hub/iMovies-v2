<template>
  <div class="relative w-[140px] mx-auto">
    <button :type="type" :class="`${variant} w-[140px]`" :disabled="disabled">
      {{ text }}
    </button>
    <Spinner
      v-if="loadingIcon && loading"
      class="absolute right-5 top-1/2 -translate-y-1/2"
      sm
    />
  </div>
</template>

<script setup lang="ts">
import Spinner from "./Spinner.vue";
import { useSpinnerStore } from "../stores/Spinner";
import { storeToRefs } from "pinia";
defineProps<{
  type: "submit" | "button";
  variant: string;
  disabled: boolean;
  text: string;
  loadingIcon: boolean;
}>();

const spinnerStore = useSpinnerStore();

const { loading } = storeToRefs(spinnerStore);
</script>

<style scoped></style>
