import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PorfolioProvider";
import { useWorkContext } from "../context/WorkProvider";




export const useWork = () => {
    const { workContext, setWorkContext } = useWorkContext();
    const { works , params} = workContext;
  
    /**
     * @param {Object} params - Parameters for get all works.
     * @param {number} params.limit - Number of works to return per page.
     * @param {number} params.page - Page number to retrieve.
     * @return {Object[]} Array of works.
    */
    const getWorks = async (params={}) => {
      try {
        const searchParams = params ? new URLSearchParams(params) : "";
        const worksData = await fetch(`/api/work?${searchParams}`, { method: "GET" });
        const worksJson = await worksData.json() || [];
        return worksJson;
      } catch (error) {
        return null;
      }
    };
    /**
       * @typeOf {Object} work - Work Object
       * @property {string} work.WO_NAME - Name of the work (required).
       * @property {string} work.IMAGE_URL - Image URL of the work (required).
       * @property {string} work.URL - URL OF WORK.
       * @property {number} work.IS_VISIBLE    - Visibility 1 -> true : 0 -> false.
       *
       * @property {Object[]} work.IMAGE_URL -Array of files
       * @property {String} IMAGE_URL.img - Buffer img in base64
       * @property {String} IMAGE_URL.type - format of img PNG,JPG...
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

    const deleteWork = async ({ID_WORK,URL}) =>{
      try {
        if(!ID_WORK || !URL) return null;
        const body = new FormData();      
        body.append("ID",JSON.stringify(ID_WORK));
        body.append("URL",JSON.stringify(URL));
        const workToDelete = await fetch(`/api/work`, { method: "DELETE",body });
        const deletedWork = await workToDelete.json();
        return deletedWork || null;
      } catch (error) {
        return null;
      }
    };
    useEffect(() => {

      const loadData = async () => {
        const hasWorksInCache = works?.find(work => work.ID_WORK) || null;
        const detailInCache = works?.find(work => work.detail && !work.ID_WORK)?.detail || null;
        if (hasWorksInCache) return;
          let newWorks = await getWorks(params);
          if(detailInCache) newWorks = newWorks.map(newWork => {return newWork.URL==detailInCache.WO_URL ? {...newWork,detail: detailInCache} : newWork })
          setWorkContext(prev =>({ ...prev ,works:newWorks}));   
        }
          loadData();
    }, []);
  
return {
        works,
        getWorks,
        createWork,
        updateWork,
        deleteWork
      }
};

export const useWorkDetails = (params = {}) => {
  const { workContext, setWorkContext } = useWorkContext();
  const { works } = workContext;
  const { URL } = params || {};
  const detail = works?.find(work => work.URL == URL)?.detail || {};
  /**  
     * @param {Object} params - Parameters for get details
     * @param {string} params.workID - WorkURL.
  */
  const getWorkDetail = async (params) => {
        try {
            const { URL } = params || {};
            if(!URL) return null; 
            const searchParams = params ? new URLSearchParams(params) : "";
            const detailData = await fetch(`/api/work/${URL}?${searchParams}`, { method: "GET" });
            const detail = await detailData.json();
            return detail;
        } catch (error) {
          return null;
        }
  };
  const updateWorkDetail = async (newWorkDetail = {}) =>{
        try {
          const { WO_URL,DETAIL_ID } = newWorkDetail || {};
          if ( !WO_URL || !DETAIL_ID ) return null;
          const body = new FormData();      
          body.append("newDetail",JSON.stringify(newWorkDetail));
  
          const detailToUpdate = await fetch(`/api/work/${WO_URL}`, { method: "PUT", body });
          const updatedDetail = await detailToUpdate.json();
          
          return updatedDetail;
        } catch (error) {
          return null;
        }
  };

  useEffect(() => {
      const loadWorkDetail = async () => {

        const hasDetailInCache = works?.find(work => work.URL == URL)?.detail || null;
        if (!URL || hasDetailInCache) return;

        const newDetail = await getWorkDetail(params);
        setWorkContext(prev => {
                 const { works } = prev;
                 const hasWorkInCache = works?.find(work =>work.URL == URL)
                 if(!hasWorkInCache) works.push({URL:URL,ID_WORK: false});

                 const updatedWorks = works?.map(work =>
                  work.URL == URL ? { ...work, detail: newDetail } : work
                );
              
                return {...prev,works: updatedWorks};
          }) 
        }
        loadWorkDetail();
  }, []);

  return {
    detail,
    getWorkDetail,
    updateWorkDetail
  }
}




