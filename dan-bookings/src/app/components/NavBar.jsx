'use client'
import React from 'react'
import Link from "next/link";
import { signIn, useSession,signOut } from 'next-auth/react'
import {  useLanguageAPP } from '../hooks/useLanguageAPP';

const NavBar = () => {
  const { data: session } = useSession();
  const{ getTranslation } =  useLanguageAPP();
  const { actions:{ booking }} = getTranslation();

  return (
    <nav className='navbar'>
      <h1>Danielito kit kat</h1>
      <div>
      {session?.user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>}
      {session && <h1>{session.user.name}</h1>}
      <Link href="booking">{booking}</Link>
      </div>
    </nav>
  )
}

export default NavBar