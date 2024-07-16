// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/HomeView.vue'
import About from './pages/AboutView.vue'
import DocView from './pages/docs/DocView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/docs',
        name: 'Docs',
        component: DocView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
