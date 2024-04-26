// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/HomeView.vue'
import About from './pages/AboutView.vue'
import TestThree from './sections/handSection/3dHandSection.vue'

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
        path: '/three',
        name: 'TestThree',
        component: TestThree,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
