import { actions } from '~store'

export async function browse(type: 'files' | 'directories') {
  const input = createInput(type)
  const files = await selectFiles(input)
  actions.errors.clear()
  for (const file of files) {
    const name = file.webkitRelativePath || file.name
    const content = await readFile(file)
    actions.files.add(name, content)
  }
  input.remove()
}

function createInput(type: 'files' | 'directories') {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.classList.add('hidden')
  if (type === 'directories') {
    input.webkitdirectory = true
  }
  document.body.appendChild(input)
  return input
}

async function selectFiles(input: HTMLInputElement) {
  return new Promise<FileList>((resolve) => {
    input.addEventListener('change', (event) => {
      resolve((event.target as HTMLInputElement).files)
    })
    input.click()
  })
}

async function readFile(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsText(file)
  })
}
