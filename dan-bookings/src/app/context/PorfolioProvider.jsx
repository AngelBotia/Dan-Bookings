"use client"
import React, { createContext, useState } from "react"

export const PorfolioContext = createContext();


export function usePortfolio(){
  return React.useContext(PorfolioContext);
}

const PORFOLIO_DEFAULT_STATE={
    works:[],
    typeOfCollage:"collage-default"
}
export const PorfolioContextProvider = ({ children }) => { 
    const [porfolioContext, setPorfolioContext] = useState(PORFOLIO_DEFAULT_STATE);

    return (
        <PorfolioContext.Provider value={{ porfolioContext, setPorfolioContext}}>
          {children}
        </PorfolioContext.Provider>
      );
}
