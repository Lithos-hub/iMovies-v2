import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("useSnackbar", {
  state: () => ({
    type: "",
    message: "",
    display: false,
  }),
  actions: {
    showSnackbar(type: string, message: string) {
      this.type = type;
      this.message = message;
      this.display = true;

      setTimeout(() => (this.display = false), 3500);
    },
  },
});
