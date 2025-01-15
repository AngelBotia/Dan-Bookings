'use client'
import { useParams } from 'next/navigation';
import '../../styles/globals.css'
import { mockPorfolio } from '@/app/mock/portfolioMockData';

export default  function Work() {
   const {workID} = useParams();
   const data = mockPorfolio?.find(item => item.id == workID);
    
    
    return (
        
    <img src={data.url}
    style={{viewTransitionName:data.id }}></img>
    );
  }