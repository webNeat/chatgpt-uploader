import type { State } from '../state'

export function toggleSettings(state: State) {
  state.ui.showSettings = !state.ui.showSettings
}

export function hideSettings(state: State) {
  state.ui.showSettings = false
}

export function setIsUploading(state: State, value: boolean) {
  state.ui.isUploading = value
}
