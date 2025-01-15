'use client'
import { useParams } from 'next/navigation';
import '../../styles/globals.css'
import { mockPorfolio } from '@/app/mock/portfolioMockData';

export default function Work() {
  const { workID } = useParams();
  const data = mockPorfolio?.find(item => item.id == workID);

  return (
    data &&
    <div
      style={{
        viewTransitionName: data.id,
        backgroundImage: `url(${data.url})`,
        width: '60vw',
        height: '60vh',
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }} />
  );
}