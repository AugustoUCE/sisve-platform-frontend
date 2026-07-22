<template>
  <section
    class="mx-auto flex h-full min-h-0 w-full max-w-md flex-col justify-center py-2"
  >
    <header class="mb-[clamp(1rem,2.5vh,2rem)] text-center">
      <img
        src="../../assets/images/Logo.png"
        alt="Logotipo de SISVE"
        class="mx-auto mb-[clamp(0.75rem,2vh,1.25rem)] h-[clamp(4.5rem,10vh,7rem)] w-auto object-contain"
      />

      <h1
        class="text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] text-white"
      >
        Sistema Web de Voto Electrónico
      </h1>

      <p
        class="mx-auto mt-[clamp(0.5rem,1.5vh,0.75rem)] max-w-sm text-sm leading-5 text-slate-300"
      >
        Ingresa tus datos para participar de forma segura en el proceso
        electoral universitario.
      </p>
    </header>

    <form
      class="space-y-[clamp(0.75rem,1.8vh,1.25rem)]"
      @submit.prevent="irAlHome"
    >
      <div>
        <label
          for="cedula"
          class="mb-1.5 block text-sm font-medium text-white"
        >
          Documento de identidad
        </label>

        <input
          id="cedula"
          v-model="form.cedula"
          type="text"
          inputmode="numeric"
          placeholder="Ingresa tu número de cédula"
          autocomplete="username"
          class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-[clamp(0.65rem,1.5vh,0.85rem)] text-white outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
      </div>

      <div>
        <label
          for="correo"
          class="mb-1.5 block text-sm font-medium text-white"
        >
          Correo institucional
        </label>

        <input
          id="correo"
          v-model="form.correoInstitucional"
          type="email"
          placeholder="usuario@universidad.edu.ec"
          autocomplete="email"
          class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-[clamp(0.65rem,1.5vh,0.85rem)] text-white outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
      </div>

      <p
        v-if="errorMessage"
        class="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200"
      >
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        class="w-full rounded-xl bg-blue-600 px-5 py-[clamp(0.7rem,1.5vh,0.85rem)] font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
      >
        Ingresar
      </button>
    </form>

    <footer
      class="mt-[clamp(0.75rem,2vh,1.5rem)] text-center text-sm text-slate-300"
    >
      Soporte técnico disponible durante el proceso electoral.
    </footer>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  cedula: "",
  correoInstitucional: "",
});

const errorMessage = ref("");

function irAlHome(): void {
  errorMessage.value = "";

  if (!form.cedula.trim() || !form.correoInstitucional.trim()) {
    errorMessage.value = "Completa todos los campos para continuar.";
    return;
  }

  router.replace({ name: "home" });
}
</script>