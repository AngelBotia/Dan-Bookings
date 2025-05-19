import React, { useRef, useState } from 'react'
import { useWork } from '../hooks/useWork';
import { useLanguageAPP } from '../hooks/useLanguageAPP';
import { InputImgs,InputText } from './Inputs';
import { usePortfolio } from '../context/PorfolioProvider';

export const PorfolioForm = ({work={} }) => {
    const { createWork, updateWork , deleteWork } = useWork();
    const { setPorfolioContext, porfolioContext:{ works } } = usePortfolio();
    

    const { getTranslation }= useLanguageAPP();
    const {
        errors: {
            workForm: errorMessages
        },
        application: {
            workForm: labels
        } 
     } = getTranslation();
      
    const formState = useState(work);
    const [formData ,setFormData] = formState;


    const addWorkInPorfolio = async (workToSend) =>{
        const { IMAGE_URL } = workToSend;
        const newWork = await createWork(workToSend);
        if(!newWork) return //TODO: SHOW MODAL

        const imgInCache =  IMAGE_URL[0].imgSrc;
        newWork.IMAGE_URL = imgInCache || newWork.IMAGE_URL; 
        if(newWork?.detail) newWork.detail.MAIN_IMG_URL = imgInCache || newWork.IMAGE_URL
    
        const updateWorks = [...works, newWork];
        setPorfolioContext(prev => ({ ...prev, works: updateWorks,isLoaded: false  }));
        return newWork;
    }
    const updateWorkInPorfolio = async (workToSend) =>{
        const newWork = await updateWork(workToSend)
        if(!newWork) return null; //TODO: SHOW MODAL
        const updatePorfolio = works?.map(work =>{ 
          const result = work.ID_WORK == newWork.ID_WORK ? newWork : work;
          return result;
        });
        setPorfolioContext(prev => ({ ...prev, works: updatePorfolio }));
        return newWork;
    }
    const deleteWorkInPorfolio = async ({ID_WORK}) =>{
        if(!ID_WORK) return
        const response = await deleteWork(ID_WORK)
        if(!response) return;//TODO: SHOW MODAL
        const updatePorfolio = works?.filter(work=>work.ID_WORK != ID_WORK);
        setPorfolioContext(prev => ({ ...prev, works: updatePorfolio }));
        return response;
    }
    const onSubmit = async (e) =>{
        e.preventDefault();    
        const { ID_WORK } = work || {};
        let   { WO_NAME, IMAGE_URL,ORDER_INDEX,IS_VISIBLE } = formData || {};

        const workToSend = {
            ...work,
               WO_NAME,
               IS_VISIBLE,
               ORDER_INDEX,
               IMAGE_URL: IMAGE_URL != work?.IMAGE_URL ? IMAGE_URL : null
          }

        let response = ID_WORK ? await updateWorkInPorfolio(workToSend)
                               : await addWorkInPorfolio(workToSend);
        if(!response) return;

        setFormData({})
        e.target.reset(); 
        //CLOSE FORM
    }

  return (
    <form onSubmit={(e)=>onSubmit(e)}>
        <InputText 
            form={formState} 
            name={"WO_NAME"} 
            label={labels["title"]} 
            title={errorMessages["title"] } 
            required={true}/>
    
        <InputImgs
           form={formState}
           imgsForm={[formData.IMAGE_URL]}
           name={"IMAGE_URL"}
           required={true}
        />
        {/* {work?.ID_WORK &&

        <>
        <InputText 
          form={formState} 
          name={"ORDER_INDEX"} 
          label={labels["title"]} 
          title={errorMessages["title"] } 
          required={false}/>

          <InputText 
          form={formState} 
          name={"IS_VISIBLE"} 
          label={labels["title"]} 
          title={errorMessages["title"] } 
          required={false}/>
            
        
        
        
        </>
        } */}
        <button 
        type='button'
        disabled={!work.ID_WORK}
        style={{backgroundColor:'dark-red'}}
        onClick={async (e)=> await deleteWorkInPorfolio(work)}
        > BORRAR</button>
        <button type='submit'>Submit</button>
    </form>
    )
}
