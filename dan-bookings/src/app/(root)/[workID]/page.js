'use client'
import Link from 'next/link';
import '../../styles/globals.css'
import'../../styles/workDetails.css'
import { useParams } from 'next/navigation';
import { mockPorfolio } from '../../../app/mock/portfolioMockData';
import { PorfolioContextProvider, usePortfolio } from '../../context/PorfolioProvider';
import React from 'react';
import { useWorksIsLoaded } from '../../hooks/useAplicarion';

export default function Work() {
  const {porfolioContext} = usePortfolio();
  const {posMouse} = porfolioContext;

  
  const { workID } = useParams();

  let work = porfolioContext?.works?.find(item => item.id == workID) || [];
  useWorksIsLoaded();

  return (
    
    work &&
    <PorfolioContextProvider>
      
    <div className={`work-main-container work-direccion-${posMouse}`}  >

      <div className={`work-img-container  ${posMouse == 'left' ? 'left' : 'img-right' }`} //TODO: CHECK THIS
        style={{
          viewTransitionName: work.id,
          backgroundImage: `url(${work.url})`
        }} />


      <div className='' style={{
        display:'flex',
        position: 'relative',
        height: '90vh',
        width: '50vw',
      }}><Link href='/'> <img style={{width:'3rem'}} src='X-Icon.png'></img></Link></div>

    </div>
    </PorfolioContextProvider>

  );
}