<template>
<div class="input-container">

        <label
            v-if="label"
            class="input-label"
            :for="id"
        >
            {{ label }}
        </label>

        <input
            :id="id"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :inputmode="inputmode"
            class="base-input"
            @input="$emit('update:modelValue', $event.target.value)"
        />

    </div>
</template>

<script setup>

defineProps({

    id:String,

    modelValue:String,

    label:String,

    placeholder:String,

    autocomplete:String,

    inputmode:String,

    type:{
        type:String,
        default:"text"
    }

})

defineEmits(["update:modelValue"])
</script>

<style>

</style>