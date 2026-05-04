<script setup>
import { computed } from 'vue'
import { getCountdown } from '../utils/timezone'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  server: { type: Object, required: true },
})

const countdown = computed(() =>
  getCountdown(props.server.status.hour, props.server.status.minute)
)
</script>

<template>
  <li class="server-row" :class="{ 'low-pop': server.status.isLowPop }">
    <div class="server-row__main">
      <span class="server-name">{{ server.name }}</span>
      <span class="server-time" aria-label="Local server time">{{ server.status.timeStr }}</span>
      <StatusBadge :is-low-pop="server.status.isLowPop" />
    </div>
    <div class="server-row__countdown">
      <span class="countdown-label">{{ countdown.label }}</span>
      <span class="countdown-value">{{ countdown.value }}</span>
    </div>
  </li>
</template>
