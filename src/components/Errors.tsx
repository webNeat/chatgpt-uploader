import { actions, selectors } from '~store'

import { Close } from './icons'
import { Alert } from './ui'

export function Errors() {
  const errors = selectors.getErrors()
  if (errors.length === 0) return null
  return (
    <Alert className="relative" variant="error">
      <Close onClick={() => actions.errors.clear()} className="absolute top-0 right-0 p-2 h-9 w-9 cursor-pointer" />
      {errors.map((error) => (
        <p>{error}</p>
      ))}
    </Alert>
  )
}
