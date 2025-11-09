<template>
  <div v-if="show" class="fixed inset-0 h-full w-full bg-black/80 flex items-center justify-center">
    <div class="relative bg-white rounded-lg shadow-xl mx-auto p-8 w-full max-w-md">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-col">
          <h3 class="text-xl font-bold">{{ title }}</h3>
          <p class="text-gray-400">{{ description }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-800 cursor-pointer">
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>

      <!-- Formulário -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

defineEmits(['close']);
</script>
