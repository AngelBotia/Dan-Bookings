import '../../../styles/UI.css'
import React, { useState } from 'react'

export const ToggleHidden = ({children,isOpen = false, onClose}) => {
  return (
    !!isOpen ? 
    <>
    <main 
      className='back-toggle-hidden'
      onClick={()=>onClose()}>
    </main>
    {children}
    </> 
    : null
  )
}
