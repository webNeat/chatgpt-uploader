import {create} from 'redux-neat'
import * as storage from './storage'
import * as handlers from './actions'
import * as getters from './selectors'

export * from './state'
export const {store, actions, selectors} = create(storage.load(), {handlers, getters})

store.subscribe(() => {
  storage.save(store.getState())
})
