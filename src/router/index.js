import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
import Login from "../views/Login.vue";
import UsersShow from "../views/UsersShow.vue";
import WorkoutsShow from "../views/WorkoutsShow.vue";
import Workouts from "../views/Workouts.vue";
import WorkoutCreate from "../views/WorkoutCreate.vue";
import WorkoutSort from "../views/WorkoutSort.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/me", name: "UsersShow", component: UsersShow },
  { path: "/workouts/me", name: "Workouts", component: Workouts },
  { path: "/workouts/me/:id", name: "WorkoutsShow", component: WorkoutsShow },
  { path: "/workoutcreate", name: "WorkoutCreate", component: WorkoutCreate },
  { path: "/workoutsort", name: "WorkoutSort", component: WorkoutSort },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
