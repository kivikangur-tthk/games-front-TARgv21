import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/gamesListView.vue"),
    },
    {
      path: "/gameForm",
      name: "gameForm",
      component: () => import("../components/gameForm.vue"),
    },
    {
      path: "/userGames/:playerId",
      name: "userGames",
      component: () => import("../views/userGamesView.vue"),
      props: route => { return { playerId: Number(route.params.playerId) } },
    },
    {
      path: "/players",
      name: "allPlayers",
      component: () => import("../views/playersListView.vue"),
    },
  ],
})

export default router
