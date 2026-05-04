<script setup>
import { computed } from 'vue'

const props = defineProps({
  snapshot: { type: Array, required: true },
  hasFilters: { type: Boolean, default: false },
})

const emit = defineEmits(['reset'])

const nextServer = computed(() => {
  let next = null
  for (const r of props.snapshot) {
    for (const s of r.servers) {
      if (!s.status.isLowPop) {
        if (!next || s.status.countdownMin < next.status.countdownMin) next = s
      }
    }
  }
  return next
})

function formatDur(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h === 0 ? `${m}m` : `${h}h ${String(m).padStart(2, '0')}m`
}
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__skull" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M32 6c-12 0-22 9-22 20 0 7 4 12 8 16v8c0 2 1 3 3 3h22c2 0 3-1 3-3v-8c4-4 8-9 8-16 0-11-10-20-22-20z" />
        <circle cx="22" cy="28" r="5" fill="currentColor" />
        <circle cx="42" cy="28" r="5" fill="currentColor" />
        <path d="M28 40l4 6 4-6" />
        <path d="M22 50v6M28 50v6M32 50v6M36 50v6M42 50v6" />
      </svg>
    </div>
    <div class="empty-state__title">NO LOW POP SERVERS</div>
    <div class="empty-state__sub" v-if="nextServer">
      NEXT WINDOW · <span class="empty-state__server">{{ nextServer.name }}</span> ·
      <span class="empty-state__cd"> {{ formatDur(nextServer.status.countdownMin) }}</span>
    </div>
    <div class="empty-state__sub" v-else>All servers reporting active hours.</div>
    <button v-if="hasFilters" class="empty-state__cta" @click="emit('reset')">
      ▸ SHOW ALL SERVERS
    </button>
  </div>
</template>
