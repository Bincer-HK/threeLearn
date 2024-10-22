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
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )

	const renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.getElementById('learnThree').appendChild( renderer.domElement )

	const geometry = new THREE.BoxGeometry( 1, 1, 1 )
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
	const cube = new THREE.Mesh( geometry, material )
	scene.add( cube )

	camera.position.z = 5
	camera.position.y = 0.2 // 向上抬升一点点，就可以看到 z轴
	camera.position.x = 0.2
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
		requestAnimationFrame( animate )

		// cube.rotation.x += 0.01
		// cube.rotation.y += 0.01

		renderer.render( scene, camera )
	}
	animate()
}

onMounted(() => {
	initThree()
})
</script>

<style lang="scss" scoped>

</style>