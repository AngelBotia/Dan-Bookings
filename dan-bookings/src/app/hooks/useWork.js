import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PorfolioProvider";
import { useWorkContext } from "../context/WorkProvider";




export const useWork = (params = {}) => {
    const { works, setWorkContext } = useWorkContext();
  
    /**
     * @param {Object} params - Parameters for get all works.
     * @param {number} params.limit - Number of works to return per page.
     * @param {number} params.page - Page number to retrieve.
     * @return {Object[]} Array of works.
    */
  const getWorks = async (params) => {
    try {
      if (works?.length) return;
      const searchParams = params ? new URLSearchParams(params) : "";
      const worksData = await fetch(`/api/work?${searchParams}`, { method: "GET" });
      const worksJson = await worksData.json() || [];
      return worksJson;
    } catch (error) {
      return null;
    }
  };
    useEffect(() => {
      const loadData = async () => {
        const newWorks = await getWorks(params);
        setWorkContext(newWorks);   
      }
        loadData();
    }, []);
  /**
     * @param {string} workName - URL OF WORK.
     * @param {Object[]} files -Array of files
     * @param {String} files.img - Buffer img in base64
     * @param {String} files.type - format of img PNG,JPG...
     * @return {Object} New work.
  */
  const createWork = async (work) => {
    const { WO_NAME, IMAGE_URL } = work;
    if (!WO_NAME || !IMAGE_URL?.length) return null;
    
    try {
      const imgsToSend = IMAGE_URL?.map(file => {
        const { img, type } = file;
        return { img, type }
      })
      const body = new FormData();
      body.append('work',JSON.stringify({WO_NAME,IMAGE_URL:imgsToSend}));
      
      const dataWork = await fetch(`/api/work`, { method: "POST", body });
      const newWork = await dataWork.json();
      return newWork;
    } catch (error) {
      return null;
    }
  };
  
  const updateWork = async (newWork = {}) => {
    try {
      if ( !newWork?.ID_WORK ) return null;
      
      const body = new FormData();      
      body.append("newWork",JSON.stringify(newWork));
      
      const workToUpdate = await fetch(`/api/work`, { method: "PUT", body });
      const updatedWork = await workToUpdate.json();
      
      return updatedWork;
    } catch (error) {
      console.error(error)
      return null;
    }
  };
  
  const deleteWork = async (ID) =>{
    if(!ID) return null;
    try {
      const body = new FormData();      
      body.append("ID",JSON.stringify(ID));
      const workToDelete = await fetch(`/api/work`, { method: "DELETE",body });
      const deletedWork = await workToDelete.json();
      return deletedWork || null;
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
      }
    };
    
    loadData();
  }, []);
  return loadedDetails;
};
const detailsInCache = (params)=>{
  let { workID } = params || {};
  const { porfolioContext:{works} } = usePortfolio();
  return works?.find(work => work.URL == workID)?.detail || null
};
const getWorkDetail = (params) => {
  return detailsInCache(params) || loadWorkDetail(params)
} 

return {
  works,
  getWorks,
  createWork,
  updateWork,
  deleteWork,
  
  getWorkDetail
  }
};



