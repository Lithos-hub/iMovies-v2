<template>
  <div>
    <label class="text-cyan-400">{{ label }}</label>
    <input
      ref="input"
      :placeholder="placeholder"
      class="p-2 rounded-md min-w-[350px] w-full my-2 bg-transparent border border-cyan-500 text-cyan-300"
      :accept="accept"
      :type="type"
      autocomplete="false"
      :required="required"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineEmits(["update:modelValue"]);
defineProps<{
  label: string;
  placeholder: string;
  type?: string;
  accept?: string;
  modelValue: any;
  required?: boolean;
}>();

const input = ref();

defineExpose({
  input,
});
</script>

<style lang="scss" scoped></style>
