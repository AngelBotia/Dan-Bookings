import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PorfolioProvider";

/**
 * @param {Object} params - Parameters for get all works.
 * @param {number} params.limit - Number of works to return per page.
 * @param {number} params.page - Page number to retrieve.
 * @return {Object[]} Array of works.
 */
export function useLoadAllWorks(params) {
  const { setPorfolioContext, porfolioContext } = usePortfolio();
  const [loadedWorks, setLoadedWorks] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const searchParams = params ? new URLSearchParams(params) : "";
        const worksData = await fetch(`/api/work?${searchParams}`, {method: "GET"});
        const worksJson = await worksData.json();
        const lastDetails = porfolioContext?.works?.find(work=> !work.ID_WORK && work.URL) || [];
        const works = worksJson?.map(work=> lastDetails.URL == work.URL ? {...work, detail: lastDetails.detail} : work);
        setPorfolioContext(prev => ({ ...prev, works }));
        setLoadedWorks({ works });
      } catch (error) {
        //TODO: SHOW ERROR MODAL
        console.error("[PORFOLIO WORKS CANT LOAD]", error);
      }
    };

    loadData();
  }, []);
  return loadedWorks;
}
export const useWorksInCache=()=>{
  const { porfolioContext:{works} } = usePortfolio();
  return !works.error && works?.filter(work => work?.ID_WORK).length ? works : null;
}
/**
 * @param {Object} work - Object to create work
 * @param {string} work.WO_NAME - Title of work.
 * @param {string} work.WO_URL - url of work UNIQUE.
 * @param {string} work.WO_ORDER - order to view in porfolio.
 * @param {string} work.WO_IMAGE_URL - url main IMG of work.
 * @return {Object} new work.
 * 
 */
export const createWork = async (work) =>{
  try {
    if(!work) return null
    let body = JSON.stringify(work);
    const dataWork = await fetch(`/api/work`, { method: "POST",body});
    const newWork = await dataWork.json();
    return newWork;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/**
 * @param {Object} params - Parameters for get details
 * @param {string} params.workID - Number of works to return per page.
 */
export function useLoadDetailsWork(params) {
  const { setPorfolioContext ,porfolioContext} = usePortfolio();
  const [loadedDetails, setloadedDetails] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        let { workID } = params;
        const searchParams = params ? new URLSearchParams(params) : "";
        const detailsData = await fetch(`/api/work/${workID}?${searchParams}`, { method: "GET" });
        const details = await detailsData.json();
        setPorfolioContext(prev => {
          const { works } = prev;
          !works?.find(work =>work.URL == workID) && works.push({URL:workID,ID_WORK: false});

          const updatedWorks = works?.map(work =>
            work.URL == workID ? { ...work, detail: details } : work
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
export const useDetailsInCache=(params)=>{
  let { workID } = params;
  const { porfolioContext:{works} } = usePortfolio();
  return works?.find(work => work.URL == workID)?.detail || null
}
