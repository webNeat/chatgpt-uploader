import { useForm } from '~libs/react-zod-form'

import { Config, actions, selectors } from '../store'
import { Alert, Button, Form, Input, Label, Textarea } from './ui'

export function Settings() {
  const { showSettings, isUploading } = selectors.getUI()
  const values = selectors.getConfig()
  const { errors, status, submit } = useForm(Config, (data) => {
    actions.config.save(data)
    actions.ui.hideSettings()
  })

  if (!showSettings || isUploading) return null
  return (
    <Form onSubmit={submit}>
      {status === 'failed' && (
        <Alert variant="error" className="col-span-4">
          {Object.entries(errors).map(([name, error]) => (
            <p key={name}>
              {name}: {error}
            </p>
          ))}
        </Alert>
      )}
      <Label htmlFor="startMessage">Start message</Label>
      <Input id="startMessage" name="startMessage" defaultValue={values.startMessage} />
      <Label htmlFor="filePartMessage">File part message</Label>
      <Textarea id="filePartMessage" name="filePartMessage" defaultValue={values.filePartMessage} />
      <Label htmlFor="endMessage">End message</Label>
      <Input id="endMessage" name="endMessage" defaultValue={values.endMessage} />
      <Label htmlFor="endMessage">Delay b/w messages</Label>
      <Input id="delayBetweenMessages" name="delayBetweenMessages" defaultValue={values.delayBetweenMessages} />
      <Button className="col-start-4" type="submit">
        Save
      </Button>
    </Form>
  )
}
