import { defineStore } from "pinia";

export const useMediaStore = defineStore("mediaStore", {
  state: () => ({
    screen: "",
  }),
  actions: {
    getScreenType() {
      if (window.innerWidth <= 640) {
        this.screen = "sm";
      } else if (window.innerWidth <= 768) {
        this.screen = "md";
      } else if (window.innerWidth <= 1024) {
        this.screen = "lg";
      } else if (window.innerWidth <= 1280) {
        this.screen = "xl";
      } else if (window.innerWidth <= 1536) {
        this.screen = "2xl";
      }
    },
  },
  getters: {
    getScreen: (state) => state.screen,
  },
});
