import { z } from 'zod'

const ColumnSchema = z.object({
  title: z.string().min(1, { message: 'Column name is required' }),
  color: z.string().min(1, { message: 'Column color is required' }),
  isDisabled: z.boolean().optional(),
})

export const BoardSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  columns: z
    .array(ColumnSchema)
    .min(1, { message: 'At least one column is required' }),
  isArchived: z.boolean().optional(),
})

export type BoardFormInputs = z.infer<typeof BoardSchema>

export type BoardUpdateSchemaType = z.infer<typeof BoardSchema> & {
  id: string
  invitees: string[]
}
