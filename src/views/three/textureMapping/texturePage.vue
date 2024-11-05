<template>
  <div class="w-full h-full" id="three-texture-mapping"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import stageImg from "@/assets/img/texture/stage.jpg";
import alphaImg from "@/assets/img/texture/opacity.png";

const initThree = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    500
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document
    .getElementById("three-texture-mapping")
    .appendChild(renderer.domElement);

  /******* start: 主要代码位置 *******/
  const planeGeometry = new THREE.PlaneGeometry(5, 5);

  // 纹理加载器，用于加载纹理
  const textureLoader = new THREE.TextureLoader();
  const planeTexture = textureLoader.load(stageImg);
  planeTexture.colorSpace = THREE.SRGBColorSpace;
  // // 透明度贴图
  // const alphaTexture = textureLoader.load(alphaImg);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    map: planeTexture,

    // 先允许一下，可以使用透明
    // transparent: true,
    // alphaMap: alphaTexture
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  /******* end: 主要代码位置 *********/

  // 增加世界坐标，轨道与旋转
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  function animate() {
    controls.update();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();
};

onMounted(() => {
  initThree();
});
</script>

<style scoped lang="scss"></style>
