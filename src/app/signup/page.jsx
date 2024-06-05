import React from 'react'

import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import SignupForm from '../component/SignupForm'

const Signup = async () => {

  const session = await getServerSession(authOptions)

  if(session) redirect("/dashboard")

  return (
    <div className='h-screen'>
      <SignupForm />
    </div>
  )
}

export default Signup