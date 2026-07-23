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
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  modelValue?: string
  label?: string
  placeholder?: string
  autocomplete?: string
  inputmode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url"
  type?: string
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  modelValue: "",
  label: undefined,
  placeholder: undefined,
  autocomplete: undefined,
  inputmode: "text",
  type: "text",
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement
  emit("update:modelValue", input.value)
}
</script>