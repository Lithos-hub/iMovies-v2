import { defineStore } from "pinia";
import { User } from "../models/interfaces/User";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as User | null,
    // user: {
    //   id: 1234567,
    //   name: "johnDoe92",
    //   email: "john_doe@example.com",
    //   register_date: "2022-04-22",
    //   birthday: "1992-08-10",
    //   avatar: "https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg",
    //   is_verified: true,
    // } as User,
    movies: {
      favourite: [1, 2, 3, 4],
      wishlist: [5, 6, 7],
    },
    friends: [1, 2, 3],
  }),
  actions: {},
});
