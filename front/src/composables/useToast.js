import { reactive } from 'vue'

// Lista reativa global de toasts
const toasts = reactive([])
let nextId = 1

function _remove(id) {
  const idx = toasts.findIndex(t => t.id === id)
  if (idx !== -1) toasts.splice(idx, 1)
}

function show(type, message, { timeout = 4000 } = {}) {
  const id = nextId++
  const toast = { id, type, message }
  toasts.push(toast)
  if (timeout > 0) setTimeout(() => _remove(id), timeout)
  return id
}

function success(message, opts = {}) {
  return show('success', message, opts)
}

function error(message, opts = {}) {
  return show('error', message, opts)
}

function removeToast(id) {
  _remove(id)
}

export function useToast() {
  return {
    toasts,
    success,
    error,
    show,
    removeToast
  }
}

export default useToast
