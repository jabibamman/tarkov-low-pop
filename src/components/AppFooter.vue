<script setup>
import { LOW_POP_START, LOW_POP_END } from '../utils/timezone'

const start = String(LOW_POP_START).padStart(2, '0') + ':00'
const end = String(LOW_POP_END).padStart(2, '0') + ':00'
</script>

<template>
  <footer class="app-footer">
    <span class="app-footer__line">
      Low pop window:
      <span class="app-footer__hl">{{ start }} – {{ end }}</span>
      server time
    </span>
    <span class="app-footer__sep" aria-hidden="true">//</span>
    <span class="app-footer__line">All times computed in your browser — no backend</span>
  </footer>
</template>
