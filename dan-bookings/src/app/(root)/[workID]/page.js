'use client'
import { useParams, useSearchParams } from 'next/navigation';
import '../../styles/globals.css'
import'../../styles/workDetails.css'
import { mockPorfolio } from '@/app/mock/portfolioMockData';

export default function Work() {
  const { workID } = useParams();
  const searchParams  = useSearchParams();
  const pos = searchParams.get('pos');
  
  const data = mockPorfolio?.works?.find(item => item.id == workID);

  return (
    data &&
    <div className={`work-main-container ${pos == 'right' ? 'work-direccion-right' : 'work-direccion-left'}`}  >

      <div className={`work-img-container ${pos == 'left' && 'img-right'}`}
        style={{
          viewTransitionName: data.id,
          backgroundImage: `url(${data.url})`
        }} />



      <div className='' style={{
        position: 'relative',
        height: '90vh',
        width: '50vw',
      }}><h1>Hola soy el chico de las poesias</h1> <a href='/'> <h1 style={{color:'red'}}>X</h1></a></div>


    </div>

  );
}