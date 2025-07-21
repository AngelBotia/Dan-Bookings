import ES from './translations/ES.json'
import EN from './translations/EN.json'
import { create } from 'zustand'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_LNG_APP, LANG_LS } from './application.constant';
import { applicationService } from './application.service';
import { persist } from 'zustand/middleware';
import { useSession } from "next-auth/react";

export const useApplicationStore = create(
    persist(
        (set) => ({
            languageAPP: DEFAULT_LNG_APP,
            setLanguageAPP: (languageAPP) => set({ languageAPP }),
        }),
        {
            name: LANG_LS, //LOCAL STORAGE
        }
    )
);



export const useApplication = () => {
    const { languageAPP, setLanguageAPP } = useApplicationStore();
    const queryClient = useQueryClient()

    const loadLanguages = () => {
        return useQuery({
            queryKey: [LANG_LS],
            queryFn: () => applicationService.getLanguages(),
        });
    }

    const getTranslation = (newLanguage) => {
        const allAppTexts = { ES, EN };
        return allAppTexts[newLanguage || languageAPP] || allAppTexts[DEFAULT_LNG_APP];
    }
    const getUserSession = () => {
        const { data: session } = useSession() || {};
        const { user } = session || {};
        if (!session || !user) return {};
        let isAdmin = user?.role === process.env.NEXT_PUBLIC_MAIN_ROL;
        return { user, isAdmin }
    }


    return {
        loadLanguages,
        languageAPP,
        setLanguageAPP,
        getTranslation,
        getUserSession,
    }
}




