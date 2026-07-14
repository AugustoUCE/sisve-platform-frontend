<template>
  <MainLayout v-if="showAppShell">
    <RouterView />
  </MainLayout>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
// crear una carpeta interfaces para consumir los datos del backend  
// encriptar rutas para que no se pueda acceder a la ruta sin estar logueado
// tymeleaf para las animaciones 
 
const route = useRoute()
const showAppShell = computed(() => route.name !== 'login')
</script>
