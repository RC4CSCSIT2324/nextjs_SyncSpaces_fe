'use client'
import Link from 'next/link'

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
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

import schema from '@/lib/schema/register'

export type RegisterData = z.infer<typeof schema>

interface RegisterFormProps {
  handleRegister: (data: RegisterData) => Promise<{ success: boolean, error?: string }>
  redirectTo: string
  loginLink?: string
}

const RegisterForm = ({ handleRegister, redirectTo, loginLink } : RegisterFormProps) => {
  const form = useForm<RegisterData>({
    resolver: zodResolver(schema),
  })

  const { errors, isSubmitting, isSubmitSuccessful } = form.formState

  const onSubmit = async (values: RegisterData) => {
    const res = await handleRegister(values)

    if (!res.success) {
      form.setError('root', {
        message: res.error ?? 'An unknown error occurred',
      })

      return
    }
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

      <AlertDialog open={isSubmitSuccessful}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration successful</AlertDialogTitle>
            <AlertDialogDescription>
              Please check your email for verification before logging in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link href={redirectTo}>Continue</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nusnet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NUSNET ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tele"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


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
            loginLink && (
              <span>Already have an account? Login <Link className='underline' href={loginLink}>here</Link>. </span>
            )
          }

          <Button type="submit" disabled={isSubmitting}>
            {
              isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )
            }

            Register
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
