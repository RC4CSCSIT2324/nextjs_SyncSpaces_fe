import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Profile from '@/app/components/Profile/Profile'

async function getUser() {
  try {
    const user = await fetch(`${process.env.API_ENDPOINT}/user/userProfile`, {
      headers: {
        'Authorization': `Bearer ${cookies().get('token')?.value}`
      },
      cache: 'no-store',
    }).then((r) => {
      if (r.ok) return r.json()
      throw new Error()
    }).then((profile) => ({
      avatar: profile.profile_pic_url as string | null,
      name: profile.name as string,
      tele: profile.tele_handle as string,
      nusnet: profile.nus_net_id as string,
      role: ['', 'Student', 'Leader', 'Admin'][profile.admin_level] ?? '',
    }))

    return user
  } catch (e) {
    return null
  }
}

async function editUser(body: FormData) {
  'use server'

  return fetch(`${process.env.API_ENDPOINT}/user/editUserProfile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${cookies().get('token')?.value}`
    },
    body,
    cache: 'no-store',
  }).then((r) => {
    if (!r.ok) throw new Error()
  }).then(() => true)
    .catch((e) => false)
}

export default async function Account() {
  const user = await getUser()
  if (!user) redirect('/login')

  return (
    <main className="container py-5">
      <Profile user={user} editUser={editUser} />
    </main>
  )
}
