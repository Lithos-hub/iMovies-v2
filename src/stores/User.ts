import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {
      email: "john_doe@example.com",
    },
  }),
  actions: {},
});
