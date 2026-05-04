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
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'Local'
  }
})

function setMode(mode) {
  emit('update:viewMode', mode)
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="brand">
        <span class="brand__icon" aria-hidden="true">☠</span>
        <h1 class="brand__title">EFT LOW POP FINDER</h1>
      </div>

      <div class="header-clock" aria-label="Your local time">
        <span class="header-clock__tz">{{ localTzLabel }}</span>
        <span class="header-clock__time">{{ userClock }}</span>
      </div>

      <div class="header-controls">
        <span
          class="badge-count"
          :class="{ 'badge-count--active': lowPopCount > 0 }"
          aria-label="Number of servers currently low pop"
        >
          <span class="badge-count__num">{{ lowPopCount }}</span>
          <span class="badge-count__label">SERVERS LOW POP</span>
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
          >💤 LOW POP</button>
        </div>
      </div>
    </div>
  </header>
</template>
