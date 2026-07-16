<template>
    <SectionCard :title="`Detalle de elección ${id}`" eyebrow="Proceso electoral">
  <div class="detail-grid">
    <article class="detail-box">
      <h3>Contexto</h3>
      <p>Este espacio mostrará candidaturas, reglas, estado y ventanas de votación.</p>
    </article>
    <article class="detail-box">
      <h3>Acciones</h3>
      <p>Editar, publicar, cerrar y auditar el proceso desde el panel administrativo.</p>
    </article>
  </div>
</SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '@/components/SectionCard.vue'
import type { ElectionDetailProps } from './ElectionDetailView'

defineProps<ElectionDetailProps>()
</script>