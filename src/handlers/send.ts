import { type Config, type File, actions } from '~store'
import { fillPlaceholders } from '~utils'

const $ = document.querySelector.bind(document)

let isUploading = false

export function stopSending() {
  isUploading = false
  actions.ui.setIsUploading(false)
}

export async function startSending(files: File[], config: Config) {
  if (isUploading) return
  isUploading = true
  actions.ui.setIsUploading(true)
  try {
    sendMessage(config.startMessage)
    await waitForResponse(config.delayBetweenMessages)
    for (const file of files) {
      for (let index = file.sentPartsCount; index < file.parts.length; index++) {
        if (!isUploading) return
        await sendFilePart(file, index, config)
      }
      actions.files.remove(0)
    }
    sendMessage(config.endMessage)
  } catch (error) {
    actions.errors.add(error)
  }
  actions.ui.setIsUploading(false)
  isUploading = false
}

async function sendFilePart(file: File, index: number, config: Config) {
  sendMessage(
    fillPlaceholders(config.filePartMessage, {
      filename: file.name,
      partNumber: index + 1,
      partsCount: file.parts.length,
      content: file.parts[index],
    }),
  )
  actions.files.setSentPartsCount(0, index + 1)
  await waitForResponse(config.delayBetweenMessages)
}

function sendMessage(text: string) {
  const $input = $('form textarea')
  $input.value = text
  $input.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      keyCode: 13,
      bubbles: true,
    }),
  )
}

async function waitForResponse(additionalDelay: number) {
  while (!$('form').innerHTML.includes('Regenerate response')) await wait(250)
  await wait(additionalDelay)
}

async function wait(ms: number) {
  return new Promise((done) => setTimeout(done, ms))
}
