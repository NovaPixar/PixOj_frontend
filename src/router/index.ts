import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/ExampleView.vue";
import { routes } from "@/router/routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

export default router;
