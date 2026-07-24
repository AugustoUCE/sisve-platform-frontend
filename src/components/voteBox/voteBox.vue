<script setup lang="ts">

defineProps<{
    selected:boolean
}>()

const emit = defineEmits<{
    (e:"select"):void
}>()

</script>

<template>

<div
    class="vote-box"
    :class="{active:selected}"
    @click="emit('select')"
>
    <svg class="linea" viewBox="0 0 100 100">
        <line x1="80" y1="50" x2="20" y2="50"/>
    </svg>
    <svg
        class="mark"
        viewBox="0 0 100 100"
    >
        <line
            x1="80"
            y1="20"
            x2="20"
            y2="80"
        />
    </svg>

</div>

</template>