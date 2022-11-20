import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
} from "vue-router";
import { useUserStore } from "./stores/User";

const requiresAuth = async (
  _: RouteLocation,
  __: RouteLocation,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const { tokenId } = userStore;
  const token = localStorage.getItem("id-token");
  userStore.setToken(token as string);
  if (!tokenId) {
    console.log("Access denied");
    next("/");
  } else {
    next();
  }
};

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
    beforeEnter: requiresAuth,
  },
  {
    path: "/my-movies",
    name: "My movies",
    component: () => import("./views/MyMoviesView.vue"),
    beforeEnter: requiresAuth,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./views/AboutView.vue"),
    beforeEnter: requiresAuth,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((_: RouteLocation, __: RouteLocation, next) => {
  const userStore = useUserStore();
  const tokenId = localStorage.getItem("id-token") || null;
  userStore.setToken(tokenId as string);
  next();
});

export default router;
