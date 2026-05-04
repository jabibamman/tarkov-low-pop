<script setup>
import { computed } from 'vue'
import ServerRow from './ServerRow.vue'

const props = defineProps({
  region: { type: Object, required: true },
  viewMode: { type: String, required: true },
})

const visibleServers = computed(() => {
  let list = props.region.servers
  if (props.viewMode === 'lowpop') list = list.filter(s => s.status.isLowPop)
  return [...list].sort((a, b) =>
    a.status.isLowPop === b.status.isLowPop ? 0 : a.status.isLowPop ? -1 : 1
  )
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
      <span class="region-header__code">[{{ region.code }}]</span>
      <span
        class="region-header__count"
        :class="{ 'region-header__count--active': lowPopInRegion > 0 }"
      >
        {{ lowPopInRegion }} <span class="region-header__count-label">LOW</span>
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
