import cn from 'classnames'

import { File, actions, selectors } from '~store'
import { formatDuration } from '~utils'

import { DeleteFile } from './icons'
import { IconButton } from './ui'

export function Files() {
  const files = selectors.getFiles()
  if (files.length === 0) return null
  return (
    <div className="max-h-96 p-2 overflow-y-scroll">
      {files.map((file, index) => (
        <FileProgress key={`${index}-${file.name}`} index={index} file={file} />
      ))}
    </div>
  )
}

type FileProgressProps = {
  index: number
  file: File
}
function FileProgress({ index, file }: FileProgressProps) {
  const { delayBetweenMessages } = selectors.getConfig()
  const progress = Math.floor((100 * file.sentPartsCount) / file.parts.length)
  const timeLeft = formatDuration((file.parts.length - file.sentPartsCount) * (1_000 + delayBetweenMessages))
  return (
    <div className={cn('relative my-2 h-12 bg-[#202123] rounded-md overflow-hidden')}>
      <div className="h-12 bg-[#2A2B2E]" style={{ width: progress + '%' }}></div>
      <div className="absolute inset-0 flex h-12">
        <div className="flex-grow p-3">{file.name}</div>
        <div className="p-3">
          {file.parts.length} parts ~ {timeLeft}
        </div>
        <IconButton onClick={() => actions.files.remove(index)}>
          <DeleteFile className="w-6 h-6" />
        </IconButton>
      </div>
    </div>
  )
}
