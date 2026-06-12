<template>
  <div class="w-full h-full" id="Buffer-Geometry-ThreeJs"></div>
</template>

<script setup>
import { onMounted } from "vue"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function initThree() {
  // 三剑客，场景、相机、渲染器
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
  camera.position.set(180, 180, 180)
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById("Buffer-Geometry-ThreeJs").appendChild(renderer.domElement)

  // 其他向场景里增加的物体等
  // 这里我们增加一个基础的BufferGeometry，学习BufferGeometry的基本使用方法
  // 1. 创建了一个空的几何对象，几何对象中是没有顶点数据的，所以我们要向几何对象中添加顶点数据，使用Float32Array对象来存储顶点数据
  const geometry = new THREE.BufferGeometry()
  // 2. 定义几何顶点数据
  const vertices = new Float32Array([
    0, 0, 0,
    50, 0, 0,
    0, 100, 0,
    0, 0, 10,
    0, 0, 100,
    50, 0, 10
  ])
  // 3. 缓冲对象，threejs中的图形都是由三角形组成，所以我们要将顶点数据转换为三角形数据，每个三角形由3个顶点组成，所以每个顶点数据的长度为3，每个三角形的缓冲区数据长度为3*3=9
  const attribute = new THREE.BufferAttribute(vertices, 3)

  // 4. 设置几何体的顶点，顺便给个材质，能看得到效果
  geometry.attributes.position = attribute
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  // 5. 把几何体和材质组合起来，形成一个网格对象，是一个真实的物体了，可以进行物体的空间变换（比如旋转、缩放、平移等）、投影阴影、被射线检测等操作
  const mesh = new THREE.Mesh(geometry, material)

  // // ================================================================
  // // 4.1 再使用另一种模型，点模型Points，和上方的Mesh一样的，也有自己点材质PointsMaterial。
  // const pointerMaterial = new THREE.PointsMaterial({ 
  //   color: 0xffff00,
  //   size: 20, // 点对象的像素尺寸
  // })
  // const pointer = new THREE.Points(geometry, pointerMaterial)
  // scene.add(pointer)
  // // ================================================================

  // 6. 把网格对象加到场景中去
  scene.add(mesh)

  // 其他threejs辅助控制相关工具
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const axesHelper = new THREE.AxesHelper(400)
  scene.add(axesHelper)

  // 7. 渲染场景
  function animate() {
    controls.update()
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }
  animate()
}

onMounted(() => {
  initThree();
});
</script>

<style lang="scss" scoped>
</style>
