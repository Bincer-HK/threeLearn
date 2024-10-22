import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'BaseLayout',
            component: () => import('../layouts/BaseLayout.vue'),
            children: [
                {
                    path: "overview",
                    name: "OverView",
                    component: () => import("@/views/overview/indexPage.vue")
                }
            ]
        },
        {
            path: '/three',
            component: () => import('../layouts/BaseLayout.vue'),
            children: [
                {
                    path: "",
                    name: "ThreeJsLearn",
                    component: () => import("@/views/three/begin/indexLearn.vue"),
                    meta: { name: "Threejs 学习" }
                }
            ]
        }
    ],
});

export default router;
