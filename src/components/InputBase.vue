<template>
  <div data-testid="wrapper">
    <label class="text-cyan-400">{{ label }}</label>
    <div class="relative">
      <input
        :value="modelValue"
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
        @change="
          type === 'file'
            ? $emit(
                'update:modelValue',
                ($event.target as HTMLInputElement).files[0]
              )
            : null
        "
      />
      <Spinner
        v-if="isNotTextField"
        sm
        class="absolute right-0 top-1/2 -translate-y-1/2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Spinner from "./Spinner.vue";

defineEmits(["update:modelValue", "set-file"]);
defineProps<{
  label: string;
  placeholder: string;
  type?: string;
  accept?: string;
  modelValue: any;
  required?: boolean;
  isNotTextField?: boolean;
}>();

const input = ref();

defineExpose({
  input,
});
</script>

<style lang="scss" scoped></style>
