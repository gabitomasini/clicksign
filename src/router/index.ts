import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import NewProject from "../components/NewProject.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new-project",
    name: "new-project",
    component: NewProject,
    props: true,
  },
  {
    path: "/edit-project/:projectId",
    name: "edit-project",
    component: NewProject,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
