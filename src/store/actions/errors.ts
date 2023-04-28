import type { State } from '../state'

export function add(state: State, error: any) {
  if (error.message) state.errors.push(error.message)
  else state.errors.push(`${error}`)
}

export function remove(state: State, index: number) {
  state.errors.splice(index, 1)
}

export function clear(state: State) {
  state.errors = []
}
