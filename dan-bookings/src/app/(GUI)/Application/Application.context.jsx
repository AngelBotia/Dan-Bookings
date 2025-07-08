"use client"
import { SessionProvider } from "next-auth/react";
import React, { createContext, useState } from "react"
import { DEFAULT_LNG_APP } from "../Application/application.constant"

export const ApplicationContext = createContext();

export function useApplicationContext(){
  return React.useContext(ApplicationContext)
}

const APPLICATION_DEFAULT={
    languageAPP: DEFAULT_LNG_APP,
    editMode: false,
}


export const ApplicationContextProvider = ({ children }) => { 
  
  const [applicationContext, setApplicationContext] = useState(APPLICATION_DEFAULT);
  
    return (
      <SessionProvider>
        <ApplicationContext.Provider value={{ applicationContext, setApplicationContext}}>
          {children}
        </ApplicationContext.Provider>
      </SessionProvider>
      );
}
