import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  
  const user = await currentUser()

  if (!user || !user.id) redirect('/dashboard')
  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  })
  if (!dbUser) redirect('/dashboard')
  return <Dashboard />
}
