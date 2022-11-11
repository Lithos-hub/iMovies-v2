<template>
  <div data-testid="wrapper" class="relative">
    <input
      data-testid="input"
      :placeholder="placeholder"
      :class="`input__${variant}`"
      :maxlength="maxlength || 9999"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @keypress.enter="$emit('search', $event)"
    />
    <small
      class="text-red-300 block text-left ml-5"
      v-if="errorMessage && errorMessage.length > 0"
      >{{ errorMessage }}</small
    >
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue", "search"]);

defineProps({
  placeholder: {
    type: String,
  },
  variant: {
    type: String,
  },
  modelValue: {
    type: String || Number,
  },
  errorMessage: {
    type: String,
  },
  maxlength: {
    type: String || Number,
  },
});
</script>

<style scoped></style>
