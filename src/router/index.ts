import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HallView from "../views/HallView.vue";
import RoomView from "@/views/RoomView.vue";
import { conn } from "@/logic/Connection";
import { HubConnectionState } from "@microsoft/signalr";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home",
    },
    {
      path: "/hall",
      component: HallView,
      name: "hall",
    },
    {
      path: "/room/:id(\\d+)",
      component: RoomView,
      name: "room",
      props: (route) => {
        return {
          id: parseInt(route.params.id.toString()),
        };
      },
    },
    {
      path: "/:any(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach(
  (to) => to.name == "home" || conn.state == HubConnectionState.Connected || "/"
);

export default router;
