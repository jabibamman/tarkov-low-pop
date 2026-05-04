<script setup>
import { computed } from 'vue'
import { formatUserClock } from '../utils/timezone'

const props = defineProps({
  now: { type: Date, required: true },
  lowPopCount: { type: Number, required: true },
  viewMode: { type: String, required: true },
})

const emit = defineEmits(['update:viewMode'])

const userClock = computed(() => formatUserClock(props.now))

const localTzLabel = computed(() => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone }
  catch { return 'Local' }
})

function setMode(mode) { emit('update:viewMode', mode) }
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="brand">
        <span class="brand__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2c-4.4 0-8 3.4-8 7.6 0 2.6 1.3 4.8 3.4 6.2v2.6c0 .6.5 1.1 1.1 1.1h.6V18h1v1.5h1.8V18h1v1.5h1V18h.6c.6 0 1.1-.5 1.1-1.1v-2.6C18.7 14.4 20 12.2 20 9.6 20 5.4 16.4 2 12 2z" />
            <circle cx="9" cy="10" r="1.6" fill="currentColor" />
            <circle cx="15" cy="10" r="1.6" fill="currentColor" />
            <path d="M11 13.5l1 1.5 1-1.5" />
          </svg>
        </span>
        <div class="brand__text">
          <h1 class="brand__title">EFT LOW POP FINDER</h1>
          <span class="brand__sub">v1.0 · OPS-ROOM</span>
        </div>
      </div>

      <div class="header-center">
        <div class="live-indicator" aria-label="Live data">
          <span class="live-indicator__dot" aria-hidden="true"></span>
          <span class="live-indicator__label">LIVE</span>
        </div>
        <div class="header-clock" aria-label="Your local time">
          <span class="header-clock__tz">{{ localTzLabel }}</span>
          <span class="header-clock__time">{{ userClock }}</span>
        </div>
      </div>

      <div class="header-controls">
        <span
          class="badge-count"
          :class="{ 'badge-count--active': lowPopCount > 0 }"
          aria-label="Number of servers currently low pop"
        >
          <span class="badge-count__num">{{ String(lowPopCount).padStart(2, '0') }}</span>
          <span class="badge-count__label">LOW POP<br />SERVERS</span>
        </span>

        <div class="view-toggle" role="group" aria-label="View mode">
          <button
            class="filter-btn"
            :class="{ active: viewMode === 'all' }"
            @click="setMode('all')"
            aria-label="Show all servers"
          >ALL</button>
          <button
            class="filter-btn"
            :class="{ active: viewMode === 'lowpop' }"
            @click="setMode('lowpop')"
            aria-label="Show only low pop servers"
          >LOW POP</button>
        </div>
      </div>
    </div>
  </header>
</template>
