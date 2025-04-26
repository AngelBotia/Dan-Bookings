'use client'
import React from 'react'
import Link from "next/link";
import { signIn, useSession,signOut } from 'next-auth/react'
import { useGetTranslation } from '../hooks/useApplication';
import { createWork } from '../hooks/usePortfolio';
import { usePortfolio } from '../context/PorfolioProvider';
import { useApplication } from '../context/AplicationProvider';

const NavBar = () => {
  const { data: session } = useSession();
  const { actions:{ booking }} = useGetTranslation();

  const { setPorfolioContext ,porfolioContext:{works}} = usePortfolio();
  const { applicationContext:{ isLoaded },setApplicationContext } = useApplication();



  const createItem = async (event) =>{    
    const randomNumber = Math.random() * 187;
    let work = { WO_NAME:"testing", WO_URL:randomNumber.toString(), WO_IMAGE_URL:'mock-portfolio/swan-angel.png'}
    //CHANGE RANDOM WORK BY FORM DATA
    let newWork = await createWork(work);
    if(!newWork)/*TODO SHOW MODAL*/  return;
    const updateWorks = [...works,newWork]
    setPorfolioContext(prev => ({ ...prev, works:updateWorks }));
    setApplicationContext(prev => ({ ...prev, isLoaded: false }));

  }
  return (
    <nav className='navbar'>
      <h1>Danielito kit kat</h1>
      <div>
      {session?.user ? <button onClick={async () => await signOut()}> SINGOUT</button> 
                     :<button onClick={() => signIn()}> LOGIN</button>}
      {session && <h1>{session.user.name}</h1>}
      <Link href="booking">{booking}</Link>
      </div>

      <button onClick={(event)=>createItem(event)}>Create work</button>
      </nav>
  )
}

export default NavBar