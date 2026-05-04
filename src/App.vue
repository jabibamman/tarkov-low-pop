<script setup>
import { ref, computed } from 'vue'
import { useLiveClock } from './composables/useLiveClock'
import { EFT_SERVERS } from './data/servers'
import { getServerStatus } from './utils/timezone'
import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/FilterBar.vue'
import RegionCard from './components/RegionCard.vue'
import AppFooter from './components/AppFooter.vue'

const { now } = useLiveClock()
const viewMode = ref('all')
const activeRegions = ref(EFT_SERVERS.map(r => r.code))

const enrichedRegions = computed(() =>
  EFT_SERVERS
    .filter(r => activeRegions.value.includes(r.code))
    .map(r => ({
      ...r,
      servers: r.servers.map(s => ({
        ...s,
        status: getServerStatus(s.tz, now.value),
      })),
    }))
    .filter(r => viewMode.value === 'all' || r.servers.some(s => s.status.isLowPop))
)

const lowPopCount = computed(() =>
  enrichedRegions.value.flatMap(r => r.servers).filter(s => s.status.isLowPop).length
)
</script>

<template>
  <div class="app">
    <AppHeader
      :now="now"
      :low-pop-count="lowPopCount"
      v-model:view-mode="viewMode"
    />
    <FilterBar :regions="EFT_SERVERS" v-model:active="activeRegions" />
    <main class="content">
      <RegionCard
        v-for="region in enrichedRegions"
        :key="region.code"
        :region="region"
        :view-mode="viewMode"
      />
      <div v-if="enrichedRegions.length === 0" class="empty-state">
        <span v-if="viewMode === 'lowpop'">🔒 NO LOW POP SERVERS RIGHT NOW</span>
        <span v-else>Select at least one region.</span>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
