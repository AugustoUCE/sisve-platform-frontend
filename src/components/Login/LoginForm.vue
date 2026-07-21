<script setup lang="ts">

import { ref } from 'vue'

const username = ref('')
const password = ref('')

function login(){

    console.log(username.value)

}

</script>

<template>

<form
    @submit.prevent="login"
>

    <h2>Iniciar sesión</h2>

    <input

        v-model="username"

        placeholder="Usuario"

    >

    <input

        type="password"

        v-model="password"

        placeholder="Contraseña"

    >

    <button>

        Entrar

    </button>

</form>

</template>