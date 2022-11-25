import { defineStore } from "pinia";
import { User } from "../models/interfaces/User";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as User | null,
    TOKEN_ID: localStorage.getItem("id-token"),
    USER_ID: localStorage.getItem("id"),
    movies: {
      favourite: [],
      watched: [],
    },
    friends: [],
  }),
  actions: {
    setUserIds() {
      this.TOKEN_ID = localStorage.getItem("id-token");
      this.USER_ID = localStorage.getItem("id");
    },
    setUser(user: User) {
      this.user = {
        ...user,
        createdAt: user.createdAt?.split("T").shift() as string,
      };
    },
  },
});
