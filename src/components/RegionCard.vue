<script setup>
import { computed } from 'vue'
import ServerRow from './ServerRow.vue'

const props = defineProps({
  region: { type: Object, required: true },
  viewMode: { type: String, required: true },
})

const visibleServers = computed(() => {
  if (props.viewMode === 'lowpop') {
    return props.region.servers.filter(s => s.status.isLowPop)
  }
  return props.region.servers
})

const lowPopInRegion = computed(() =>
  props.region.servers.filter(s => s.status.isLowPop).length
)
</script>

<template>
  <section class="region-card" :aria-label="region.region">
    <header class="region-header">
      <span class="region-header__diamond" aria-hidden="true">◆</span>
      <span class="region-header__title">{{ region.region }}</span>
      <span
        class="region-header__count"
        :class="{ 'region-header__count--active': lowPopInRegion > 0 }"
      >
        {{ lowPopInRegion }} LOW
      </span>
    </header>
    <ul class="server-list">
      <ServerRow
        v-for="server in visibleServers"
        :key="server.name + server.tz"
        :server="server"
      />
    </ul>
  </section>
</template>
