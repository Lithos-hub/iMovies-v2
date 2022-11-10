import { defineStore } from "pinia";

export const useFloatMenuStore = defineStore("useFloatMenu", {
  state: () => ({
    showFloatMenu: false,
    showDefaultFloatMenu: false,
    id: 0,
    clientX: 0,
    clientY: 0,
  }),
  actions: {
    open($event: MouseEvent, isDefault: boolean, id?: number) {
      if (id) this.id = id;
      this.showFloatMenu = false;
      this.showDefaultFloatMenu = false;
      this.clientX = $event.clientX;
      this.clientY = $event.clientY;
      isDefault
        ? (this.showDefaultFloatMenu = true)
        : (this.showFloatMenu = true);
    },
  },
});
