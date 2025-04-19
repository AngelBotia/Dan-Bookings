import React, { useContext, useEffect, useState } from 'react';
import { useAplication } from '../context/AplicationProvider';
import { usePortfolio } from '../context/PorfolioProvider';




export function useWorksIsLoaded() {
 const { setApplicationContext ,applicationContext} = useAplication();
 const { setPorfolioContext ,porfolioContext} = usePortfolio();
 
  useEffect(() => {
    if(porfolioContext?.works.length)setApplicationContext(prev => ({ ...prev, isLoaded: true }));
  }, []);
}

// export function useCheckFirstVisit() {
//   useEffect(() => {
//     const yaEntro = localStorage.getItem('visited');
//     if (!yaEntro) {
//       console.log('Primera vez que entra el usuario');
//       localStorage.setItem('visited', 'true');
//     }
//   }, []);
// }

// export function useAppTitle(title) {
//   useEffect(() => {
//     document.title = title;
//   }, [title]);
// }
