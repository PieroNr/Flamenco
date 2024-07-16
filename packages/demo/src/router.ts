// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/home/HomeView.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./pages/about/AboutView.vue'),
    },
    {
        path: '/docs',
        name: 'Docs',
        component: () => import('./pages/docs/DocView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
