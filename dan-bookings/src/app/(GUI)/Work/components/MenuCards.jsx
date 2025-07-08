import '../../Shared/styles/globals.css'
import React,{ useEffect, useRef, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { getUserSession } from '../../User/user.hook';
import { useWork } from '../work.hook';
import { getTranslation  } from '../../Application/application.hook';
import { SwipeConainer } from '../../Shared/components/containers/SwipeConainer';
import { CategoriesSelector } from '../../Category/components/CategoriesSelector';
import { useApplicationContext } from '../../Application/Application.context';


export const MenuCards = () => {
    const { applicationContext:{ languageAPP }} = useApplicationContext();
    const { porfolio:{
      errorMessages,
      labels 
    }} = getTranslation();
    const { works, categories, params, loadWorks,loadCategories, addWork, editWork ,removeWork } = useWork();
    
    
    const { user, isAdmin } = getUserSession();
    const [formData ,setFormData] = useState(null);
    const [editMode, seteditMode] = useState(0);
    
    const [worksToShow, setworksToShow] = useState([]);
    const [categoryIndexSelect, setCategorySelected] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    
    
    const selectCategory = (category,index) =>{
        setCategorySelected(index);
    }
    const nextCategory=(e)=>{
        setCategorySelected(prev => prev >= (categories.length -1 ) ? prev : prev + 1);
    }
    const prevCategory=(e)=>{
        setCategorySelected(prev => prev == 0 ? prev : prev - 1);
    }


    
    useEffect( () => {
        (async () =>{

          setisLoading(true);
           
          const allCategories = !categories.length ? await loadCategories() : categories;
          const categoryCode = allCategories[categoryIndexSelect].code || null;
          
          let newWorks = await loadWorks({...params,category:categoryCode}) || works[categoryIndexSelect] || [];
          const worksToPrint = (works || newWorks)?.filter(work => work.CATEGORY == categoryCode)
          setworksToShow(worksToPrint)
          
          setisLoading(false)
      })();
    }, [params,works,categoryIndexSelect])
    
 
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&        
             worksToShow?.map(item =>{
                 return (
                    <article key={item.ID_WORK}>
                        <SwipeConainer 
                         onSwipeLeft={nextCategory}
                         onSwipeRigth={prevCategory}
                         react={categories}>
                            <img 
                                onClick={(e)=>seteditMode(item.WO_NAME)}
                                src={item.IMAGE_URL[0]?.URL_MEDIA}
                                style={{
                                    width:"100%",
                                    height:"300px",
                                    objectFit:"cover"
                                }}
                                />
                        </SwipeConainer>
                     </article>
                     )
             })}
          <CategoriesSelector 
             categories={categories}
             indexSelect={categoryIndexSelect}
             onClick={selectCategory}
           />
           
        </>
    )
}
