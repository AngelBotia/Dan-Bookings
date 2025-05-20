"use client"
import React, { createContext, useState } from "react"

export const WorkContext = createContext();


export function useWorkContext(){
  return React.useContext(WorkContext);
}
const WORK_DEFAULT = {
  works: [],
  page: 0
}
export const WorkContextProvider = ({ children }) => { 
    const [works, setWorkContext] = useState();
    return (
        <WorkContext.Provider value={{ works, setWorkContext}}>
          {children}
        </WorkContext.Provider>
      );
}
