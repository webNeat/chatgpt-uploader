export function splitContent(content: string, maxPartLength: number) {
  const lines = content.split(`\n`)
  const parts = []
  let part = ''
  for (const line of lines) {
    if (line.length >= maxPartLength) throw `line of length ${line.length} is too long!`
    if (part.length + line.length > maxPartLength) {
      parts.push(part)
      part = ''
    }
    part += `\n` + line
  }
  if (part) parts.push(part)
  return parts
}
