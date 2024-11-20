import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  LoginFormSchema,
  loginFormSchema,
} from '@/features/auth/validators/login-form.schema'
import { pageRoutes } from '@/shared/config/page-routes'

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'all',
    defaultValues: {
      email: 'admin@test.com',
      password: 'admin',
    },
  })

  const onsubmit = async (data: LoginFormSchema) => {
    try {
      setLoading(true)

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (res?.status === 200) {
        router.push(pageRoutes.dashboard)
      } else if (res?.status === 401) {
        throw new Error('Invalid credentials')
      } else {
        throw new Error(res?.error || 'Something went wrong')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { handleSubmit, onsubmit, errors, register, loading }
}
