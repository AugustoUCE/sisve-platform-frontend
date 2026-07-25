<template>
  <div class="flex justify-center items-center min-h-screen ">

    <div
      class="bg-white rounded-xl shadow-xl border border-gray-300 p-5"
      style="width:85.6mm; height:54mm;"
    >

      <div class="flex justify-between items-center border-b pb-2">
        //imagen del logo general

        <h2 class="font-bold text-sm">
          CERTIFICADO
        </h2>
      </div>

      <div class="mt-3 text-xs space-y-1 text-black">

        <strong class="flex justify-center"> JUAN PEREZ</strong>

        <p><strong>FACULTAD:</strong> INGENIERIA</p>

        <p><strong>JUNTA:</strong> FING-E-01</p>

      </div>

      <div class="flex justify-end mt-2">

        <div class="w-16 h-16 border flex items-center justify-center text-xs text-black">
          QR
        </div>

      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {

  // Espera un momento para que la vista termine de renderizarse
  setTimeout(() => {
    window.print();
  }, 300);

});
</script>