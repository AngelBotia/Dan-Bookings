import { useState, useEffect } from "react";
import { typeOfCollage } from "../mock/portfolioMockData";
import { usePortfolio } from "../context/PorfolioProvider";


export function useLoadWorks() {
  const { setPorfolioContext } = usePortfolio();
  const [loadedWorks, setLoadedWorks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const worksData = await fetch("/api/work", { method: "GET" });
        const works = await worksData.json();
        setPorfolioContext(prev => ({ ...prev, works }));
        setLoadedWorks({ works });
      } catch (error) {
        console.error("[PORFOLIO WORKS CANT LOAD]", error);
      }
    };

    loadData();
  }, []);
  return loadedWorks;
}
export const useWorksInCache=()=>{
  const { porfolioContext } = usePortfolio();
  return porfolioContext?.works?.length ? porfolioContext.works : null;
}
