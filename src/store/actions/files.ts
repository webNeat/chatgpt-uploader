import { fillPlaceholders, splitContent } from '~utils'

import type { State } from '../state'
import * as errors from './errors'

const MAX_MESSAGE_LENGTH = 2048

export function add(state: State, name: string, content: string) {
  const emptyPartMessage = fillPlaceholders(state.config.filePartMessage, {
    filename: name,
    partNumber: '0000',
    partsCount: '0000',
    content: '',
  })
  const partMaxLength = MAX_MESSAGE_LENGTH - emptyPartMessage.length
  try {
    const parts = splitContent(content, partMaxLength)
    state.files.push({ name, parts, sentPartsCount: 0 })
  } catch (error) {
    errors.add(state, `${name}: ${error}`)
  }
}

export function setSentPartsCount(state: State, index: number, count: number) {
  state.files[index].sentPartsCount = count
}

export function remove(state: State, index: number) {
  state.files.splice(index, 1)
}
