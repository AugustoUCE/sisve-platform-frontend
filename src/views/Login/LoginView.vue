<template>
  <section
    class="mx-10 my-10 flex  h-screen max-w-7xl flex-col justify-center py-4"
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
          <BaseInput
            id="cedula"
            v-model="form.cedula"
            placeholder="Ingresa tu número de cédula"
            autocomplete="username"
            inputmode="numeric"
            />

      </div>

      <div>
        <label
          for="correo"
          class="mb-1.5 block text-sm font-medium text-white"
        >
          Correo institucional
        </label>

        <BaseInput
          id="correo"
          v-model="form.correoInstitucional"
          type="email"
          placeholder="Ingresa tu correo institucional"
          autocomplete="email"
          inputmode="email"
          />
      </div>

      <p
        v-if="errorMessage"
        class="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200"
      >
        {{ errorMessage }}
      </p>

      <BaseButton variant="primary"

         :disabled="!form.cedula.trim() || !form.correoInstitucional.trim()"


         >
        Ingresar
      </BaseButton>
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
import { login } from "@/services/auth-service";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";

const router = useRouter();

const form = reactive({
  cedula: "",
  correoInstitucional: "",
});

const errorMessage = ref("");

async function irAlHome(): Promise<void> {
  errorMessage.value = "";

  if (!form.cedula.trim() || !form.correoInstitucional.trim()) {
    errorMessage.value = "Completa todos los campos para continuar.";
    return;
  }

  const response = await login({
    cedula: form.cedula,
    correoInstitucional: form.correoInstitucional,
  });

  if (!response.success) {
    errorMessage.value = response.message;
    return;
  }

  if (response.token) {
    localStorage.setItem("token", response.token);
  }

  if (response.student) {
    localStorage.setItem("student", JSON.stringify(response.student));
  }

  router.replace({ name: "ballot" });
}
</script>
