'use client'
import React from 'react'
import Link from "next/link";
import { signIn, useSession,signOut } from 'next-auth/react'
import {  getTranslation, useLanguageAPP } from '../hooks/useLanguageAPP';
import { getUserSession } from '../hooks/useUser';

const NavBar = () => {
  const { user, isAdmin } = getUserSession();
  const { actions:{ booking }} = getTranslation();

  return (
    <nav className='navbar'>
      <h1>Danielito kit kat</h1>
      <div>
      {user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>}
      {user && <h1>{user.name}</h1>}
      <Link href="booking">{booking}</Link>
      </div>
    </nav>
  )
}

export default NavBar