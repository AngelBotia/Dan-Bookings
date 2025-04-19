"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { useLoadWorks } from '../hooks/usePortfolio';
import { PorfolioContextProvider } from '../context/PorfolioProvider';

export default function Home() {
  const porfolioData = useLoadWorks();
  
  porfolioData.typeOfCollage="collage-default"

  return (
    <>
      {porfolioData &&
      <PorfolioContextProvider>
      <PorfolioImgs porfolio={porfolioData}/>

      </PorfolioContextProvider>
      }
      </>
  );
}
