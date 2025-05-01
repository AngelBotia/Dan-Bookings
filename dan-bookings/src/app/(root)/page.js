"use client"
import React from 'react';
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import {  useWork } from '../hooks/useWork';

export default function Home() {
  const { worksInCache , loadAllWorks } = useWork()
  const params = {limit: 3,page:3}
  const works = worksInCache() || loadAllWorks(/*params*/);
  return (
    <>
      {!!works?.length && <PorfolioImgs works={works} />}
    </>
  );
}
