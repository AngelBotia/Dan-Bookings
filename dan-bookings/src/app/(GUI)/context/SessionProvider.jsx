'use client'
import React, { Children } from 'react'
import { SessionProvider } from "next-auth/react";

const ProviderSession = ({children}) => {
  return (
   <SessionProvider>
       {children}
   </SessionProvider>
  )
}

export default ProviderSession