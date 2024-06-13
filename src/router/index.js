import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import AlbumView from "../components/AlbumView.vue";
import AlbumDetail from "../components/AlbumDetail.vue";
import weather from "../components/Weather.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "/",
          component: HomeView,
        },
        {
          path: "about",
          component: AboutView,
        },
        {
          path: "album",
          component: AlbumView,
        },
        {
          path: "photo/:photoId",
          component: AlbumDetail,
        },
        {
          path: "/weather",
          component: weather,
        },
      ],
    },
  ],
});

export default router;
