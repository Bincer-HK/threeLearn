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
                },
                {
                    path: 'raycasting',
                    name: 'Raycasting',
                    component: () => import('@/views/three/begin/RaycastingPage.vue'),
                    meta: { name: "Three 的射线投射技术" }
                },
                {
                    path: 'tween',
                    name: 'TweenPage',
                    component: () => import('@/views/three/begin/TweenPage.vue'),
                    meta: { name: 'Three 自带的补间动画学习' }
                },
                {
                    path: 'texture',
                    name: 'TexturePage',
                    component: () => import('@/views/three/textureMapping/texturePage.vue'),
                    meta: { name: "学习THREE的贴图，AO贴图，环境图等等" }
                },
                {
                    path: 'drawingLines',
                    name: 'DrawingLines',
                    component: () => import('@/views/three/lines/drawingLines.vue'),
                    meta: { name: 'use ThreeJs to draw lines.' }
                }
            ]
        }
    ],
});

export default router;
