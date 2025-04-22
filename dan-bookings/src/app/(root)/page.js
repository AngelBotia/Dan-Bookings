"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { useLoadAllWorks, useWorksInCache } from '../hooks/usePortfolio';

export default function Home() {
  // const params = {limit: 3}
  const works = useWorksInCache() || useLoadAllWorks(/**params*/);
  return (
    <>
      {!!works?.length && <PorfolioImgs works={works} />}
    </>
  );
}
