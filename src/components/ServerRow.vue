<script setup>
import { computed } from 'vue'
import { getCountdown, LOW_POP_START, LOW_POP_END } from '../utils/timezone'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  server: { type: Object, required: true },
})

const countdown = computed(() =>
  getCountdown(props.server.status.hour, props.server.status.minute)
)

const progress = computed(() => {
  const st = props.server.status
  if (!st.isLowPop) return 0
  const totalMin = (LOW_POP_END - LOW_POP_START) * 60
  const elapsed = (st.hour - LOW_POP_START) * 60 + st.minute
  return Math.max(0, Math.min(1, elapsed / totalMin))
})

const tzShort = computed(() =>
  props.server.tz.split('/').pop().replace(/_/g, ' ')
)
</script>

<template>
  <li class="server-row" :class="server.status.isLowPop ? 'low-pop' : 'active'">
    <div class="server-row__main">
      <div class="server-row__id">
        <span class="server-name">{{ server.name }}</span>
        <span class="server-tz" aria-hidden="true">{{ tzShort }}</span>
      </div>
      <div class="server-row__time">
        <span class="server-time" aria-label="Local server time">{{ server.status.timeStr }}</span>
      </div>
      <StatusBadge :is-low-pop="server.status.isLowPop" />
    </div>

    <div class="server-row__countdown">
      <span class="countdown-label">{{ countdown.label }}</span>
      <span class="countdown-value">{{ countdown.value }}</span>
    </div>

    <div v-if="server.status.isLowPop" class="server-row__progress" aria-hidden="true">
      <div class="server-row__progress-fill" :style="{ width: (progress * 100) + '%' }"></div>
      <div class="server-row__progress-ticks">
        <span
          v-for="i in (LOW_POP_END - LOW_POP_START - 1)"
          :key="i"
          :style="{ left: ((i / (LOW_POP_END - LOW_POP_START)) * 100) + '%' }"
        ></span>
      </div>
    </div>
  </li>
</template>
