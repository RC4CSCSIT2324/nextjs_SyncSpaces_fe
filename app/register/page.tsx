import { cookies } from 'next/headers'

import RegisterForm, { type RegisterData } from '@/app/components/RegisterForm/RegisterForm'

export default function Register() {
  const register = async ({ name, nusnet, tele, email, password } : RegisterData) => {
    'use server'

    const body = new FormData()
    body.append('name', name)
    body.append('nus_net_id', nusnet.toUpperCase())
    body.append('tele_handle', tele)
    body.append('email', email)
    body.append('password', password)

    return fetch(`${process.env.API_ENDPOINT}/user/createUser`, {
      method: 'POST',
      body,
      cache: 'no-store',
    }).then((r) => {
      if (!r.ok) throw new Error()
    }).then(() => ({ success: true }))
      .catch(() => ({ success: false, error: 'An error occurred' }))
  }

  return (
    <main className="flex center items-center justify-center h-screen bg-[#f8f1ef]">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-5 rounded-3xl bg-white">
        <h1 className="text-subheader text-center my-5">Register</h1>
        <RegisterForm handleRegister={register} redirectTo="/login" loginLink="/login" />
      </div>
    </main>
  )
}
