<template>
  <article class="stat-card">
    <p class="eyebrow">{{ label }}</p>
    <strong>{{ value }}</strong>
    <span>{{ hint }}</span>
  </article>
</template>

<script setup lang="ts">
import type { StatCardProps } from './StatCard'

defineProps<StatCardProps>()
</script>

<style src="./StatCard.css"></style>
