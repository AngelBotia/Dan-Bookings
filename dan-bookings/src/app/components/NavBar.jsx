'use client'
import React from 'react'
import Link from "next/link";
import { signIn, useSession,signOut } from 'next-auth/react'
import Logo from './Logo';

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className='navbar'>
      <Logo/>
      <div>
      {session?.user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>
      }
      {session && <h1>{session.user.name}</h1>}
      <Link href="booking">RESERVA</Link>
      </div>


      </nav>
  )
}

export default NavBar