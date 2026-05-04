<script setup>
defineProps({
  isLowPop: { type: Boolean, required: true },
})
</script>

<template>
  <span
    class="status-badge"
    :class="isLowPop ? 'status-badge--low' : 'status-badge--active'"
  >
    <span class="status-badge__dot" aria-hidden="true"></span>
    <span class="status-badge__label">{{ isLowPop ? 'LOW POP' : 'ACTIVE' }}</span>
  </span>
</template>
