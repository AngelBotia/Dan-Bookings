import { useApplication } from '../context/AplicationProvider';
import ES from '../translations/ES.json'
import EN from '../translations/EN.json'
import { LANG_LS } from '../constants/localStorage';
import { useEffect, useState } from 'react';

export function useLanguageAPP(){
  const { setApplicationContext,applicationContext:{ languageAPP }} = useApplication();

  useEffect(() => {
    const lastLanguage = localStorage.getItem(LANG_LS);
    if (lastLanguage) {
      setApplicationContext(prev => ({ ...prev, languageAPP:lastLanguage.toLocaleUpperCase()}))
    }
  }, []);
  
  const setAppLanguage =(languageAPP = "ES")=>{
    setApplicationContext(prev => ({ ...prev, languageAPP:languageAPP.toLocaleUpperCase()}))
    localStorage.setItem(LANG_LS,languageAPP.toLocaleUpperCase())
  }
  
  return { setAppLanguage }
}

export const getTranslation =()=>{
  const { applicationContext:{ languageAPP }} = useApplication();
  const allAppTexts = { ES, EN };
  return allAppTexts[languageAPP] || EN;
}
