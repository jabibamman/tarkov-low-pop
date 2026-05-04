<script setup>
import { LOW_POP_START, LOW_POP_END } from '../utils/timezone'

const start = String(LOW_POP_START).padStart(2, '0') + ':00'
const end = String(LOW_POP_END).padStart(2, '0') + ':00'
</script>

<template>
  <footer class="app-footer">
    <span class="app-footer__line">
      WINDOW <span class="app-footer__hl">{{ start }} – {{ end }}</span> SERVER LOCAL
    </span>
    <span class="app-footer__sep" aria-hidden="true">//</span>
    <span class="app-footer__line">CLIENT-SIDE · NO BACKEND · NO TRACKING</span>
    <span class="app-footer__sep" aria-hidden="true">//</span>
    <span class="app-footer__line">
      <a class="app-footer__link" href="https://escapefromtarkov.fandom.com/wiki/Servers" target="_blank" rel="noopener">WIKI</a>
      <a class="app-footer__link" href="https://www.reddit.com/r/EscapeFromTarkov/" target="_blank" rel="noopener">r/EscapeFromTarkov</a>
    </span>
  </footer>
</template>
