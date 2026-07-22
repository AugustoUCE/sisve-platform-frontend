<template>
  <div class="app-background">
    <!-- Elementos decorativos -->
    <div class="bg-gradient"></div>
    <div class="bg-dots"></div>

    <!-- Contenido principal -->
    <main class="app-content">
      <section class="linkme-card" >
          <!-- Aquí cambia LoginView por HomeView -->

        <RouterView />
      </section>
    </main>
  </div>
</template>
<script lang="ts">
export default {};
</script>

<style></style>
