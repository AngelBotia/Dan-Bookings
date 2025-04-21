import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PorfolioProvider";


export function useLoadAllWorks() {
  const { setPorfolioContext } = usePortfolio();
  const [loadedWorks, setLoadedWorks] = useState(null);

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
  const { porfolioContext:{works} } = usePortfolio();
  return works?.filter(work => work.ID_WORK).length ? works : null;
}

export function useLoadDetailsWork(urlWork) {
  const { setPorfolioContext ,porfolioContext} = usePortfolio();
  const [loadedDetails, setloadedDetails] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const detailsData = await fetch(`/api/work/${urlWork}`, { method: "GET" });
        const details = await detailsData.json();
        setPorfolioContext(prev => {
          const { works } = prev;
          !works?.find(work =>work.URL == urlWork) && works.push({URL:urlWork,ID_WORK: false});

          const updatedWorks = works?.map(work =>
            work.URL == urlWork ? { ...work, detail: details } : work
          );
        
          return {...prev,works: updatedWorks};
        });
        setloadedDetails(details); 
      } catch (error) {
        console.error("[PORFOLIO WORKS DETAILS CANT LOAD]", error);
      }
    };

    loadData();
  }, []);
  return loadedDetails;
}
export const useDetailsInCache=(urlWork)=>{
  const { porfolioContext:{works} } = usePortfolio();
  return works?.find(work => work.URL == urlWork)?.detail || null
}
