import '../../Shared/styles/globals.css'
import '../styles/Porfolio/Porfolio.css'
import '../styles/porfolio/collages/collage1.css'
import '../styles/porfolio/collages/collageDefault.css'
import React,{ useEffect, useRef, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { ContHorizonalScroll } from '../../Shared/components/containers/ContHorizonalScroll';
import { useWork } from '../work.hook';
import { InputImgs, } from '../../Shared/components/inputs/InputImgs';
import { InputText } from '../../Shared/components/inputs/InputText'
import { ToggleHidden } from '../../Shared/components/modals/ToggleHidden'
import { getTranslation, getUserSession  } from '../../Application/application.hook';
import { useApplication } from '../../Application/application.hook';



const Porfolio = () => {  
  const { languageAPP } = useApplication();
  const { 
          actions,
          porfolio:{
          errorMessages,
          labels 
  }} = getTranslation();
  const { works, loadWorks, addWork, editWork ,removeWork } = useWork();
  const { user, isAdmin } = getUserSession();
  
  const [editMode, seteditMode] = useState(false)
  const formState = useState(null);
  const [formData ,setFormData] = formState;
  
  

  const createImgs = () => {
    if(!works?.length) return null;
    return works?.map((work, index) => {
      const { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE,isSelected } = work || {};
      if ( !ID_WORK ) return null;
      let isLoaded,typeOfCollage = false;
      const fadeIn = !isLoaded && IS_VISIBLE ? 'fade-in-animation' : 'no-visible'
      const order = Number(ORDER_INDEX) || index + 1;
      const collage = typeOfCollage ? `${typeOfCollage}${order}` :`collage-default${order}`
      const className=`img-porfolio ${fadeIn} ${collage}`
      return (
        editMode ? 
        (<article key={ID_WORK} className={className} onClick={(event)=>onWorkSelected(event,work)}>
               <Image
                   alt={URL}
                   fill
                   src={IMAGE_URL[0]?.URL_MEDIA}
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
                    src={IMAGE_URL[0]?.URL_MEDIA}
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
  
  const onWorkSelected = (e,work) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    }
    setFormData({...work,pos})
  }
  const onLoadForm = (e)=>{
    if(!formData?.pos) return;
    const {pos:{ x,y } } = formData || {};

    const formWidth = e.currentTarget.offsetWidth

    //changes the side when are close to borders
    let left = x < (window.innerWidth / 2) ? x  : x - formWidth;
    //check dont overflow the view
    left = Math.max(0, Math.min(left, window.innerWidth - formWidth));
    
    e.currentTarget.style.left = `${left}px`
  }

  const onSubmit = async (e) =>{
    try {
          e.preventDefault();    
          const { ID_WORK } = formData || {};        
          e.currentTarget.style.filter='blur(2px)';
          let response = ID_WORK ? await editWork({...formData,languageAPP})
                                 : await addWork({...formData,languageAPP})
          
          e.target.reset(); 
          setFormData(null);
    } catch (error) {
      window.alert(error.message)//TODO CHANGE THIS FOR A MODAL
    }
  }

  const onDelete = async (e) => {
    try {
      const isDelete = await removeWork(formData);
      setFormData(null)
    } catch (error) {
      window.alert(error.message)//TODO CHANGE THIS FOR A MODAL
    }
  }

  useEffect(() => {
    (async () =>{
      await loadWorks()
    })();
  }, [])
  
 

  return (
    works.length || isAdmin ?
    <main className='porfolio-container '>
     {isAdmin && <button style={{backgroundColor: editMode ? 'green' : "transparent",position: 'fixed',right: '0px',zIndex:3}} onClick={(e)=>seteditMode(!editMode)}>✏️</button>}
      <ContHorizonalScroll>
        <section className="grid-porfolio">
          {createImgs()}   
          {editMode && <article style={{backgroundColor:'gray'}} onClick={(e)=>setFormData({})} className={`img-porfolio fade-in-animation ${works.length + 1}`}/>}
          {isAdmin && 
            <ToggleHidden isOpen={formData} onClose={()=>{setFormData(null)}}> 
              <form onLoad={(e)=>onLoadForm(e)} className='form-porfolio fade-in-animation fast-animation' onSubmit={async (e) => await onSubmit(e)}>
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
                
                <InputText
                  form={formState}
                  name={"CATEGORY"}
                  label={"CATEGORY"}
                  title={errorMessages["WO_NAME"]}
                  required={true} />

                <footer>
                  <button type='submit' className='button-porfolio submit-porfolio'>{actions.send}</button>
                  {formData?.ID_WORK && <button type='reset' className='button-porfolio reset-porfolio' onClick={(e) => onDelete(e)}>{actions.delete}</button>} 
                </footer>
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


