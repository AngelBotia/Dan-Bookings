'use client'
import React from 'react'
import Link from "next/link";
import '../styles/NavBar.css'
import { signIn,signOut } from 'next-auth/react'
import { getUserSession } from '../hooks/useUser';
import { useApplication, getTranslation, useLanguageAPP  } from '../hooks/useApplication'

const NavBar = () => {
  const { user, isAdmin } = getUserSession();
  const { actions:{ booking }} = getTranslation();
  const {languageAPP,setAppLanguage }=useLanguageAPP();

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
      {user && <h1>{user.name}</h1>}
      </div>
    </nav>
  )
}

export default NavBar