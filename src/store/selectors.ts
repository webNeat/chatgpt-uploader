import type { Config, State } from './state'

export function getConfig(state: State): Config {
  return state.config
}

export function getUI(state: State) {
  return state.ui
}

export function getFiles(state: State) {
  return state.files
}

export function getErrors(state: State) {
  return state.errors
}
