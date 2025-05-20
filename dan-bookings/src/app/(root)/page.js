"use client"
import React from 'react';
import '../styles/globals.css'
import Porfolio from "../components/Porfolio";
import {  useWork } from '../hooks/useWork';

export default function Home() {
  // const { getWorks } = useWork()

  // const params = {limit: 3,page:3}

  // const works = getWorks(/**params */)
  return (
    <>
       <Porfolio />
    </>
  );
}
