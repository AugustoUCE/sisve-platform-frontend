<template>
  <div class="app-background">
    <!-- Elementos decorativos -->
    <div class="bg-gradient"></div>
    <div class="bg-dots"></div>
    <Transition name="toast">
        <div
          v-if="notification.visible"
          class="fixed bottom-5 right-5 z-50 w-80 rounded-xl
                bg-green-600 text-white shadow-xl p-4"
        >
          <h3 class="font-semibold">
            {{ notification.title }}
          </h3>

          <p class="text-sm mt-1">
            {{ notification.message }}
          </p>
        </div>
</Transition>
    <!-- Contenido principal -->
    <main class="app-content">
      <section class="linkme-card" >
          <!-- Aquí cambia LoginView por HomeView -->
          

        <RouterView />
      </section>
      
    </main>
  </div>
</template>
<script setup lang="ts">
import { useNotificationStore } from "@/store/Notification";
import { watch } from "vue";

const notification = useNotificationStore();

watch(
  () => notification.visible,
  (visible) => {
    if (visible) {
      setTimeout(() => {
        notification.hide();
      }, 4000);
    }
  }
);
</script>

<style></style>
