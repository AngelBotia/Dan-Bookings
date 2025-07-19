'use client'
import React from 'react'
import Link from "next/link";
import '../styles/NavBar.css'
import { signIn,signOut } from 'next-auth/react'
import { useApplication  } from '../application.hook'

const NavBar = () => {
  const { getTranslation, useLanguageAPP,getUserSession } = useApplication()
  const { user, isAdmin } = getUserSession();
  const { actions:{ booking }} = getTranslation();
 

  const onChangeLanguague = (e) =>{
    const lang = e.currentTarget.value;
    setAppLanguage(lang)
  }

  return (
    <nav className='navbar'>
      <h1>Danielito kit kat</h1>
      <div>
      {user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>}
      {user && <h1 style={{color: isAdmin ? 'darkgoldenrod':'gray'}}>{user.name}</h1>}
      </div>
    </nav>
  )
}

export default NavBar