<template>
  <div
    :class="`w-screen 
    py-5 
    fixed 
    bottom-0 
    left-0
    text-left
    pl-[50px]
    text-lg
    flex
    ${getMessageType(type)}`"
  >
    <i :class="getMessageIcon(type)" class="my-auto" />
    <ul>
      <li v-for="msg of new Set([...message.split('. ')])" class="ml-5">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
  type: string;
}>();

const getMessageType = (type: string) => {
  return {
    error: "bg-red-700",
    success: "bg-green-700",
    info: "bg-blue-700",
    warning: "bg-orange-700",
  }[type];
};
const getMessageIcon = (type: string) => {
  return {
    error: "fa-solid fa-circle-exclamation",
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-triangle-exclamation",
  }[type];
};
</script>

<style scoped></style>
