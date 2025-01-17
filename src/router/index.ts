import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import NewProject from '../components/NewProject.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/new-project',
        name: 'NewProject',
        component: NewProject,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;