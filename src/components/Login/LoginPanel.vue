<script setup lang="ts">

import LoginForm from './LoginForm.vue'

defineProps<{

    visible:boolean

}>()

</script>

<template>

<aside
    class="login-panel"
    :class="{ show: visible }"
>

    <LoginForm/>

</aside>

</template>