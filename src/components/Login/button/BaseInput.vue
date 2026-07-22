<template>
  <div class="input-group">
    <label v-if="label" class="input-label">
      {{ label }}
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <small v-if="hint" class="input-hint">
      {{ hint }}
    </small>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  hint: String,
  type: {
    type: String,
    default: "text",
  },
  disabled: Boolean,
});

defineEmits(["update:modelValue"]);
</script>

<style>

</style>