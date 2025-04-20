"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { useAllLoadWorks, useWorksInCache } from '../hooks/usePortfolio';

export default function Home() {
  const works = useWorksInCache() || useAllLoadWorks();
  return (
    <>
      {!!works?.length && <PorfolioImgs works={works} />}
    </>
  );
}
