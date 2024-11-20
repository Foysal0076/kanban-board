import { z } from 'zod'

export const registrationFormSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>
