import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PorfolioProvider";
import { useApplication } from "../context/AplicationProvider";
import { WO_DB_PROPS } from "../constants/worksDB";




export const useWork = () => {
  const { setPorfolioContext, porfolioContext } = usePortfolio();
  const { setApplicationContext } = useApplication();
  
/**
 * @param {Object} params - Parameters for get all works.
 * @param {number} params.limit - Number of works to return per page.
 * @param {number} params.page - Page number to retrieve.
 * @return {Object[]} Array of works.
 */
  const loadAllWorks = (params) => {
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
      }
    };

    loadData();
  }, []);
  return loadedWorks;
  };
  const worksInCache = (params)=>{
    const { porfolioContext:{works} } = usePortfolio();
    return !works.error && works?.filter(work => work?.ID_WORK).length ? works : null;
  };

/**
 * @param {string} workName - URL OF WORK.
 * @param {Object[]} files -Array of files
 * @param {String} files.img - Buffer img in base64
 * @param {String} files.type - format of img PNG,JPG...
 * @return {Object} New work.
*/
  const createWork = async (workName,files) => {
    if (!workName,!files?.length) return null;

    try {
      const { works } = porfolioContext;

      const formData = new FormData();
      formData.append('name',JSON.stringify(workName));

      const filesToSend = files?.map(file => {
         let {img,type}=file || {};
         return { img, type }
      })
      formData.append("files",JSON.stringify(files));

      const dataWork = await fetch(`/api/work`, { method: "POST", body:formData });
      const newWork = await dataWork.json();
      if(!newWork) return null;

      const imgInCache =  files[0].imgSrc;
      newWork.IMAGE_URL = imgInCache || newWork.IMAGE_URL; 
      if(newWork?.detail) newWork.detail.MAIN_IMG_URL = imgInCache ||newWork.IMAGE_URL

      const updateWorks = [...porfolioContext.works, newWork];
      setPorfolioContext(prev => ({ ...prev, works: updateWorks }));

      setApplicationContext(prev => ({ ...prev, isLoaded: false }));
      return newWork;
    } catch (error) {
      return null;
    }
  };
  /**
 * @param {Object} params - Parameters for get details
 * @param {string} params.workID - WorkURL.
 */
  const loadWorkDetail = (params) => {
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
        return null;
        // console.error("[PORFOLIO WORKS DETAILS CANT LOAD]", error);
      }
    };

    loadData();
  }, []);
  return loadedDetails;
  };
  const detailsInCache = (params)=>{
    let { workID } = params;
    const { porfolioContext:{works} } = usePortfolio();
    return works?.find(work => work.URL == workID)?.detail || null
  };
  
  return {
           createWork,
           loadAllWorks,
           worksInCache,
           loadWorkDetail,
           detailsInCache
         };
};



