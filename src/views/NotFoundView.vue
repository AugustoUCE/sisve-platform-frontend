<template>
  <div class="not-found">
    <h1>404</h1>
    <p>{{ notFoundMessage }}</p>
    <RouterLink class="cta-button" to="/dashboard">Volver al panel</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { notFoundMessage } from './NotFoundView'
</script>

<style src="./NotFoundView.css"></style>

