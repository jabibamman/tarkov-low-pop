<script setup>
const props = defineProps({
  regions: { type: Array, required: true },
  active: { type: Array, required: true },
  lowPopByCode: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:active'])

function toggle(code) {
  const next = props.active.includes(code)
    ? props.active.filter(c => c !== code)
    : [...props.active, code]
  emit('update:active', next)
}
function selectAll() { emit('update:active', props.regions.map(r => r.code)) }
function selectNone() { emit('update:active', []) }
</script>

<template>
  <nav class="filter-bar" aria-label="Region filters">
    <div class="filter-bar__inner">
      <button
        v-for="region in regions"
        :key="region.code"
        class="filter-btn"
        :class="{ active: active.includes(region.code) }"
        :aria-pressed="active.includes(region.code)"
        :aria-label="`Toggle region ${region.code}`"
        @click="toggle(region.code)"
      >
        <span class="filter-btn__code">{{ region.code }}</span>
        <span
          class="filter-btn__count"
          :class="{ 'filter-btn__count--active': (lowPopByCode[region.code] || 0) > 0 }"
        >{{ lowPopByCode[region.code] || 0 }}</span>
      </button>

      <span class="filter-bar__sep" aria-hidden="true"></span>

      <button class="filter-btn filter-btn--ghost" @click="selectAll" aria-label="Select all regions">ALL</button>
      <button class="filter-btn filter-btn--ghost" @click="selectNone" aria-label="Clear region selection">NONE</button>
    </div>
  </nav>
</template>
