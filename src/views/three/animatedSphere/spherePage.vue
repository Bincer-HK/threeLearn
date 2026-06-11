<template>
  <div class="w-full h-full" id="three-animated-sphere"></div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted } from 'vue';
import gsap from 'gsap';

const initThree = () => {
  // 创建场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);  // 设置白色背景

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 创建渲染器
  const container = document.getElementById('three-animated-sphere');
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 创建球体
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: '#2196f3',
    shininess: 100
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 5; // 设置初始高度
  scene.add(sphere);

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 2);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 创建弹跳动画
  const createBounceAnimation = () => {
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1
    });

    // 初始下落
    timeline.to(sphere.position, {
      y: 0,
      duration: 1,
      ease: "power1.in"
    });

    // 第一次弹跳
    timeline.to(sphere.position, {
      y: 3,
      duration: 0.7,
      ease: "power1.out"
    });

    // 第二次下落
    timeline.to(sphere.position, {
      y: 0,
      duration: 0.7,
      ease: "power1.in"
    });

    // 第二次弹跳
    timeline.to(sphere.position, {
      y: 1.5,
      duration: 0.5,
      ease: "power1.out"
    });

    // 第三次下落
    timeline.to(sphere.position, {
      y: 0,
      duration: 0.5,
      ease: "power1.in"
    });

    // 第三次弹跳
    timeline.to(sphere.position, {
      y: 0.5,
      duration: 0.3,
      ease: "power1.out"
    });

    // 最后落地
    timeline.to(sphere.position, {
      y: 0,
      duration: 0.3,
      ease: "power1.in"
    });
  };

  // 旋转动画
  gsap.to(sphere.rotation, {
    y: Math.PI * 2,
    duration: 2,
    repeat: -1,
    ease: "none"
  });

  // 启动弹跳动画
  createBounceAnimation();

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  // 处理窗口大小变化
  window.addEventListener('resize', () => {
    // 更新相机
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

onMounted(() => {
  initThree();
});
</script>

<style scoped>
#three-animated-sphere {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>
