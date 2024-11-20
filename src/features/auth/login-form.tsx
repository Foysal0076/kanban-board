'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button, Input } from '@/components/ui'
import { useLoginForm } from '@/features/auth/hooks/use-login-form'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@/icons'
import { pageRoutes } from '@/shared/config/page-routes'

const LoginForm = () => {
  const { handleSubmit, onsubmit, errors, register, loading } = useLoginForm()

  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password'
  )

  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const passwordEndAdornment = useMemo(() => {
    return passwordType === 'password'
      ? {
          adornment: (
            <EyeIcon
              className='cursor-pointer text-muted-foreground transition-colors hover:text-primary'
              onClick={togglePasswordVisibility}
            />
          ),
        }
      : {
          adornment: (
            <EyeSlashIcon
              className='cursor-pointer text-muted-foreground transition-colors hover:text-primary'
              onClick={togglePasswordVisibility}
            />
          ),
        }
  }, [passwordType])

  return (
    <div className='card mx-auto w-full max-w-lg p-6 md:p-8'>
      <h2 className='h4 mb-2 text-center'>Login to Your Account</h2>
      <p className='mb-8 text-center'>Please enter your credentials</p>
      <form
        className='flex flex-col gap-6'
        noValidate
        onSubmit={handleSubmit(onsubmit)}>
        <Input
          label='Email'
          placeholder='admin@test.com'
          {...register('email')}
          error={errors?.email ? errors.email.message : ''}
          startAdornment={{
            adornment: <EnvelopeIcon className='text-muted-foreground' />,
            className: '',
          }}
        />
        <Input
          type={passwordType}
          label='Password'
          placeholder='admin'
          {...register('password')}
          error={errors?.password ? errors.password.message : ''}
          startAdornment={{
            adornment: <KeyIcon className='text-muted-foreground' />,
            className: '',
          }}
          endAdornment={passwordEndAdornment}
        />
        <Button type='submit' className='mt-2 w-full' disabled={loading}>
          Login
        </Button>

        <div className='flex flex-col items-center justify-center gap-1'>
          <p className='text-sm text-muted-foreground'>
            Don&apos;t have an account?
          </p>
          <Link
            href={pageRoutes.register}
            className='text-sm font-semibold hover:underline'>
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
