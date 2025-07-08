
import { useEffect, useState } from 'react';
import ES from './translations/ES.json'
import EN from './translations/EN.json'
import { LANG_LS, DEFAULT_LNG_APP } from './application.constant';
import { useApplicationContext } from '../Application/Application.context';

export const useApplication = () =>{
  const { applicationContext, setApplicationContext }  = useApplicationContext();
  const { editMode } = applicationContext || {};
  const setEditModeApp = (isActive=false) =>{
        setApplicationContext(prev => ({ ...prev, editMode:isActive}))
  }

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgb(${r}, ${g}, ${b})`;
  }

  return {
    setEditModeApp,
    editMode,
    hexToRgb
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




