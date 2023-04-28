import dye from 'react-dye'

export const Container = dye('flex flex-col mb-2 w-full lg:mx-auto lg:max-w-2xl xl:max-w-3xl px-4 py-2 gap-2 bg-[#353740] text-white rounded-lg')

export const Alert = dye('p-3 border text-md rounded-md', 'div', {
  default: 'border-gray-700 bg-gray-100 text-gray-800',
  error: 'border-red-700 bg-red-100 text-red-800',
})

export const IconButton = dye('block p-2 cursor-pointer text-md', 'button', {
  default: 'text-white hover:bg-zinc-900',
  error: 'text-red-800 hover:bg-red-800 hover:text-white',
})
export const Button = dye('block p-3 transition-colors duration-200 cursor-pointer text-md rounded-md', 'button', {
  default: 'bg-zinc-900 hover:bg-zinc-800 text-white',
  red: 'bg-red-900 hover:bg-red-800 text-white',
})

export const Form = dye('grid grid-cols-4 gap-2 my-2', 'form')
export const Label = dye('block p-3 text-white text-md', 'label')
export const Input = dye('block col-span-3 p-3 bg-[#40414F] text-white text-md border-0 rounded-md outline-0', 'input')
export const Textarea = dye('block col-span-3 p-3 bg-[#40414F] text-white text-md border-0 rounded-md outline-0 resize-none max-h-[200px]', 'textarea')
