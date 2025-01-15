import Image from "next/image";
import styles from "../styles/page.module.css";
import '../styles/globals.css'
import PorfolioImgs from "../components/PorfolioImgs";
import { mockPorfolio } from "../mock/portfolioMockData";

export default  async function Home() {
  // const data = await...

 
 
 
 

 
 

 
  return (
    <>
    <PorfolioImgs porfolioData={mockPorfolio}/>
    </>
  );
}
