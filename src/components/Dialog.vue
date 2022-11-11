<template>
  <div
    id="overlay"
    class="fixed top-0 left-0 z-1 w-full h-full bg-cyan-900 bg-opacity-30 backdrop-blur-sm"
  ></div>
  <main
    data-testid="wrapper"
    class="z-10 bg-[#202020] w-full h-screen md:m-10 md:rounded-[15px] lg:w-auto md:w-[800px] md:h-auto md:max-h-[800px] overflow-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div class="relative">
      <header
        class="text-left sticky top-0 left-0 w-full bg-[#101010] z-20 p-5"
      >
        <div class="text-2xl text-cyan-500">{{ title }}</div>
      </header>
      <section class="p-5">
        <slot></slot>
      </section>
      <footer
        class="md:text-right sticky -bottom-1 left-0 w-full bg-[#101010] z-20 p-5 gap-5"
        :class="{ 'flex justify-between': isFormDialog }"
      >
        <button class="button__secondary" @click="emit('close')">Close</button>
        <button
          ref="submitBtn"
          class="button__primary"
          @click="submit"
          type="submit"
          v-if="isFormDialog"
        >
          Save
        </button>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close", "save"]);
defineProps<{
  title: string;
  isFormDialog?: boolean;
}>();

const submitBtn = ref();

const submit = () =>
  emit("save", new SubmitEvent("submit", { submitter: submitBtn.value }));
</script>

<style scoped></style>
