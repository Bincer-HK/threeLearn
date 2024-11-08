<template>
  <div class="w-full h-full" id="three-tween-box">

  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import * as THREE from 'three'
import { Tween, Easing } from 'three/examples/jsm/libs/tween.module.js'
import {OrbitControls} from "three/addons/controls/OrbitControls.js"

const initThreeBox = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(2, 2, 10)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('three-tween-box').appendChild(renderer.domElement)

  // 创建物体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x9ee5ff })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const tween = new Tween(cube.position, false)
    .to({x: 2, y: 2, z: 0}, 2000)
    .easing(Easing.Quadratic.Out)
    .start();

  // 世界坐标及控制器
  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  function animate(time) {
    controls.update()
    requestAnimationFrame(animate)

    // 更新 Tween
    tween.update(time)
    renderer.render(scene, camera)
  }

  animate()
}

onMounted(() => {
  initThreeBox()
})
</script>

<style scoped lang="scss">

</style>