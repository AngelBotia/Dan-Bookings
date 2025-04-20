'use client'
import React from 'react';
import Link from 'next/link';
import '../../styles/globals.css'
import'../../styles/workDetails.css'
import { useParams } from 'next/navigation';
import { useWorksIsLoaded } from '../../hooks/useApplicarion';
import { usePortfolio } from '../../context/PorfolioProvider';
import { useApplication } from '../../context/AplicationProvider';

export default function Work() {
  const { workID } = useParams();
  const { porfolioContext } = usePortfolio();
  const { applicationContext } = useApplication();
  const { works } = porfolioContext;
  const { posMouse } = applicationContext;

  let {ID_WORK,TITLE,URL,ORDER_INDEX,IMAGE_URL,IS_VISIBLE } = works?.find(workItem => workItem.URL == workID) || [];//TODO: or await getWorkByID()
  useWorksIsLoaded();
  return (
    ID_WORK &&
    <div className={`work-main-container work-direccion-${posMouse}`}  >

      <div className={`work-img-container  ${posMouse == 'left' ? 'left' : 'img-right' }`} 
        style={{
          viewTransitionName: URL,
          backgroundImage: `url(${IMAGE_URL})`
        }} />


      <div className='' style={{
        display:'flex',
        position: 'relative',
        height: '90vh',
        width: '50vw',
      }}><Link href='/'> <img style={{width:'3rem'}} src='X-Icon.png'></img></Link></div>

    </div>
  );
}