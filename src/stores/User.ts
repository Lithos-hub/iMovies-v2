import { defineStore } from "pinia";
import { User } from "../models/interfaces/User";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as User | null,
    tokenId: "",
    movies: {
      favourite: [],
      watched: [],
    },
    friends: [],
  }),
  actions: {
    setToken(token: string) {
      this.tokenId = token;
    },
    setUser(user: User) {
      this.user = {
        ...user,
        createdAt: user.createdAt?.split("T").shift() as string,
      };
    },
  },
});
