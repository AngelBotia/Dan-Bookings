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
import { InputImgs, } from './UI/inputs/InputImgs';
import { InputText } from './UI/inputs/InputText'
import { ToggleHidden } from './UI/modals/ToggleHidden'
import { getTranslation  } from '../hooks/useApplication';

export const MenuCards = () => {
    const { porfolio:{
      errorMessages,
      labels 
    }} = getTranslation();
    const { works, loadWorks, addWork, editWork ,removeWork } = useWork();
    const { user, isAdmin } = getUserSession();
    
    const [editMode, seteditMode] = useState(false)
    const [formData ,setFormData] = useState(null);
 
 
 
    return (
        <>
        {works.map(item => {
            return(
                <div key={item.ID_WORK}>

                    <h1 >Hola?</h1>
                </div>
            )
        })}
        </>
    )
}
