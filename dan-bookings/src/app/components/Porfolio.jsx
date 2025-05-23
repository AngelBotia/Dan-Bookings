import React,{ useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import '../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import { getUserSession } from '../hooks/useUser';
import { useWork } from '../hooks/useWork';
import { useLanguageAPP } from '../hooks/useLanguageAPP';
import { InputImgs,InputText } from './Inputs';
import { useWorkContext } from '../context/WorkProvider';

const Porfolio = () => {  
  const { getTranslation }= useLanguageAPP();
  const {  setWorkContext } = useWorkContext();
  const { works, getWorks, createWork, updateWork , deleteWork } = useWork();
  const { porfolio } = getTranslation();
  const { user, isAdmin } = getUserSession();
  
  const [workSelected, setWorkSelected] = useState({});
  
  const createWorksImgs = () => {
    return works?.map((work, index) => {
      let { ID_WORK, IS_VISIBLE } = work || {};
      if (!ID_WORK /** || !IS_VISIBLE*/) return null;
      return (
        <PorfolioImgLink key={ID_WORK} work={work}/>
      )
    }) || [];
  }

  return (
    works.length ?
    <div className='porfolio-container'>
      <ContHorizonalScroll>
        <div className="grid-porfolio">
          {createWorksImgs()}
          {isAdmin && 
          <PorfolioForm
            porfolioText={porfolio}
            works={works}
            workSelected={workSelected}
            createWork={createWork}
            updateWork={updateWork} 
            deleteWork={deleteWork} 
            setWorkContext={setWorkContext}
            />}
        </div>
      </ContHorizonalScroll>
    </div>
    :null
  )
}

export default Porfolio


export const PorfolioForm = ({porfolioText, works = [], workSelected={},setWorkContext,createWork, updateWork , deleteWork }) => {
    const { errorMessages,labels } = porfolioText || {};
  
    const formState = useState(workSelected);
    const [formData ,setFormData] = formState;

    const addWorkInPorfolio = async (workToSend = {}) =>{
        const { IMAGE_URL } = workToSend;
        const newWork = await createWork(workToSend);
        if(!newWork) throw new Error('TODO: put error with translate');

        const imgInCache =  IMAGE_URL[0].imgSrc;
        newWork.IMAGE_URL = imgInCache || newWork.IMAGE_URL; 
        if(newWork?.detail) newWork.detail.MAIN_IMG_URL = imgInCache || newWork.IMAGE_URL

        const updateWorks = [...works, newWork];
        return updateWorks;
    }
    const updateWorkInPorfolio = async (workToSend = {}) =>{
        const newWork = await updateWork(workToSend)
        if(!newWork) throw new Error("TODO: put error with translate");

        const updatePorfolio = works?.map(work =>{ 
          const result = work.ID_WORK == newWork.ID_WORK ? newWork : work;
          return result;
        });
        return updatePorfolio;
    }
    const deleteWorkInPorfolio = async (workToSend = {}) =>{
        const {ID_WORK, URL } = workToSend;
        if(!ID_WORK || !URL) return
        const response = await deleteWork(workToSend)
        if(!response)  throw new Error('TODO: put error with translate');

        const updatePorfolio = works?.filter(work=>work.ID_WORK != ID_WORK)
                                     .sort((a, b) => a.ORDER_INDEX - b.ORDER_INDEX)
                                     .map((work, index) => ({ ...work, ORDER_INDEX: index + 1 }));
        return updatePorfolio;
    }
    const onSubmit = async (e) =>{
      try {
            e.preventDefault();    
            const { ID_WORK } = workSelected || {};
            let   { WO_NAME, IMAGE_URL,ORDER_INDEX,IS_VISIBLE } = formData || {};

            const workToSend = {
                ...workSelected,
                   WO_NAME,
                   IS_VISIBLE,
                   ORDER_INDEX,
                   IMAGE_URL: IMAGE_URL != workSelected?.IMAGE_URL ? IMAGE_URL : null
              }
           
            
            let response = ID_WORK ? await updateWorkInPorfolio(workToSend).then(updatedWorks => setWorkContext(prev =>({ ...prev ,works:updatedWorks})))
                                   : await addWorkInPorfolio(workToSend).then(updatedWorks => setWorkContext(prev =>({ ...prev ,works:updatedWorks})));
            
            setFormData({})
            e.target.reset(); 
            //TODO: CLOSE FORM
      } catch (error) {
        console.error("SHOW MODAL????")
        //TODO: SHOW MODAL(error.message)
      }
    }

  return (
    <form onSubmit={(e)=>onSubmit(e)}>
        <InputText 
            form={formState} 
            name={"WO_NAME"} 
            label={labels["WO_NAME"]} 
            title={errorMessages["WO_NAME"] } 
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
        disabled={!workSelected.ID_WORK}
        style={{backgroundColor:'dark-red'}}
        onClick={async (e)=> await deleteWorkInPorfolio(workSelected).then(updatedWorks => setWorkContext(prev =>({ ...prev ,works:updatedWorks})))}
        > BORRAR</button>
        <button type='submit'>Submit</button>
    </form>
    )
}

//**TODO: MAKE A COMPONENT CANT KWNOW HOW IS DRAG AND CHANGE WORK SELECTED */
export const PorfolioImgLink = ({work={}}) => {
    const { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE } = work;
    let isLoaded,typeOfCollage = false;
   
    const fadeIn = !isLoaded ? 'fade-in-animation' : ''
    const order = Number(ORDER_INDEX) || index + 1
    const collage = typeOfCollage ? `${typeOfCollage}${order}` :`collage-default${order}`
   
    const className=`img-porfolio ${fadeIn} ${collage}`
    return (
        <Link href={`/${URL}`} className={className}>
            <Image
                alt={URL}
                fill
                src={IMAGE_URL}
                className={className}
                style={{
                    viewTransitionName: `${URL}`,
                    '--order-delay': `${Number(ORDER_INDEX) / 10 || Number(index) / 10}s`
                }}
            />
        </Link>
    )
}
