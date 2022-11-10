import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    /* bilibili热门排行榜 */
    {
      path: "/b-popular-rank",
      name: "BilibiliPopularRank",
      component: () => import("@/views/bilibili/popular-rank.vue"),
    },
    {
      path: "/b-home",
      name: "BilibiliHome",
      component: () => import("@/views/bilibili/home.vue"),
    },
    /* 新浪微博热搜榜 */
    {
      path: "/w-hot-search",
      name: "WeiboHotSearch",
      component: () => import("@/views/weibo/hot-search.vue"),
    },
    /* pdf */
    {
      path: "/test",
      name: "Test",
      component: () => import("@/views/test/index.vue"),
    },
  ],
});

export default router;
