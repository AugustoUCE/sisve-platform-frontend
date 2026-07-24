
<template>

  <div class="flex-1 overflow-y-auto">
  <section
    class="w-full max-w-7xl py-8"
  >

  
    <!-- Tarjeta -->
    <div
      class="rounded-3xl border border-white/10 p-8 backdrop-blur-xl
         bg-[url('@/assets/images/texturePaper.jpg')]
         bg-cover bg-center bg-no-repeat"
    >
      <h2 class="mb-6 text-2xl font-semibold text-black">
        Presidente de la Asociación de Estudiantes
      </h2>
      
      <!-- Opciones -->
      <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 ">

        <label
          v-for="opcion in opciones"
          :key="opcion.id"
          class="w-50 min-h-85 flex flex-col items-center justify-around rounded-2xl border border-slate-600 bg-slate-800/40 p-4 transition hover:border-cyan-400"
        >
          <VoteBox
            :selected="seleccion === opcion.id"
            @click="seleccion = opcion.id"
            
          />

          <img
            :src="opcion.logo"
            class="h-14 w-14 rounded-full bg-white object-cover"
          />

          <div class="flex-1 text-center">
            <h3 class="text-lg font-semibold text-black">
              {{ opcion.nombre }}
            </h3>

            <p class="text-sm text-slate-300">
              {{ opcion.descripcion }}
            </p>
          </div>
        </label>

      </div>
      
      <!-- Mensaje -->
      <p
        v-if="error"
        class="mt-5 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-red-200"
      >
        {{ error }}
      </p>

      <!-- Botón -->
      <div class="mt-8 flex justify-end">
        <BaseButton
          variant="primary"
          :disabled="!seleccion"
          @click="emitirVoto"
        >
          Confirmar voto
        </BaseButton>
      </div>
    </div>
  
  </section>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/button/BaseButton.vue";
import VoteBox from "@/components/voteBox/voteBox.vue";
const seleccion = ref<number | null>(null);
const error = ref("");

const opciones = [
  {
    id: 1,
    nombre: "Lista A",
    descripcion: "Innovación y participación estudiantil.",
    logo: "/src/assets/images/listaA.png",
  },
  {
    id: 2,
    nombre: "Lista B",
    descripcion: "Compromiso con el bienestar universitario.",
    logo: "/src/assets/images/listaB.png",
  },
  {
    id: 3,
    nombre: "Voto Blanco",
    descripcion: "No apoyar a ninguna candidatura.",
    logo: "/src/assets/images/blanco.png",
  },
];

function emitirVoto() {
  error.value = "";

  if (!seleccion.value) {
    error.value = "Debe seleccionar una opción.";
    return;
  }

  alert(`Voto registrado para la opción ${seleccion.value}`);
}
</script>