<script setup lang="ts">

const emit = defineEmits<{

    (e:'open-login'):void

}>()

</script>

<template>

<section class="hero">

    <img
        src="@/assets/images/logo.png"
        class="logo"
        width="200"
        height="200"
    >

    <h1>Sistema Web de Votación</h1>

    <p>
        Plataforma para procesos electorales
    </p>

    <button
        @click="emit('open-login')"
    >
        Ingresar
    </button>

</section>

</template>