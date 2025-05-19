"use client"
import React, { createContext, useState } from "react"

export const ApplicationContext = createContext();

export function useApplication(){
  return React.useContext(ApplicationContext)
}

const APPLICATION_DEFAULT={
    languageAPP: "ES"
}
export const ApplicationContextProvider = ({ children }) => { 

    const [applicationContext, setApplicationContext] = useState(APPLICATION_DEFAULT);
   
    return (
        <ApplicationContext.Provider value={{ applicationContext, setApplicationContext}}>
          {children}
        </ApplicationContext.Provider>
      );
}
