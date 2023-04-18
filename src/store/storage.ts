import { State } from './state'

const KEY = 'chatgpt-uploader-store'

export function load(): State {
  let data: any = {}
  try {
    data = JSON.parse(localStorage.getItem(KEY))
    return State.parse(data)
  } catch (err) {
    console.error('Error while loading state', err)
  }
  return State.parse({})
}

export function save(data: State) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
