import z from 'zod'

export const Config = z.object({
  startMessage: z
    .string()
    .default(`I will send you some files on multiple messages then ask questions, please reply with noted untill I tell you that I sent all files`),
  filePartMessage: z.string().default(`{filename} ({partNumber}/{partsCount})\n---\n{content}\n---\nI am still sending files, please reply with "Noted"`),
  endMessage: z.string().default(`I finnished sending files, now I will ask questions`),
  delayBetweenMessages: z.coerce.number().default(5_000),
})
export type Config = z.infer<typeof Config>

export const UserInterface = z.object({
  showSettings: z.boolean().default(false),
  isUploading: z.boolean().default(false),
})
export type UserInterface = z.infer<typeof UserInterface>

export const File = z.object({
  name: z.string(),
  parts: z.array(z.string()),
  sentPartsCount: z.number().default(0),
})
export type File = z.infer<typeof File>

export const State = z.object({
  config: Config.default({}),
  ui: UserInterface.default({}),
  files: z.array(File).default([]),
  errors: z.array(z.coerce.string()).default([]),
})
export type State = z.infer<typeof State>
