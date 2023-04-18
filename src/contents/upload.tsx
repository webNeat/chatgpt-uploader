import cssText from 'data-text:~style.css'
import type { PlasmoCSConfig } from 'plasmo'
import { Provider } from 'react-redux'

import { Errors, Files, Settings, Toolbar, ui } from '~components'
import { store } from '~store'

export const config: PlasmoCSConfig = {
  matches: ['*://chat.openai.com/*'],
}

export function getStyle() {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export async function getInlineAnchor() {
  return document.querySelector('main')
}

export default function App() {
  return (
    <Provider store={store}>
      <ui.Container>
        <Errors />
        <Files />
        <Toolbar />
        <Settings />
      </ui.Container>
    </Provider>
  )
}
