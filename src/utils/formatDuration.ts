const SEC = 1000
const MIN = 60 * SEC
const HOUR = 60 * MIN

export function formatDuration(ms: number) {
  if (ms < 1000) return '1 sec'
  const hours = Math.floor(ms / HOUR)
  ms -= hours * HOUR
  const minutes = Math.floor(ms / MIN)
  ms -= minutes * MIN
  const seconds = Math.floor(ms / 1000)
  return [hours ? hours + 'h' : '', minutes ? minutes + 'm' : '', seconds ? seconds + 's' : ''].filter((x) => x).join(' ')
}
