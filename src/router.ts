import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/LoginView.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
