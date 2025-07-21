import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  { categoryService }  from './category.service';
import { keyCategory, lastCategoryLS } from '../product.constant'
import { useApplication } from '../../application/application.hook';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';


export const useCategoriesStore = create(
  persist(
    (set) => ({
      indexSelectedCategory: 0,
      setIndexCategory: (indexCat) => set({ indexSelectedCategory: indexCat }),
    }),
    {
      name: lastCategoryLS, 
      partialize: (state) => ({ indexSelectedCategory: state.indexSelectedCategory }), 
    }
  )
);
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

