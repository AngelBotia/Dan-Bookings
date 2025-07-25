import Cookies from 'js-cookie';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  { categoryService }  from './category.service';
import { keyCategory, lastCategoryLS } from '../product.constant'
import { useApplication } from '../../application/application.hook';
import { create } from 'zustand'



export const useCategoriesStore = create((set) => ({
  indexSelectedCategory: Number(Cookies.get(lastCategoryLS)) || 0,

  setIndexCategory: (indexCat) => {
    Cookies.set(lastCategoryLS, String(indexCat), { expires: 365 });
    set({ indexSelectedCategory: indexCat });
  },
}))
export function useCategories(params = {}) {
  const { languageAPP } = useApplication();
  const { indexSelectedCategory,setIndexCategory } = useCategoriesStore();
  const queryClient = useQueryClient();

  const loadCategories = useQuery({
    queryKey: [`${keyCategory}-${languageAPP}`],
    queryFn: () => categoryService.getCategories(params),
    staleTime: Infinity,                
    cacheTime: Infinity,                
    refetchOnWindowFocus: false
  });

  return {
    indexSelectedCategory,
    setIndexCategory,
    ...loadCategories
  };
}

