import { defineStore } from "pinia";

export const useSpinnerStore = defineStore("useSpinner", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
  },
});
