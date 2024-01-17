// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Home from "@/view/home.vue"
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    { path: '/', component: Home },
    // { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
