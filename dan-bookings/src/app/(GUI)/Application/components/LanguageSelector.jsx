import React, { useState } from 'react'
import { useApplication } from '../application.hook';

export const LanguageSelector = () => {
 const { languageAPP,loadLanguages,setLanguageAPP }  = useApplication();
 const {data:allLanguages,isLoading} = loadLanguages();

 const onChangeLanguage = (e) => {
    setLanguageAPP(e.currentTarget.value)
 }
 if(isLoading)return <p>Loading...</p>
  return (
    <select defaultValue={languageAPP} onChange={onChangeLanguage}>
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
