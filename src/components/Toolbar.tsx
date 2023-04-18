import { browse, startSending, stopSending } from '~handlers'
import { formatDuration } from '~utils'

import { actions, selectors } from '../store'
import * as icons from './icons'
import { Button, IconButton } from './ui'

export function Toolbar() {
  const { isUploading } = selectors.getUI()
  const files = selectors.getFiles()
  const config = selectors.getConfig()
  let messagesCount = files.map((x) => x.parts.length - x.sentPartsCount).reduce((a, b) => a + b, 0)
  if (config.startMessage) messagesCount++
  if (config.endMessage) messagesCount++
  const duration = formatDuration(messagesCount * (1000 + config.delayBetweenMessages))
  return (
    <div className="flex">
      {!isUploading && (
        <div className="flex flex-grow gap-2 justify-center">
          <IconButton className="rounded-md">
            <icons.AddFile className="h-6 w-6" onClick={() => browse('files')} />
          </IconButton>
          <IconButton className="rounded-md">
            <icons.AddDirectory className="h-6 w-6" onClick={() => browse('directories')} />
          </IconButton>
          <IconButton className="rounded-md" onClick={() => actions.ui.toggleSettings()}>
            <icons.Settings className="h-6 w-6" />
          </IconButton>
          {files.length > 0 && (
            <Button className="flex items-center gap-2" onClick={() => startSending(files, config)}>
              <icons.Start className="text-white" />
              <p>Start upload</p>
            </Button>
          )}
        </div>
      )}
      {isUploading && (
        <div className="flex flex-grow gap-2 justify-center">
          <Button className="flex items-center gap-2" onClick={() => stopSending()}>
            <icons.Stop />
            <p>Pause upload</p>
          </Button>
        </div>
      )}
      {files.length > 0 && (
        <div className="p-2">
          {messagesCount} messages ~ {duration}
        </div>
      )}
    </div>
  )
}
