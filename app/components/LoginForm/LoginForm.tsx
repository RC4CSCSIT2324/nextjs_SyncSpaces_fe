'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import schema from '@/lib/schema/login'

export type LoginData = z.infer<typeof schema>

interface LoginFormProps {
  handleLogin: (data: LoginData) => Promise<{ success: boolean, error?: string }>
  redirectTo: string
  registerLink?: string
}

const LoginForm = ({ handleLogin, redirectTo, registerLink } : LoginFormProps) => {
  const router = useRouter()

  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
  })

  const { errors, isSubmitting } = form.formState

  const onSubmit = async (values: LoginData) => {
    const res = await handleLogin(values)

    if (!res.success) {
      form.setError('root', {
        message: res.error ?? 'An unknown error occurred',
      })

      return
    }

    router.push(redirectTo)
  }

  return (
    <Form {...form}>
      {
        errors.root && (
          <Alert variant="destructive" className="my-4">
            <ExclamationTriangleIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{ errors.root.message }</AlertDescription>
          </Alert>
        )
      }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NUS Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="@u.nus.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-end justify-between'>
          {
            registerLink && (
              <span>No account? Register <Link className='underline' href={registerLink}>here</Link>. </span>
            )
          }

          <Button type="submit" disabled={isSubmitting}>
            {
              isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )
            }

            Log in
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
