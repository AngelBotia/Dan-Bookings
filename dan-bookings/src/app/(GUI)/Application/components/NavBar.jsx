'use client'
import React from 'react'
import Link from "next/link";
import '../styles/NavBar.css'
import { signIn,signOut } from 'next-auth/react'
import { useApplication  } from '../application.hook'
import { LanguageSelector } from './LanguageSelector';

const NavBar = () => {
  const { getTranslation, useLanguageAPP,getUserSession } = useApplication()
  const { user, isAdmin } = getUserSession();
  const { actions:{ booking }} = getTranslation();
 
  return (
    <nav className='navbar'>
      <h1>Danielito kit kat</h1>
      <LanguageSelector/>
      <div>
      {user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>}
      {user && <h1 style={{color: isAdmin ? 'darkgoldenrod':'gray'}}>{user.name}</h1>}
      </div>
    </nav>
  )
}

export default NavBar