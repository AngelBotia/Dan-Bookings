import { useApplication } from '../context/AplicationProvider';
import ES from '../translations/ES.json'
import EN from '../translations/EN.json'


export function useSetLanguageAPP(languageAPP = "ES"){
  const { setApplicationContext } = useApplication();
  setApplicationContext(prev => ({ ...prev, languageAPP }))
}

export function useGetTranslation(){
  const { applicationContext: { languageAPP } } = useApplication();
  const allAppTexts = { ES, EN };
  return allAppTexts[languageAPP] || EN;
}