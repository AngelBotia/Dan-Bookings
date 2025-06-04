import { useState, useEffect } from "react";
import { useWorkContext } from "../context/WorkProvider";
import { workService } from '../services/workService'



export const useWork = () => {
    const { workContext, setWorkContext } = useWorkContext();
    const { works , params} = workContext;
  
    /**
     * @param {Object} params - Parameters for get all works.
     * @param {number} params.limit - Number of works to return per page.
     * @param {number} params.page - Page number to retrieve.
     * @return {Object[]} Array of works.
    */
    const loadWorks = (params={}) => {
      try {
         return workService.getWorks(params) || [];
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
    const addWork = async (workToSend = {}) =>{
        const { IMAGE_URL } = workToSend;
        const newWork = await workService.createWork(workToSend);
        if(!newWork) throw new Error('TODO: put error with translate');

        const imgInCache =  IMAGE_URL[0].imgSrc;
        newWork.IMAGE_URL = imgInCache || newWork.IMAGE_URL; 
        if(newWork?.detail) newWork.detail.MAIN_IMG_URL = imgInCache || newWork.IMAGE_URL

        const updateWorks = [...works, newWork];
        setWorkContext(prev =>({ ...prev ,works:updateWorks}));
    };
 
    const editWork = async (workToSend = {}) =>{
      const { IMAGE_URL ,ID_WORK} = workToSend; 

      const lastWork = works.find(work => work.ID_WORK == ID_WORK);
      workToSend.IMAGE_URL = lastWork.IMAGE_URL != IMAGE_URL ? IMAGE_URL : [];

      const newWork = await workService.updateWork(workToSend)
      if(!newWork) throw new Error("TODO: put error with translate");

      const updatePorfolio = works?.map(work =>{ 
        const result = work.ID_WORK == newWork.ID_WORK ? newWork : work;
        return result;
      });

      setWorkContext(prev =>({ ...prev ,works:updatePorfolio}));
    };

    const removeWork = async (workToDelete) =>{
      const {ID_WORK, URL } = workToDelete;
      if(!ID_WORK || !URL) return
      const response = await workService.deleteWork(workToDelete)
      if(!response)  throw new Error('TODO: put error with translate');

      const updatePorfolio = works?.filter(work=>work.ID_WORK != ID_WORK)
                                   .sort((a, b) => a.ORDER_INDEX - b.ORDER_INDEX)
                                   .map((work, index) => ({ ...work, ORDER_INDEX: index + 1 }));

      setWorkContext(prev =>({ ...prev ,works:updatePorfolio}));
    };

    useEffect(() => {

      const loadData = async () => {
        const hasWorksInCache = works?.find(work => work.ID_WORK) || null;
        const detailInCache = works?.find(work => work.detail && !work.ID_WORK)?.detail || null;
        if (hasWorksInCache) return;
          let newWorks = await loadWorks(params);
          if(detailInCache) newWorks = newWorks.map(newWork => {return newWork.URL==detailInCache.WO_URL ? {...newWork,detail: detailInCache} : newWork })
          setWorkContext(prev =>({ ...prev ,works:newWorks}));   
      }
          loadData();
    }, []);
  
return {
        works,
        setWorkContext,
        loadWorks,
        addWork,
        editWork,
        removeWork
      }
};

//TODO EXPORT THIS TO SERVICE
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
          const { WO_URL } = newWorkDetail || {};
          if ( !WO_URL ) return null;
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




