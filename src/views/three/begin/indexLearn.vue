<template>
	<div class="w-full h-full" id="learnThree">

	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const initThree = () => {
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

	const renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.getElementById('learnThree').appendChild(renderer.domElement)

	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

	const parentCube = new THREE.Mesh(geometry, parentMaterial)
	const cube = new THREE.Mesh(geometry, material)

	// 设置位置
	parentCube.position.set(-3, 0, 0)
	cube.position.set(3, 0, 0)

	// 缩放:Vect3, 示例，x,y,z都放大一倍
	// parentCube.scale.set(2, 2, 2)
	// cube.scale.set(2, 2, 2)

	// 旋转:Euler，通过指定轴顺序和其各个指定旋转角度来旋转一个物体
	parentCube.rotation.x = Math.PI / 4
	cube.rotation.x = Math.PI / 4


	// 添加到对应的场景中去
	parentCube.add(cube)
	scene.add(parentCube)

	// 向上抬升一点点，就可以看到 z轴
	camera.position.set(2, 2, 5)
	camera.lookAt(0, 0, 0)

	// 添加世界坐标轴辅助器,x轴(水平)：红色，y轴(竖直)：绿色，z轴(朝向我眼睛)：蓝色；
	const axesHelper = new THREE.AxesHelper(5)
	scene.add(axesHelper)

	// 可以使用轨道，来调试旋转等
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true

	// 动画
	function animate() {
		controls.update()
		requestAnimationFrame(animate)

		// cube.rotation.x += 0.01
		// cube.rotation.y += 0.01

		renderer.render( scene, camera )
	}
	animate()

	// 监听一下窗口的变化
	window.addEventListener('resize', () => {
		// 重置渲染宽高比
		renderer.setSize(window.innerWidth, window.innerHeight)

		// 重置相机宽高比
		camera.aspect = window.innerWidth / window.innerHeight

		// 更新相机投影矩阵
		camera.updateProjectionMatrix()
	})
}

onMounted(() => {
	initThree()
})
</script>

<style lang="scss" scoped>

</style>