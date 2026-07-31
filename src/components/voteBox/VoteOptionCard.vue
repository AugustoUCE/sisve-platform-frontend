<template>
  <button
    type="button"
    class="flex min-h-85 w-50 flex-col items-center justify-around
           rounded-2xl border bg-slate-800/40 p-4 transition"
    :class="clasesTarjeta"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-pressed="selected"
    @click="seleccionar"
  >
    <!-- Se conserva tu animación -->
    <VoteBox :selected="selected" />

    <img
      :src="option.logo"
      :alt="`Logo de ${option.nombre}`"
      class="h-14 w-14 rounded-full bg-white object-cover"
    />

    <div class="flex-1 text-center">
      <h3 class="text-lg font-semibold text-black">
        {{ option.nombre }}
      </h3>

      <p class="text-sm text-slate-300">
        {{ option.descripcion }}
      </p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import VoteBox from "@/components/voteBox/VoteBox.vue";
import type { VoteOption } from "@/interfaces/voter/Voter.ts";
import type { Candidate } from "@/interfaces/election/Candidate.ts";

const props = defineProps<{
  option: Candidate;
  selected: boolean;
  disabled: boolean;
}>();

const emit = defineEmits<{
  select: [optionId: number];
}>();

const clasesTarjeta = computed(() => {
  if (props.disabled) {
    return "cursor-not-allowed border-slate-600 opacity-40";
  }

  if (props.selected) {
    return "cursor-pointer border-cyan-400 ring-2 ring-cyan-400/30";
  }

  return "cursor-pointer border-slate-600 hover:border-cyan-400";
});

function seleccionar(): void {
  if (props.disabled) {
    return;
  }

  emit("select", props.option.idCandidato);
}
</script>