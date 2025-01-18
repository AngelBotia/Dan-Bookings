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
