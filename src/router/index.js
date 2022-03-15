import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
import Login from "../views/Login.vue";
import UsersShow from "../views/UsersShow.vue";
import WorkoutsShow from "../views/WorkoutsShow.vue";
import Exercises from "../views/Exercises.vue";
import Workouts from "../views/Workouts.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/me", name: "UsersShow", component: UsersShow },
  { path: "/workouts/me", name: "Workouts", component: Workouts },
  { path: "/workouts/me/:id", name: "WorkoutsShow", component: WorkoutsShow },
  { path: "/exercises", name: "Exercises", component: Exercises },
  { path: "/workouts", name: "Workouts", component: Workouts },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
