import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreatePost from "../components/CreatePost";
import RegistrationFrom from "../views/RegistrationForm";
import LogIn from "../views/LogIn";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/registeruser",
    name: "RegistrationForm",
    component: RegistrationFrom,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
