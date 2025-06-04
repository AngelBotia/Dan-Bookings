import '../styles/globals.css'
import '../styles/Porfolio/Porfolio.css'
import '../styles/porfolio/collages/collage1.css'
import '../styles/porfolio/collages/collageDefault.css'
import React,{ useRef, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { ContHorizonalScroll } from './UI/containers/ContHorizonalScroll';
import { getUserSession } from '../hooks/useUser';
import { useWork } from '../hooks/useWork';
import { getTranslation, useLanguageAPP } from '../hooks/useLanguageAPP';
import { InputImgs, } from './UI/inputs/InputImgs';
import { InputText } from './UI/inputs/InputText'
import { ToggleHidden } from './UI/modals/ToggleHidden'



const Porfolio = () => {  
  const { porfolio:{
    errorMessages,
    labels 
  }} = getTranslation();

  const { works, loadWorks, addWork, editWork ,removeWork } = useWork();
  const { user, isAdmin } = getUserSession();

  const formRef = useRef(null);
  const formState = useState(null);
  const [formData ,setFormData] = formState;
  
  

  let isLoaded,typeOfCollage = false;
  const fadeIn = !isLoaded ? 'fade-in-animation' : ''
  const editMode = true;
    
  const createImgs = () => {
    return works?.map((work, index) => {
      const { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE,isSelected } = work || {};
      if ( !ID_WORK ) return null;
      
      const order = Number(ORDER_INDEX) || index + 1;
      const collage = typeOfCollage ? `${typeOfCollage}${order}` :`collage-default${order}`
      const className=`img-porfolio ${fadeIn} ${collage}`
      return (
        editMode ? 
        (<article key={ID_WORK} className={className} onClick={(event)=>onWorkSelected(event,work)}>
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
        </article>
         ):
         (
          <Link href={`/${URL}`} key={ID_WORK} className={className}> 
                <Image
                    alt={URL}
                    fill
                    src={IMAGE_URL}
                    className={className}
                    objectFit="cover"
                    style={{
                        viewTransitionName: `${URL}`,
                        '--order-delay': `${Number(ORDER_INDEX) / 10 || Number(index) / 10}s`
                    }}
                />
          </Link> )
        )

      }) || [];
  }
  
  const onWorkSelected = (event,work) => {
    const { IMAGE_URL } = work;
  
    const workToShow = {
      ...work,
      IMAGE_URL: [IMAGE_URL]
    }
    setFormData(workToShow)
  }

  const onSubmit = async (e) =>{
    try {
          e.preventDefault();    
          const { ID_WORK } = formData || {};        
 
          let response = ID_WORK ? await editWork(formData)
                                 : await addWork(formData)
          
          setFormData({});
          e.target.reset(); 
          //TODO: CLOSE FORM
    } catch (error) {
      console.error("SHOW MODAL????")
      //TODO: SHOW MODAL(error.message)
    }
  }

  const onReset = async (e) => {
    try {
      const isDelete = await removeWork(formData);
      setFormData(null)
    } catch (error) {
      console.error("PUT ERROR MODAL HERE")
      //TODO: SHOW MODAL(error.message)

    }
  }

 

  return (
    works.length ?
    <main className='porfolio-container '>
      <ContHorizonalScroll>
        <section className="grid-porfolio">
          {createImgs()}   
          {/* TODO: create newwork => setformData({})        */}
          {isAdmin && 
            <ToggleHidden isOpen={formData} onClose={()=>{setFormData(null)}}> 
              <form ref={formRef} className='form-porfolio' onSubmit={async (e) => await onSubmit(e)}>
                <InputImgs
                  form={formState}
                  name={"IMAGE_URL"}
                  required={true}
                  multiple={true}
                />

                <InputText
                  form={formState}
                  name={"WO_NAME"}
                  label={labels["WO_NAME"]}
                  title={errorMessages["WO_NAME"]}
                  required={true} />

                <footer >
                  <button type='submit' className='button-porfolio submit-porfolio'>Enviar</button>
                 {formData?.ID_WORK && <button type='reset' className='button-porfolio reset-porfolio' onClick={(e) => onReset(e)}>Borrar</button>}                </footer>
              </form> 
              </ToggleHidden>
            }
        </section>
      </ContHorizonalScroll>
      </main>
    :null
  )
}

export default Porfolio


