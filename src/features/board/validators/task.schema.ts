import { z } from 'zod'

const SubtaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
})

export const TaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  subtasks: z.array(SubtaskSchema),
  status: z
    .string({ message: 'Status is required' })
    .min(1, { message: 'Status is required' }),
})

export type TaskFormInputs = z.infer<typeof TaskSchema>
