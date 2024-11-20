import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createUser } from '@/features/auth/auth.service'
import {
  RegistrationFormSchema,
  registrationFormSchema,
} from '@/features/auth/validators/registration-form.schema'
import { pageRoutes } from '@/shared/config/page-routes'

export const useRegistrationForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
    mode: 'all',
  })

  const onsubmit = async (data: RegistrationFormSchema) => {
    try {
      setLoading(true)

      // call create-user service
      const user = await createUser({ ...data, role: 'user' })

      if (user) {
        toast.success('User created successfully')
        reset()
        await signIn('credentials', {
          ...user,
          callbackUrl: pageRoutes.home,
        })
      } else {
        toast.error('Failed to create user')
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {
    onsubmit,
    handleSubmit,
    register,
    loading,
    errors,
  }
}
