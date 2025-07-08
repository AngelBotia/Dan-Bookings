"use client"
import '../Shared/styles/globals.css'
import Porfolio from "../Work/components/Porfolio";
import { MenuCards } from "../Work/components/MenuCards"
export default function Home() {

  return (
    <>
      <Porfolio />
      <MenuCards/>       
    </>
  );
}
