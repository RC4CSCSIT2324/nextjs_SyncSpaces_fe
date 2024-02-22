'use client'

import { useState } from 'react'

import useFileInput from 'use-file-input'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface ProfileProps {
  user: {
    avatar: string | null,
    name: string,
    tele: string,
    nusnet: string,
    role: string,
  }
  editUser: (data: FormData) => Promise<boolean>
}

const avatarPlaceholder = 'https://source.boringavatars.com/beam/192?colors=264653,2a9d8f,e9c46a,f4a261,e76f51'

const Profile = ({ user, editUser } : ProfileProps) => {
  const [editing, setEditing] = useState<{ name: string, target: string, value: string, loading?: boolean } | null>(null)

  const handleSetAvatar = useFileInput((files) => {
    const data = new FormData()
    data.append('profile_pic', files[0])

    editUser(data).then((success) => success && location.reload())
  }, { accept: 'image/*' })

  const handleSetField = () => {
    if (!editing) return

    setEditing({ ...editing, loading: true })

    const data = new FormData()
    data.append(editing.target, editing.value)

    editUser(data).then((success) => success && location.reload())
  }

  return (
    <div className="px-12 py-4 rounded-3xl bg-white">
      <h1 className="text-subheader">User Profile</h1>
      <div className="flex gap-x-8 mt-6">
        <div className="flex flex-col items-center">
          <img src={user.avatar ?? avatarPlaceholder} className="m-6 w-48 h-48 rounded-full" />
          <Button variant="link" onClick={handleSetAvatar}>Edit Profile Picture</Button>
        </div>
        <div className="grow">
          <p className="px-4 text-gray-700 font-medium uppercase">Telegram Handle</p>
          <div className="flex items-center px-4 py-3 rounded-xl bg-gray-200">
            <span className="grow uppercase font-bold">{ user.tele }</span>
            <Button variant="link" className="h-0 p-0" onClick={() => setEditing({ name: 'Telegram Handle', target: 'tele_handle', value: user.tele })}>Edit</Button>
          </div>
          <p className="px-4 text-gray-700 font-medium uppercase mt-3">Display name</p>
          <div className="flex items-center px-4 py-3 rounded-xl bg-gray-200">
            <span className="grow uppercase font-bold">{ user.name }</span>
            <Button variant="link" className="h-0 p-0" onClick={() => setEditing({ name: 'Name', target: 'name', value: user.name })}>Edit</Button>
          </div>
          <p className="px-4 text-gray-700 font-medium uppercase mt-3">NUSNET ID</p>
          <div className="px-4 py-3 rounded-xl bg-gray-200">
            <span className="uppercase font-bold">{ user.nusnet }</span>
          </div>
          <p className="px-4 text-gray-700 font-medium uppercase mt-3">Role</p>
          <div className="px-4 py-3 rounded-xl bg-gray-200">
            <span className="uppercase font-bold">{ user.role }</span>
          </div>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="profile-input">{ editing?.name }</Label>
            <Input type="text" id="profile-input" value={editing?.value} onChange={(e) => editing && setEditing({ ...editing, value: e.currentTarget.value })} />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSetField} disabled={editing?.loading}>
              {
                editing?.loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )
              }

              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Profile
