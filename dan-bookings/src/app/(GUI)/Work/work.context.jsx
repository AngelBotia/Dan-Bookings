"use client"
import React, { createContext, useState } from "react"

export const WorkContext = createContext();


export function useWorkContext(){
  return React.useContext(WorkContext);
}
const WORK_DEFAULT = {
  works: [],
  categories:[],
  params: {
    page: 0,
    // limit: 2
  },
  lastParams:[]
}

export const WorkContextProvider = ({ children }) => { 
    const [workContext, setWorkContext] = useState(WORK_DEFAULT);
    return (
        <WorkContext.Provider value={{ workContext, setWorkContext}}>
          {children}
        </WorkContext.Provider>
      );
}
