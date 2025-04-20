"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { useLoadWorks, useWorksInCache } from '../hooks/usePortfolio';

export default function Home() {
  const works = useWorksInCache() || useLoadWorks();
  return (
    <>
      {!!works?.length && <PorfolioImgs works={works} />}
    </>
  );
}
