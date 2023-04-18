import z from 'zod'
import React from 'react'

type Errors<Schema extends z.AnyZodObject> = {
  [key in keyof z.input<Schema>]?: string
}
type State<Schema extends z.AnyZodObject> = {
  status: 'initial' | 'submitting' | 'failed' | 'submitted'
  errors: Errors<Schema>
}

export function useForm<Schema extends z.AnyZodObject>(schema: Schema, onSubmit: (x: z.output<Schema>) => any) {
  const [state, setState] = React.useState<State<Schema>>({status: 'initial', errors: {}})
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState(x => ({...x, status: 'submitting', errors: {}}))
    const res = schema.safeParse(getFormValues(event.target as any))
    if (res.success === false) {
      const newErrors: Errors<Schema> = {}
      for (const {path, message} of res.error.errors) {
        newErrors[path[0] as keyof Errors<Schema>] = message
      }
      setState(x => ({...x, errors: newErrors, status: 'failed'}))
      return
    }
    try {
      await onSubmit(res.data)
      setState(x => ({...x, status: 'submitted'}))
    } catch (errors: any) {
      setState(x => ({...x, status: 'failed', errors}))
    }
  }
  return {...state, submit}
}

function getFormValues(form: HTMLFormElement) {
  const values: Record<string, string> = {}
  for (const input of form.elements as unknown as HTMLInputElement[]) {
    if (input.name) values[input.name] = input.value || ''
  }
  return values
}
