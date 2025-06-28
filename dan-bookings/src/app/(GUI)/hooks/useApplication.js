
import ES from '../translations/ES.json'
import EN from '../translations/EN.json'
import { LANG_LS } from '../constants/localStorage';
import { useEffect, useState } from 'react';
import { DEFAULT_LNG_APP } from '../constants/languagues'
import { useApplicationContext } from '../context/AplicationProvider'
export const useApplication = () =>{
  const { applicationContext, setApplicationContext }  = useApplicationContext();
  const { editMode } = applicationContext || {};
  const setEditModeApp = (isActive=false) =>{
        setApplicationContext(prev => ({ ...prev, editMode:isActive}))
  }

  return {
    setEditModeApp,
    editMode
  }
    
}

export function useLanguageAPP(){
  const { setApplicationContext,applicationContext:{ languageAPP }} = useApplicationContext();

  useEffect(() => {
    const lastLanguage = localStorage.getItem(LANG_LS);
    if (lastLanguage) {
      setApplicationContext(prev => ({ ...prev, languageAPP:lastLanguage.toLocaleUpperCase()}))
    }
  }, []);
  
  const setAppLanguage =(languageAPP = DEFAULT_LNG_APP)=>{
    setApplicationContext(prev => ({ ...prev, languageAPP:languageAPP.toLocaleUpperCase()}))
    localStorage.setItem(LANG_LS,languageAPP.toLocaleUpperCase())
  }
  
  return { languageAPP,setAppLanguage }
}

export const getTranslation =()=>{
  const { applicationContext:{ languageAPP }} = useApplicationContext();
  const allAppTexts = { ES, EN };
  return allAppTexts[languageAPP] || EN;
}




