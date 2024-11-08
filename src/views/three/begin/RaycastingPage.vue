<template>
  <div class="w-full h-full" id="ray-casting-page">

  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

const initThreeWebGLBox = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(2, 2, 10)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('ray-casting-page').appendChild(renderer.domElement)

  // 创建一些物体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({color: 0x9ee5ff})
  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  // 实现射线投射
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function onMouseClick(event) {
    // 计算鼠标在归一化设备坐标（-1 到 +1）中的坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // console.log('归一化信息', mouse)

    // 更新射线投射器
    raycaster.setFromCamera(mouse, camera)

    // 计算物体与射线的交点，只监控立方体，因为场景中还有其他的辅助信息，这些都不需要
    const intersects = raycaster.intersectObjects([cube])

    if (intersects.length > 0) {
      // 选中第一个交点的物体，射线可以穿透物体，重叠的都会射穿，结果就是数组。
      // console.log('选中的物体：', intersects[0].object)

      // 你可以在这里添加选中物体后的逻辑，例如改变颜色
      if (intersects[0].object._isSelect) {
        intersects[0].object.material.color.set(intersects[0].object._originColor)
        intersects[0].object._isSelect = false

        return false;
      }

      intersects[0].object._isSelect = true
      intersects[0].object._originColor = intersects[0].object.material.color.getHex()
      intersects[0].object.material.color.set(0x00ff00)
    }
  }

  window.addEventListener('click', onMouseClick)

  // 增加世界坐标，轨道与旋转
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  function animate() {
    controls.update()
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  animate()
}

onMounted(() => {
  initThreeWebGLBox()
})
</script>

<style scoped lang="scss">

</style>
