import React, { useRef, useState } from 'react'
import { useWork } from '../hooks/useWork';
import { useLanguageAPP } from '../hooks/useLanguageAPP';
import { InputImgs,InputText } from './Inputs';

export const PorfolioForm = ({/*onSubmit*/work={} }) => {
    const { createWork } = useWork();
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

    const onSubmit = async (e) =>{
        e.preventDefault();    
        let { workName, files } = formData || {};
    
        let newWork = await createWork(workName,files);
        if(!newWork) return;//TODO SHOW ERROR MODAL
        setFormData({})
        e.target.reset(); 
        //CLOSE FORM
    }
  return (
    <form onSubmit={(e)=>onSubmit(e)}>
        <InputText 
            form={formState} 
            name={"workName"} 
            label={labels["title"]} 
            title={errorMessages["title"] } 
            required={true}/>
    
        <InputImgs
           form={formState}
           name={"files"}
           required={true}
        />
        <button type='submit'>Submit</button>
    </form>
    )
}
