import React, { useState } from 'react'
import { useApplication } from '../application.hook';

export const LanguageSelector = () => {
 const { languageAPP,loadLanguages }  = useApplication();
 const {data:allLanguages} = loadLanguages();
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
