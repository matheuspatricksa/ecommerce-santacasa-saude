<template>
  <div aria-live="polite" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50">
    <div class="w-full space-y-4">
      <transition-group name="toast" tag="div">
        <div v-for="t in toasts" :key="t.id" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-gray-300 ring-opacity-5 overflow-hidden">
          <div class="p-4 flex items-start">
            <div class="shrink-0 mt-0.5">
              <template v-if="t.type === 'success'">
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </template>
              <template v-else>
                <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </template>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ t.type === 'success' ? 'Sucesso' : 'Erro' }}</p>
              <p class="mt-1 text-sm text-gray-500 wrap-break-words">{{ t.message }}</p>
            </div>
            <div class="ml-4 shrink-0 flex">
              <button @click="remove(t.id)" class="inline-flex text-gray-400 hover:text-gray-600">
                <span class="sr-only">Fechar</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { toasts, removeToast } = useToast()

function remove(id) {
  removeToast(id)
}
</script>

<style scoped>
.toast-enter-from, .toast-leave-to { transform: translateY(10px); opacity: 0 }
.toast-enter-active, .toast-leave-active { transition: all 200ms ease }
</style>
