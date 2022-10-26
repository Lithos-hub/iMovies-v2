import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("./views/SearchView.vue"),
  },
  {
    path: "/popular",
    name: "Popular",
    component: () => import("./views/PopularView.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie details",
    component: () => import("./views/MovieDetails.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
