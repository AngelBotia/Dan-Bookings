import { useApplication } from '../context/AplicationProvider';
import ES from '../translations/ES.json'
import EN from '../translations/EN.json'
import { LANG_LS } from '../constants/localStorage';
import { useEffect, useState } from 'react';

export function useLanguageAPP(){
  const { setApplicationContext,applicationContext:{ languageAPP }} = useApplication();
  const [lastLanguage, setLanguageSelect] = useState(null);
  
  useEffect(() => {
    const lastLanguage = localStorage.getItem(LANG_LS);
    if (lastLanguage) {
      setLanguageSelect(lastLanguage); 
    }
  }, []);

  const setAppLanguage =(languageAPP = "ES")=>{
    setApplicationContext(prev => ({ ...prev, languageAPP:languageAPP.toLocaleUpperCase()}))
    localStorage.setItem(LANG_LS,languageAPP.toLocaleUpperCase())
  }

  const getTranslation =()=>{
    const allAppTexts = { ES, EN };
    const languageSelect = lastLanguage || languageAPP;
    return allAppTexts[languageSelect] || EN;
  }


  return { setAppLanguage ,getTranslation}
}

