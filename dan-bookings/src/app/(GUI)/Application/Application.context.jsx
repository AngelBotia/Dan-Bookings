"use client"
import { SessionProvider } from "next-auth/react";
import { useState,createContext, useContext } from "react";
const ApplicationContext = createContext(null);

export const ApplicationContextProvider = ({ initialLanguage,children }) => {
    const [initialLng, setInitialLng] = useState(initialLanguage);
 
    return (
      <ApplicationContext.Provider value={{initialLanguage,setInitialLng}}>
        <SessionProvider>
            {children}
        </SessionProvider>
      </ApplicationContext.Provider>
    );
}

export const useApplicationContext= () =>{return useContext(ApplicationContext)};
