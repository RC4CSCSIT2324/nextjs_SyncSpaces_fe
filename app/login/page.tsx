import { cookies } from 'next/headers'

import LoginForm, { type LoginData } from '@/app/components/LoginForm/LoginForm'

export default function Login() {
  const login = async ({ email, password } : LoginData) => {
    'use server'

    return fetch(`${process.env.API_ENDPOINT}/token/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: 'no-store',
    }).then((r) => {
      if (r.ok) return r.json()
      throw new Error()
    }).then((token) => {
        cookies().set('token', token, {
          secure: true,
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 60 * 60,
        })
      })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false, error: 'Invalid email or password' }))
  }

  return (
    <main className="flex center items-center justify-center h-screen bg-[#f8f1ef]">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-5 rounded-3xl bg-white">
        <h1 className="text-subheader text-center my-5">Login to SyncSpaces</h1>
        <LoginForm handleLogin={login} redirectTo="/" registerLink="/register" />
      </div>
    </main>
  )
}