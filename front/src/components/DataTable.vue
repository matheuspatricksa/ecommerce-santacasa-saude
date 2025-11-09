<template>
  <div class="p-6 flex flex-col gap-4 bg-white">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <Icon :icon="icon" width="24" height="24" style="color: #00bbff;" />
          <h2 class="text-2xl font-bold">{{ title }}</h2>
        </div>
        <p class="text-gray-400">{{ description }}</p>
      </div>
      <button @click="$emit('add')"
        class="inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#00bbff] text-white px-4 py-2 gap-2 hover:bg-[#0099cc] transition-colors duration-300">
        <Icon icon="mdi:plus" width="16" height="16" />
        <span>{{ addButtonText }}</span>
      </button>
    </div>
    <div class="border border-gray-300 rounded-lg">
      <div class="relative w-full overflow-auto">
        <table class="w-full caption-bottom text-sm">
          <thead class="border-b border-gray-300">
            <tr>
              <th v-for="column in columns" :key="column.key"
                :class="['h-12 px-4 align-middle font-medium text-gray-500', column.align === 'right' ? 'text-right' : 'text-left']">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <slot name="rows"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  addButtonText: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

defineEmits(['add']);
</script>
