<template>
  <div class="w-full h-full" ref="lightThree">
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const lightThree = ref(null)
function initThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(100, 100, 100)
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  
  lightThree.value.appendChild(renderer.domElement)

  /**
   * 灯光与阴影
   * 要求要有光源（环境光/直线光源/点光源/聚光灯光源），才能有阴影
   * 1. 渲染器要开启阴影
   * 2. 光源要开启阴影投射
   * 3. 物体要开启阴影或者接收阴影【像这里的话，球体要开启阴影投射，平面要开启阴影接收】
   */

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // 直线光源
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  directLight.position.set(40, 40, 40)
  directLight.castShadow = true
  scene.add(directLight)

  // 向场景中增加一个球体
  const geometry = new THREE.SphereGeometry(5, 32, 32)
  const material = new THREE.MeshStandardMaterial()
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.set(0, 0, 0)
  sphere.castShadow = true
  scene.add(sphere)

  // 增加一个平面
  const planeGeometry = new THREE.PlaneGeometry(50, 50)
  const plane = new THREE.Mesh(planeGeometry, material)
  plane.position.set(0, -6, 0)
  // 沿x轴旋转90度
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true
  scene.add(plane)

  // 辅助工具
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const axesHelper = new THREE.AxesHelper(100)
  scene.add(axesHelper)

  function animate() {
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
}

onMounted(() => {
  initThree()
})
</script>

<style lang="scss" scoped>

</style>
