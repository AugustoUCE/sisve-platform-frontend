<template>
  <button
    type="button"
    class="flex w-full items-center gap-4 rounded-2xl border p-5
           text-left transition duration-200"
    :class="
      selected
        ? 'border-cyan-400 bg-cyan-400/15 ring-2 ring-cyan-400/30'
        : 'border-slate-600 bg-slate-800/40 hover:border-cyan-400'
    "
    :aria-pressed="selected"
    @click="seleccionar"
  >
    <!-- Conserva la animación original -->
    <VoteBox :selected="selected" />

    <div>
      <h3 class="text-lg font-semibold text-black">
        {{ title }}
      </h3>

      <p class="mt-1 text-sm text-slate-600">
        {{ description }}
      </p>
    </div>
  </button>
</template>

<script setup lang="ts">
import VoteBox from "@/components/voteBox/VoteBox.vue";

export type SpecialVoteType = "BLANCO" | "NULO";

const props = defineProps<{
  type: SpecialVoteType;
  title: string;
  description: string;
  selected: boolean;
}>();

const emit = defineEmits<{
  select: [type: SpecialVoteType];
}>();

function seleccionar(): void {
  emit("select", props.type);
}
</script>