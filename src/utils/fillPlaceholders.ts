/**
 * fillPlaceholders('Hello {name}!', {name: 'World'}) //=> 'Hello World!'
 */
export function fillPlaceholders(text: string, values: Record<string, string | number>) {
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value))
  }
  return text
}
