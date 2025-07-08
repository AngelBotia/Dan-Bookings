'use client'
import React from 'react';
import Link from 'next/link';
import '../../Shared/styles/globals.css'
import'../../Work/styles/Porfolio/Porfolio.css'
import { useParams } from 'next/navigation';
import { useWorkDetails } from '../../Work/work.hook';

export default function Work() {
  const { URL } = useParams();
  const { detail, updateWorkDetail } = useWorkDetails({URL});
  const mousePos = 'rigth'
  const createMediaExampleTest = () => {
    return detail?.medias?.map(media => {
      const { URL_MEDIA, ID } = media;
      return (
        <div
          key={ID}
          style={{width: "2rem",height: "3rem",margin: "1rem",backgroundColor: "red",backgroundImage:URL_MEDIA}}
        />
      )
    }) || null
  }

  return (
    <>
    {detail &&
    <main className={`work-main-container work-direccion-${mousePos}`}  >
      <h1>{detail.TITLE}</h1>

      <div className={`work-img-container  ${mousePos == 'left' ? 'left' : 'img-right' }`} 
        style={{
          viewTransitionName:  detail.WO_URL,
          backgroundImage: `url(${detail.MAIN_IMG_URL})`
        }} />

      <div className='' style={{display:'flex',position: 'relative',height: '90vh',width: '50vw',}}
      ><Link href='/' > <img style={{width:'3rem'}} src='X-Icon.png'></img></Link></div>
    </main>}
    
    {createMediaExampleTest()}
    
    </>
  );
}