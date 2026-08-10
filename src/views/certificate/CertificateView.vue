<template>
  <div class="flex  items-center justify-center bg-gray-100 px-4 py-6 print:bg-white">
    <div
      class="w-full max-w-[420px] rounded-2xl border border-gray-300 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] print:max-w-none print:shadow-none"
      style="width:85.6mm; height:54mm;"
    >
      <div class="flex items-center justify-between border-b border-gray-200 pb-2">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
            UCE
          </div>
          <div>
            <h2 class="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-900">
              CERTIFICADO
            </h2>
            <p class="text-[8px] uppercase tracking-[0.2em] text-gray-500">
              Votación institucional
            </p>
          </div>
        </div>
        <div class="rounded-full border border-gray-300 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Votación
        </div>
      </div>

      <div class="mt-3 space-y-1 text-[10px] text-gray-800">
        <div class="mb-2 flex justify-center">
          <div class="rounded-full bg-slate-900 px-2.8 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
            {{ studentName }}
          </div>
        </div>

        <div class="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
          <p><strong>FACULTAD:</strong> {{ faculty }}</p>
          <p><strong>JUNTA:</strong> {{ junta }}</p>
        </div>
      </div>

      <div class="mt-2 flex items-end justify-between">
        <div class="text-[8px] uppercase tracking-[0.2em] text-gray-500">
          Validado digitalmente
        </div>
        <div class="  rounded-md border border-gray-300 bg-white p-1.3">
          <div class="grid grid-cols-7 gap-[2px]">
            <div
              v-for="(cell, index) in qrCells"
              :key="index"
              class="h-1 w-1 rounded-[1px]"
              :class="cell ? 'bg-gray-900' : 'bg-white'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { validateToken } from "@/services/auth-service";
import type { Student } from "@/interfaces/auth/Student";

interface CertificateState {
  student: Student | null;
  faculty: string;
  junta: string;
}

const state = ref<CertificateState>({
  student: null,
  faculty: "Cargando...",
  junta: "Cargando..."
});

const studentName = computed(() => {
  const student = state.value.student;
  if (!student) return "USUARIO";

  return `${student.nombres ?? ""} ${student.apellidos ?? ""}`.trim() || "USUARIO";
});

const faculty = computed(() => state.value.faculty || "SIN INFORMACIÓN");
const junta = computed(() => state.value.junta || "SIN INFORMACIÓN");

const qrValue = computed(() => {
  const student = state.value.student;

  if (!student) {
    return "CERTIFICADO-VOTACION";
  }

  return `VOTANTE:${student.idVotante ?? "0"}:${student.cedula ?? student.correoInstitucional ?? "sin-datos"}`;
});

const qrCells = computed(() => {
  const value = qrValue.value;
  const size = 7;
  const cells: boolean[] = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const isFinder =
        (row < 3 && col < 3) ||
        (row < 3 && col >= size - 3) ||
        (row >= size - 3 && col < 3);

      const isCenter = row >= 2 && row <= 4 && col >= 2 && col <= 4;

      if (isFinder || isCenter) {
        cells.push(true);
        continue;
      }

      const charCode = value.charCodeAt((row * 3 + col * 5) % value.length);
      const pattern = ((charCode + row * 7 + col * 3) % 5) < 2;
      cells.push(pattern);
    }
  }

  return cells;
});

onMounted(async () => {
  try {
    const savedStudent = localStorage.getItem("student");

    if (savedStudent) {
      const parsedStudent = JSON.parse(savedStudent) as Student;
      state.value.student = parsedStudent;
    }

    const validatedStudent = await validateToken();

    if (validatedStudent) {
      state.value.student = validatedStudent;
    }

    const currentStudent = state.value.student;

    if (currentStudent) {
      state.value.faculty = currentStudent.correoInstitucional?.includes("@uce.edu.ec")
        ? "Ingeniería y Ciencias Aplicadas"
        : "SIN INFORMACIÓN";
      state.value.junta = currentStudent.idVotante
        ? `V-${currentStudent.idVotante}`
        : "SIN INFORMACIÓN";
    } else {
      state.value.faculty = "SIN INFORMACIÓN";
      state.value.junta = "SIN INFORMACIÓN";
    }
  } catch (error) {
    console.error("No fue posible cargar la información del certificado:", error);
  }

  setTimeout(() => {
    window.print();
    localStorage.removeItem("token");
    localStorage.removeItem("student");
  }, 300);
});
</script>