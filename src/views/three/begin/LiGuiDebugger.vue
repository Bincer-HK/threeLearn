<template>
  <div class="w-full h-full" id="LiGuiUse">

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const initThree = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById("LiGuiUse").appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 材质线框图
  material.wireframe = true
  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)
  camera.position.set(2, 2, 5)
  camera.lookAt(0, 0, 0)

  // 增加世界坐标
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
  // 可以使用轨道，来调试旋转等
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true

  function animate() {
    controls.update()
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }
  animate()


  // 怎么使用GUI呢？
  const gui = new GUI()
  // 控制cube.position.x / y / z
  const folder = gui.addFolder('立方体位置')
  folder.add(cube.position, 'x', -5, 5).step(1).name('立方体x轴数值')
  folder.add(cube.position, 'y', -5, 5).step(1).name('立方体y轴数值')
  folder.add(cube.position, 'z', -5, 5).step(1).name('立方体z轴数值')

  // 控制材质
  gui.add(material, 'wireframe').name('材质线框')

  // 控制颜色
  const colorParams = {
    cubeColor: 0x00ff00
  }
  gui.addColor(colorParams, 'cubeColor').name('立方体颜色').onFinishChange((val) => {
    cube.material.color.set(val);
  })

}

onMounted(() => {
  initThree()
})
</script>

<style lang="scss" scoped>

</style>
