import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  { categoryService }  from './category.service';
import { keyCategory, lastCategoryLS } from '../product.constant'
import { useApplication } from '../../application/application.hook';

export function useCategories(params = {}) {
  const { languageAPP } = useApplication();
  const queryClient = useQueryClient();

  const loadCategories = useQuery({
    queryKey: [keyCategory,languageAPP],
    queryFn: () => categoryService.getCategories(params),
  });

  return {
    ...loadCategories
  };
}

