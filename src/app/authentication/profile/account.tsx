import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

function account() {
  const { data: session } = useSession()

  return (
    <div className='ml-12'>
      {session && session.user && (
        <h1 className='font-bold text-white text-2xl'>Username : {session.user.name}</h1>
      )}
      <button onClick={() => {signOut()}}>Log Out</button>
    </div>
  )
}

export default account
 