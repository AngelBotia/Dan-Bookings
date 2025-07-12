import React, { useState } from 'react'
import { useEffect } from 'react'
import { useApplication } from '../application.hook';
import { DEFAULT_LNG_APP, LAST_LANG_LS } from '../application.constant';

export const LanguageSelector = () => {
    const [allLanguages, setAllLanguages] = useState([]);
    const { languageAPP, loadLanguages, setLanguagueApp }= useApplication();

    
    const changeLanguage=(e)=>{
        setLanguagueApp(e.currentTarget.value)
    }
   
    useEffect(() => {
        (async()=>{
            if(!languageAPP){
                const lastLanguage = localStorage.getItem(LAST_LANG_LS) || DEFAULT_LNG_APP;
                setLanguagueApp(lastLanguage);
            }

            if(!allLanguages.length){
                const newLanguagues = await loadLanguages() || [];
                setAllLanguages(newLanguagues);
            }
        })();
    }, [allLanguages])
    
  return (
    !allLanguages.length ?
     <p>Loading...</p>
    :
    <select defaultValue={languageAPP} onChange={changeLanguage}>
        {allLanguages?.map(lng => {
            const {language,name,flag,icon} = lng || {};
            return (
            <option 
              value={language}
              key={`${language}-${name}`}>
              {icon + language}
            </option>)
        })}
    </select>
    )
}

export default LanguageSelector