import { useApplicationContext } from "../context/AplicationProvider";
import { useState, useEffect } from "react";
import { useWorkContext } from "../context/WorkProvider";
import { workService } from '../services/workService'
import equal from 'fast-deep-equal';



export const useWork = () => {
    const { setApplicationContext,applicationContext:{ languageAPP }} = useApplicationContext();
    const { workContext, setWorkContext } = useWorkContext();
    
    const { works , params, lastParams} = workContext;
  
    /**
     * @param {Object} params - Parameters for get all works.
     * @param {number} params.limit - Number of works to return per page.
     * @param {number} params.page - Page number to retrieve.
     * @return {Object[]} Array of works.
    */
    const loadWorks  = async (params={}) => {
        setWorkContext(prev =>({ ...prev ,params}));
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
        let newWork = await workService.createWork(workToSend);
        if(!newWork || newWork.error) throw new Error("TODO: put error with translate");
        
        if(IMAGE_URL) newWork.IMAGE_URL = IMAGE_URL;
        const updateWorks = [...works, newWork];
        setWorkContext(prev =>({ ...prev ,works:updateWorks}));
    };
 
    const editWork = async (workToSend = {}) =>{
      const { IMAGE_URL ,ID_WORK} = workToSend; 

      const newWork = await workService.updateWork(workToSend)
      if(!newWork || newWork.error) throw new Error("TODO: put error with translate");

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
        const hasWorksLoaded = works?.find(work => work.ID_WORK) || null;
        const hasDetailLoaded = works?.find(work => work.detail && !work.ID_WORK)?.detail || null;
        
        if (hasWorksLoaded && equal(params,lastParams)) return;

        let newWorks = await workService.getWorks({...params,languageAPP}) || [];
        
        if(hasDetailLoaded) newWorks = newWorks.map(newWork => {return newWork.URL==hasDetailLoaded.WO_URL ? {...newWork,detail: hasDetailLoaded} : newWork })
        
        setWorkContext(prev =>({ ...prev ,
                                works:newWorks,
                                lastParams: {...params,languageAPP}
                              }));   
      }
          loadData();
    }, [params,languageAPP]);
  
return {
        works,
        setWorkContext,
        loadWorks,
        addWork,
        editWork,
        removeWork
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
  const loadWorkDetail = async (params) => {
     return await  workService.getWorkDetail(params);
  };
  const editWorkDetail = async (newWorkDetail = {}) =>{
   return await workService.updateWorkDetail(newWorkDetail);
  };

  useEffect(() => {
      const loadDetail = async () => {

        const hasDetailInCache = works?.find(work => work.URL == URL)?.detail || null;
        if (!URL || hasDetailInCache) return;

        const newDetail = await loadWorkDetail(params);
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
        loadDetail();
  }, []);

  return {
    detail,
    loadWorkDetail,
    editWorkDetail
  }
}




