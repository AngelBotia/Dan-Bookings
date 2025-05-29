import React, { useState } from 'react'

export const ToggleHidden = ({children,isOpen = false, onClose}) => {
  return (
    !!isOpen ? 
    <>
    <main 
        style={{
            width: 'inherit',
            height: '-webkit-fill-available',
            position:'absolute'
        }}
        onClick={()=>onClose()}>
    </main>
    {children}
    </> 
    : null
  )
}
