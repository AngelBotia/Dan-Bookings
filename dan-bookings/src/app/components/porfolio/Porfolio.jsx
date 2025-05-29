import React,{ useState } from 'react';
import '../../styles/porfolio/Porfolio.css'
import '../../styles/globals.css'
import { ContHorizonalScroll } from '../UI/containers/ContHorizonalScroll';
import { getUserSession } from '../../hooks/useUser';
import { useWork } from '../../hooks/useWork';
import { getTranslation, useLanguageAPP } from '../../hooks/useLanguageAPP';
import { PorfolioForm } from './PorfolioForm'
import { PorfolioImgs } from './PorfolioImgs'




const Porfolio = () => {  
  const { porfolio } = getTranslation();
  const { errorMessages, labels } = porfolio || {};

  const { works,setWorkContext, getWorks, createWork, updateWork , deleteWork } = useWork();
  const { user, isAdmin } = getUserSession();

  const formState = useState({});
  const [formData ,setFormData] = formState;
  
  
  const addWorkInPorfolio = async (workToSend = {}) =>{
      const { IMAGE_URL } = workToSend;
      const newWork = await createWork(workToSend);
      if(!newWork) throw new Error('TODO: put error with translate');

      const imgInCache =  IMAGE_URL[0].imgSrc;
      newWork.IMAGE_URL = imgInCache || newWork.IMAGE_URL; 
      if(newWork?.detail) newWork.detail.MAIN_IMG_URL = imgInCache || newWork.IMAGE_URL

      const updateWorks = [...works, newWork];
      setWorkContext(prev =>({ ...prev ,works:updateWorks}));
  }
  const updateWorkInPorfolio = async (workToSend = {}) =>{
      const { IMAGE_URL ,ID_WORK} = workToSend; 

      const lastWork = works.find(work => work.ID_WORK == ID_WORK);
      workToSend.IMAGE_URL = lastWork.IMAGE_URL != IMAGE_URL ? IMAGE_URL : [];

      const newWork = await updateWork(workToSend)
      if(!newWork) throw new Error("TODO: put error with translate");

      const updatePorfolio = works?.map(work =>{ 
        const result = work.ID_WORK == newWork.ID_WORK ? newWork : work;
        return result;
      });

      setWorkContext(prev =>({ ...prev ,works:updatePorfolio}));
  }
  const deleteWorkInPorfolio = async () =>{
      const {ID_WORK, URL } = formData;
      if(!ID_WORK || !URL) return
      const response = await deleteWork(formData)
      if(!response)  throw new Error('TODO: put error with translate');

      const updatePorfolio = works?.filter(work=>work.ID_WORK != ID_WORK)
                                   .sort((a, b) => a.ORDER_INDEX - b.ORDER_INDEX)
                                   .map((work, index) => ({ ...work, ORDER_INDEX: index + 1 }));

      setWorkContext(prev =>({ ...prev ,works:updatePorfolio}));
      setFormData({});
  }

  const onSubmit = async (e) =>{
    try {
          e.preventDefault();    
          const { ID_WORK } = formData || {};        
 
          let response = ID_WORK ? await updateWorkInPorfolio(formData)
                                 : await addWorkInPorfolio(formData)
          
          setFormData({});
          e.target.reset(); 
          //TODO: CLOSE FORM
    } catch (error) {
      console.error("SHOW MODAL????")
      //TODO: SHOW MODAL(error.message)
    }
  }

  return (
    works.length ?
    <main className='porfolio-container '>
      <ContHorizonalScroll>
        <section className="grid-porfolio">
          <PorfolioImgs works={works} formState={formState}/>
          
          {isAdmin && 
            <PorfolioForm
              formState={formState}
              errorMessages={errorMessages}
              labels={labels}
              onSubmit={onSubmit}
            >
              <button type='reset' onClick={async (e)=> await deleteWorkInPorfolio()}>Borrar?</button>
              <button type='submit'> enviar</button>
            
            </PorfolioForm>
            }

        </section>
      </ContHorizonalScroll>
      </main>
    :null
  )
}

export default Porfolio


