import { useEffect } from 'react';
import { useApplication } from '../context/AplicationProvider';
import { usePortfolio } from '../context/PorfolioProvider';
import ES from '../translations/ES.json'
import EN from '../translations/EN.json'




export function useWorksIsLoaded() {
 const { setApplicationContext } = useApplication();
 const { porfolioContext:{works} } = usePortfolio();
 
  useEffect(() => {
    if(works.length)setApplicationContext(prev => ({ ...prev, isLoaded: true }));
  }, []);
}

export function useSetLanguageAPP(languageAPP = "ES"){
  const { setApplicationContext } = useApplication();
  setApplicationContext(prev => ({ ...prev, languageAPP }))
}

export function useGetTranslation(){
  const { applicationContext } = useApplication();
  const { languageAPP } = applicationContext;
  const allLanguagues = { ES, EN };
  return allLanguagues[languageAPP] || EN;
}