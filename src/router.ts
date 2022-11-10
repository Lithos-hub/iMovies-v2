import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/access",
    name: "Access",
    component: () => import("./views/AccessView.vue"),
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
    path: "/genres",
    name: "Genres",
    component: () => import("./views/GenresView.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie details",
    component: () => import("./views/MovieDetails.vue"),
  },
  {
    path: "/movie/:id/video",
    name: "Video player",
    component: () => import("./views/VideoPlayer.vue"),
  },
  {
    path: "/last-releases",
    name: "Last releases",
    component: () => import("./views/LastReleasesView.vue"),
  },
  {
    path: "/trailers",
    name: "Trailers",
    component: () => import("./views/TrailersView.vue"),
  },
  {
    path: "/account",
    name: "Account settings",
    component: () => import("./views/AccountView.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
