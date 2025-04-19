import React, { useState, useEffect, useContext } from "react";
import { mockPorfolio,typeOfCollage } from "../mock/portfolioMockData";
import { usePortfolio } from "../context/PorfolioProvider";


export function useLoadWorks() {
  const { porfolioContext,setPorfolioContext } = usePortfolio();
  const [loadedWorks, setLoadedWorks] = useState({});
  useEffect(() => {
    const loadData = () => {
      try {
        // TODO: replace with fetch
        const works = mockPorfolio;
        setPorfolioContext(prev => ({ ...prev, works, typeOfCollage }));
        setLoadedWorks({works, typeOfCollage });
      } catch (error) {
        console.error("[PORFOLIO WORKS CANT LOAD]", error);
      }
    };

    loadData();
  }, []);
  return loadedWorks; 
}
