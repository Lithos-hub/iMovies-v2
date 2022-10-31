import { defineStore } from "pinia";

export const useFloatMenuStore = defineStore("useFloatMenu", {
  state: () => ({
    showFloatMenu: false,
    id: 0,
    clientX: 0,
    clientY: 0,
  }),
  actions: {
    open(id: number, $event: MouseEvent) {
      this.showFloatMenu = false;
      this.id = id;
      this.clientX = $event.clientX;
      this.clientY = $event.clientY;
      this.showFloatMenu = true;
    },
  },
});
