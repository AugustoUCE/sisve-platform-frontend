<template>
  <div class="flex-1 overflow-y-auto">
    <section class="w-full max-w-7xl py-8">
      <div
        class="rounded-3xl border border-white/10 p-8 backdrop-blur-xl
               bg-[url('@/assets/images/texturePaper.jpg')]
               bg-cover bg-center bg-no-repeat"
      >
        <h2 class="mb-2 text-2xl font-semibold text-black">
          Presidente de la Asociación de Estudiantes
        </h2>

        <p class="mb-6 text-sm text-slate-600">
          Seleccione una candidatura o una opción especial.
        </p>

        <!-- Voto blanco y voto nulo -->
        <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SpecialVoteOption
            type="BLANCO"
            title="Voto blanco"
            description="No seleccionar ninguna candidatura."
            :selected="seleccionEspecial === 'BLANCO'"
            @select="seleccionarVotoEspecial"
          />

          <SpecialVoteOption
            type="NULO"
            title="Voto nulo"
            description="Registrar voluntariamente el voto como nulo."
            :selected="seleccionEspecial === 'NULO'"
            @select="seleccionarVotoEspecial"
          />
        </div>

        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-black">
            Candidaturas
          </h3>

          <span
            v-if="candidaturasBloqueadas"
            class="rounded-full border border-amber-500/40
                   bg-amber-500/10 px-3 py-1 text-xs text-amber-800"
          >
            Opciones bloqueadas
          </span>
        </div>

        <!-- Candidaturas -->
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6"
        >
          <VoteOptionCard
            v-for="opcion in opciones"
            :key="opcion.id"
            :option="opcion"
            :selected="seleccionCandidato === opcion.id"
            :disabled="candidaturasBloqueadas"
            @select="seleccionarCandidato"
          />
        </div>

        <p
          v-if="candidaturasBloqueadas"
          class="mt-5 rounded-lg border border-amber-500/40
                 bg-amber-500/10 px-4 py-2 text-sm text-amber-800"
        >
          Las candidaturas están bloqueadas porque seleccionó
          {{ nombreSeleccionEspecial }}. Presione nuevamente la opción para
          desmarcarla.
        </p>

        <!-- Mensaje de error -->
        <p
          v-if="error"
          class="mt-5 rounded-lg border border-red-400/40
                 bg-red-500/10 px-4 py-2 text-red-700"
          role="alert"
        >
          {{ error }}
        </p>

        <!-- Botón -->
        <div class="mt-8 flex justify-end">
          <BaseButton
            variant="primary"
            :disabled="!haySeleccion"
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
import { computed, ref } from "vue";

import BaseButton from "@/components/button/BaseButton.vue";
import SpecialVoteOption from "@/components/voteBox/SpecialVoteOption.vue";
import VoteOptionCard from "@/components/voteBox/VoteOptionCard.vue";

import type { SpecialVoteType } from "@/components/voteBox/SpecialVoteOption.vue";
import type { VoteOption } from "@/interfaces/voter/Voter.ts";

const seleccionCandidato = ref<number | null>(null);
const seleccionEspecial = ref<SpecialVoteType | null>(null);
const error = ref("");

const opciones: VoteOption[] = [
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
];

const candidaturasBloqueadas = computed<boolean>(() => {
  return seleccionEspecial.value !== null;
});

const haySeleccion = computed<boolean>(() => {
  return (
    seleccionCandidato.value !== null ||
    seleccionEspecial.value !== null
  );
});

const nombreSeleccionEspecial = computed<string>(() => {
  if (seleccionEspecial.value === "BLANCO") {
    return "voto blanco";
  }

  if (seleccionEspecial.value === "NULO") {
    return "voto nulo";
  }

  return "";
});

function seleccionarVotoEspecial(type: SpecialVoteType): void {
  error.value = "";

  // Si vuelve a presionar la misma opción, se desmarca.
  if (seleccionEspecial.value === type) {
    seleccionEspecial.value = null;
    return;
  }

  seleccionEspecial.value = type;

  // Se elimina cualquier candidatura seleccionada.
  seleccionCandidato.value = null;
}

function seleccionarCandidato(optionId: number): void {
  if (candidaturasBloqueadas.value) {
    return;
  }

  seleccionCandidato.value = optionId;
  seleccionEspecial.value = null;
  error.value = "";
}

function emitirVoto(): void {
  error.value = "";

  if (!haySeleccion.value) {
    error.value = "Debe seleccionar una opción.";
    return;
  }

  if (seleccionEspecial.value !== null) {
    alert(`Voto registrado como ${nombreSeleccionEspecial.value}.`);
    return;
  }

  alert(
    `Voto registrado para la candidatura ${seleccionCandidato.value}.`,
  );
}
</script>