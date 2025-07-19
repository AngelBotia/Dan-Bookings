"use client"
import { SessionProvider } from "next-auth/react";
export const ApplicationContextProvider = ({ children }) => { 
    return (
      <SessionProvider>
          {children}
      </SessionProvider>
    );
}
