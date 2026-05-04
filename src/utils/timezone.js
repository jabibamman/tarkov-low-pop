export const LOW_POP_START = 1
export const LOW_POP_END = 8

export function getServerStatus(tz, now) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  let hour = parseInt(parts.find(p => p.type === 'hour').value, 10)
  const minute = parseInt(parts.find(p => p.type === 'minute').value, 10)
  if (hour === 24) hour = 0

  const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  const isLowPop = hour >= LOW_POP_START && hour < LOW_POP_END

  return { timeStr, isLowPop, hour, minute }
}

export function getCountdown(hour, minute) {
  const totalMin = hour * 60 + minute
  const startMin = LOW_POP_START * 60
  const endMin = LOW_POP_END * 60

  if (hour >= LOW_POP_START && hour < LOW_POP_END) {
    const diff = endMin - totalMin
    return { label: 'ends in', value: formatDuration(diff) }
  } else {
    let diff = startMin - totalMin
    if (diff <= 0) diff += 24 * 60
    return { label: 'low pop in', value: formatDuration(diff) }
  }
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function formatUserClock(now) {
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}
