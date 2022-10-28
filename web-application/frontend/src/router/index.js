import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/main/Login.vue";
import Register from "../components/main/Registration.vue";
import Passenger from "../components/dashboard/Passenger.vue";
import TransportManager from "../components/dashboard/TransportManager.vue";
import Timetable from "../components/dashboard/passenger/TimetableComponent.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/passenger-dashboard",
    name: "passngerDashbaord",
    component: Passenger,
  },
  {
    path: "/manager-dashboard",
    name: "managerDashboard",
    component: TransportManager,
  },
  {
    path: "/timetables",
    name: "timetables",
    component: Timetable,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
