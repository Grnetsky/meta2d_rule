// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Home from "@/view/home.vue"
import { createRouter, createWebHashHistory } from 'vue-router';
import ConfigRule from "@/view/home/ConfigRule.vue";
const routes = [
    { path: '/configRule', component: import('@/view/home/ConfigRule.vue') },
    { path: '/design', component:import('@/view/home/Meta2d.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
