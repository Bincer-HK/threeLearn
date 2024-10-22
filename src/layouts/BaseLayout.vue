<template>
    <div class="h-full">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.name"></component>
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name"></component>
      </router-view>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  