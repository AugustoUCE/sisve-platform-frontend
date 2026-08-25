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
          Seleccione una opción .
        </p>

        <!-- Voto blanco y voto nulo -->
        <div class="  flex items-center">
          <SpecialVoteOption
            type="BLANCO"
            title="Voto blanco"
            description=""
            :selected="seleccionEspecial === 'BLANCO'"
            @select="seleccionarVotoEspecial"
          />

          <SpecialVoteOption
            type="NULO"
            title="Voto nulo"
            description=""
            :selected="seleccionEspecial === 'NULO'"
            @select="seleccionarVotoEspecial"
          />
        </div>

        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-black">
            Candidaturas
          </h3>
          <div class="w-40 text-right">
          <span
            v-if="candidaturasBloqueadas"
            class="rounded-min border border-amber-500/40
                   bg-amber-500/10 px-3 py-1 text-xs text-amber-800"
          >
            Opciones bloqueadas
          </span>
          </div>
        </div>

        <!-- Candidaturas -->
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6"
        >
          <VoteOptionCard
            v-for="opcion in opciones"
            :key="opcion.idCandidato"
            :option="opcion"
            :selected="seleccionCandidato === opcion.idCandidato"
            :disabled="candidaturasBloqueadas"
            @select="seleccionarCandidato"
          />
        </div>
        <div class="w-120 text-left">
        <p
          v-if="candidaturasBloqueadas"
          class="  rounded-lg border border-amber-500/40
                 bg-amber-500/10 px-4 py-2 text-sm text-amber-800"
        >
          Las candidaturas están bloqueadas porque seleccionó
          {{ nombreSeleccionEspecial }}. Presione nuevamente la opción para
          desmarcarla.
        </p>
        </div>
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
import { computed, onMounted,ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/button/BaseButton.vue";
import SpecialVoteOption from "@/components/voteBox/SpecialVoteOption.vue";
import VoteOptionCard from "@/components/voteBox/VoteOptionCard.vue";

import type { SpecialVoteType } from "@/components/voteBox/SpecialVoteOption.vue";
import { emitVote, type VoteRequest } from "@/services/vote-service";


import {
  getActiveElection,
  getCargos,
  getCandidates
} from "@/services/election-service";
import type { Candidate } from "@/interfaces/election/Candidate";
import type { Student } from "@/interfaces/auth/Student";
const router = useRouter();


const titulo = ref("");
const descripcion = ref("");

const opciones = ref<Candidate[]>([]);

const seleccionCandidato = ref<number | null>(null);
const seleccionEspecial = ref<SpecialVoteType | null>(null);

const error = ref("");

const idEleccion = ref<number>(0);
const idCargo = ref<number>(0);


onMounted(async () => {
 try {
    const election = await getActiveElection();
    idEleccion.value = election.idEleccion;

    const cargos = await getCargos(election.idEleccion);
    const cargo = cargos.at(0);



    if (!cargo) {
      error.value = "No existen cargos.";
      return;
    }

        
    titulo.value = cargo.nombre;
    descripcion.value = cargo.descripcion ?? "";
    idCargo.value = cargo.idCargo;


     opciones.value = await getCandidates(
      cargo.idCargo
    );



  } catch (e) {
  console.error("Error cargando papeleta:", e);
  error.value = "No fue posible cargar la papeleta.";
}
 
});






const candidaturasBloqueadas = computed(() => {
  return seleccionEspecial.value !== null;
});

const haySeleccion = computed(() => {
  return (
    seleccionCandidato.value !== null ||
    seleccionEspecial.value !== null
  );
});

const nombreSeleccionEspecial = computed(() => {
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

  if (seleccionEspecial.value === type) {
    seleccionEspecial.value = null;
    return;
  }

  seleccionEspecial.value = type;
  seleccionCandidato.value = null;
}

function seleccionarCandidato(idCandidato: number): void {

  if (candidaturasBloqueadas.value) {
    return;
  }

  seleccionCandidato.value = idCandidato;
  seleccionEspecial.value = null;
}

function obtenerIdVotante(): number | null {
  const savedStudent = localStorage.getItem("student");

  if (!savedStudent) {
    return null;
  }

  try {
    const student = JSON.parse(savedStudent) as Student;
    return student.idVotante ?? null;
  } catch {
    return null;
  }
}

async function emitirVoto(): Promise<void> {

  error.value = "";

  if (!haySeleccion.value) {
    error.value = "Debe seleccionar una opción.";
    return;
  }

  const idVotante = obtenerIdVotante();

  if (idVotante === null) {
    error.value = "No fue posible identificar al votante.";
    return;
  }

  if (seleccionEspecial.value !== null) {
    error.value = "El backend de votación aún no admite votos blanco o nulo.";
    return;
  }

  if (seleccionCandidato.value === null) {
    error.value = "Debe seleccionar una candidatura válida.";
    return;
  }

  const request: VoteRequest = {
    idVotante,
    idEleccion: idEleccion.value,
    idCargo: idCargo.value,
    idCandidato: seleccionCandidato.value
  };

  //voto especial
  try {
    await emitVote(request);
    await router.push("/certificate");
  } catch (e) {
    console.error("Error guardando voto:", e);
    error.value = "No fue posible guardar el voto. Intente nuevamente.";
  }
}
</script>