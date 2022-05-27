import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestingView from "../views/TestingView.vue";
import CreatePost from "../components/CreatePost";
import RegistrationFrom from "../views/RegistrationForm";
import LogIn from "../views/LogIn";
//import MessageRetrieve from "../views/MessageRetrieve";
import ConversationView from "../views/ConversationView";
import UserConfirmation from "../views/UserConfirmation";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test",
    name: "TestingView",
    component: TestingView,
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
  // {
  //   path: "/Messages",
  //   name: "MessageRetrieve",
  //   component: MessageRetrieve,
  // },
  {
    path: "/conversationview",
    name: "conversationview",
    component: ConversationView,
  },
  {
    path: "/confirmuser",
    name: "UserConfirmation",
    component: UserConfirmation,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
