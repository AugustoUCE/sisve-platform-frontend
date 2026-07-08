<template>
  <section class="section-card">
    <header class="section-head">
      <div>
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
      </div>
      <slot name="actions" />
    </header>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionCardProps } from './SectionCard'

defineProps<SectionCardProps>()
</script>

<style src="./SectionCard.css"></style>
