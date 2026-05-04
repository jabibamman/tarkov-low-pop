<script setup>
defineProps({
  isLowPop: { type: Boolean, required: true },
})
</script>

<template>
  <span
    v-if="isLowPop"
    class="badge-low-pop"
    aria-label="Low population server"
  >💤 LOW POP</span>
  <span
    v-else
    class="badge-normal"
    aria-label="Normal population"
  >─</span>
</template>
