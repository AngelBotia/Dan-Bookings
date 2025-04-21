"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { useLoadAllWorks, useWorksInCache } from '../hooks/usePortfolio';

export default function Home() {
  const works = useWorksInCache() || useLoadAllWorks();
  return (
    <>
      {!!works?.length && <PorfolioImgs works={works} />}
    </>
  );
}
