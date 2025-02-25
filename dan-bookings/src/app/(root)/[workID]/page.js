'use client'
import Link from 'next/link';
import '../../styles/globals.css'
import'../../styles/workDetails.css'
import { useParams, useSearchParams } from 'next/navigation';
import { mockPorfolio } from '../../../app/mock/portfolioMockData';

export default function Work() {
  const { workID } = useParams();
  const searchParams  = useSearchParams();
  const pos = searchParams.get('pos'); //TODO:change this when using REDUX


  const work = mockPorfolio?.works?.find(item => item.id == workID); //change this for response api

  return (
    work &&
    <div className={`work-main-container work-direccion-${pos == 'right' ? 'right' : 'left' }`}  >

      <div className={`work-img-container  ${pos == 'right' ? 'left' : 'img-right' }`}
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

  );
}