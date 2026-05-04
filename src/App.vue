<script setup>
import { ref, computed } from 'vue'
import { useLiveClock } from './composables/useLiveClock'
import { EFT_SERVERS } from './data/servers'
import { getServerStatus } from './utils/timezone'
import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/FilterBar.vue'
import RegionCard from './components/RegionCard.vue'
import EmptyState from './components/EmptyState.vue'
import AppFooter from './components/AppFooter.vue'

const { now } = useLiveClock()
const viewMode = ref('all')
const activeRegions = ref(EFT_SERVERS.map(r => r.code))

const allRegionsSnapshot = computed(() =>
  EFT_SERVERS.map(r => ({
    ...r,
    servers: r.servers.map(s => ({
      ...s,
      status: getServerStatus(s.tz, now.value),
    })),
  }))
)

const enrichedRegions = computed(() =>
  allRegionsSnapshot.value
    .filter(r => activeRegions.value.includes(r.code))
    .filter(r => viewMode.value === 'all' || r.servers.some(s => s.status.isLowPop))
)

const lowPopCount = computed(() =>
  allRegionsSnapshot.value.flatMap(r => r.servers).filter(s => s.status.isLowPop).length
)

const lowPopByCode = computed(() =>
  Object.fromEntries(
    allRegionsSnapshot.value.map(r => [
      r.code,
      r.servers.filter(s => s.status.isLowPop).length,
    ])
  )
)

const hasFilters = computed(() =>
  viewMode.value === 'lowpop' || activeRegions.value.length < EFT_SERVERS.length
)

function resetFilters() {
  viewMode.value = 'all'
  activeRegions.value = EFT_SERVERS.map(r => r.code)
}
</script>

<template>
  <div class="eft-app">
    <div class="eft-app__noise" aria-hidden="true"></div>
    <div class="eft-app__vignette" aria-hidden="true"></div>

    <AppHeader
      :now="now"
      :low-pop-count="lowPopCount"
      v-model:view-mode="viewMode"
    />
    <FilterBar
      :regions="EFT_SERVERS"
      v-model:active="activeRegions"
      :low-pop-by-code="lowPopByCode"
    />

    <main class="eft-main">
      <div v-if="enrichedRegions.length > 0" class="region-grid">
        <RegionCard
          v-for="region in enrichedRegions"
          :key="region.code"
          :region="region"
          :view-mode="viewMode"
        />
      </div>
      <EmptyState
        v-else
        :snapshot="allRegionsSnapshot"
        :has-filters="hasFilters"
        @reset="resetFilters"
      />
    </main>

    <AppFooter />
  </div>
</template>
