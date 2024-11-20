'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button, Input } from '@/components/ui'
import { useRegistrationForm } from '@/features/auth/hooks/use-registration-form'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, UserIcon } from '@/icons'
import { pageRoutes } from '@/shared/config/page-routes'

const RegistrationForm = () => {
  const { handleSubmit, onsubmit, errors, register, loading } =
    useRegistrationForm()

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
      <h2 className='h4 mb-2 text-center'>Create Your Account</h2>
      <p className='mb-4 text-center md:mb-8'>Please enter your details</p>
      <form
        className='flex flex-col gap-6'
        noValidate
        onSubmit={handleSubmit(onsubmit)}>
        <Input
          label='Full Name'
          placeholder='Enter your full name'
          {...register('name')}
          error={errors?.name ? errors.name.message : ''}
          startAdornment={{
            adornment: <UserIcon className='text-muted-foreground' />,
            className: '',
          }}
        />

        <Input
          label='Email'
          placeholder='Enter your email'
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
          placeholder='Enter your password'
          {...register('password')}
          error={errors?.password ? errors.password.message : ''}
          startAdornment={{
            adornment: <KeyIcon className='text-muted-foreground' />,
            className: '',
          }}
          endAdornment={passwordEndAdornment}
        />
        <Button type='submit' className='mt-2 w-full' disabled={loading}>
          Create Account
        </Button>
        <div className='flex flex-col items-center justify-center gap-1'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?
          </p>
          <Link
            href={pageRoutes.login}
            className='text-sm font-semibold transition-all hover:underline'>
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
