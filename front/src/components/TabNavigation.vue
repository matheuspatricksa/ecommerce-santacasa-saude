<template>
  <div class="h-10 items-center justify-center rounded-md p-1 grid grid-cols-3 w-full">
    <button v-for="tab in tabs" :key="tab.value" @click="$emit('update:modelValue', tab.value)" :class="[
      'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium gap-1 transition-colors',
      modelValue === tab.value ? 'bg-white rounded-lg' : ''
    ]">
      <Icon :icon="tab.icon" width="16" height="16" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);

const tabs = [
  { value: 'plans', label: 'Planos', icon: 'mdi:shield-outline' },
  { value: 'clients', label: 'Clientes', icon: 'mdi:user-multiple-outline' },
  { value: 'purchases', label: 'Compras', icon: 'mdi:heart-outline' }
];
</script>
