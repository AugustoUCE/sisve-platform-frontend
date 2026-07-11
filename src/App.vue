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

const route = useRoute()
const showAppShell = computed(() => route.name !== 'login')
</script>
