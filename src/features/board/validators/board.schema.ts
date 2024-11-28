import { z } from 'zod'

export const BoardSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  columns: z
    .array(z.string().min(1, { message: 'Column name is required' }))
    .min(1, { message: 'At least one column is required' }),
  isArchived: z.boolean().optional(),
})

export type BoardFormInputs = z.infer<typeof BoardSchema>

export type BoardUpdateSchemaType = z.infer<typeof BoardSchema> & {
  id: string
  invitees: string[]
}
