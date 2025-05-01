'use client'
import React from 'react';
import Link from 'next/link';
import '../../styles/globals.css'
import'../../styles/workDetails.css'
import { useParams } from 'next/navigation';
import { usePortfolio } from '../../context/PorfolioProvider';
import { useApplication } from '../../context/AplicationProvider';
import { useWork } from '../../hooks/useWork';

export default function Work() {
  const { detailsInCache, loadWorkDetail }=useWork();
  const { workID } = useParams();
  
  const { applicationContext: { posMouse }} = useApplication();//TODO
  
  const workParams = { workID }
  const detail = detailsInCache(workParams) || loadWorkDetail(workParams);
  
  const createMediaExampleTest = () => {
    return detail?.media?.map(media => {
      const { URL_MEDIA: backgroundImage, ID } = media;
      return (
        <div
          key={ID}
          style={{width: "2rem",height: "3rem",margin: "1rem",backgroundColor: "red",backgroundImage}}
        />
      )
    }) || null
  }

  return (
    <>
    {detail &&
    <div className={`work-main-container work-direccion-${posMouse}`}  >
      <h1>{detail.TITLE}</h1>

      <div className={`work-img-container  ${posMouse == 'left' ? 'left' : 'img-right' }`} 
        style={{
          viewTransitionName:  detail.WO_URL,
          backgroundImage: `url(${detail.MAIN_IMG_URL})`
        }} />

      <div className='' style={{display:'flex',position: 'relative',height: '90vh',width: '50vw',}}
      ><Link href='/' > <img style={{width:'3rem'}} src='X-Icon.png'></img></Link></div>
    </div>}
    
    {createMediaExampleTest()}
    
    </>
  );
}