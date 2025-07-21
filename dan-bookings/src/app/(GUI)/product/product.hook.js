import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { keyCategory, keyProduct } from './product.constant'
import { useApplication } from '../application/application.hook';
import { productService } from './product.service';
import { useCategories } from './category/category.hook'





export function useProduct(params = { page: 0 }) {
  const { languageAPP } = useApplication();
  const { data: categories, indexSelectedCategory, setIndexCategory } = useCategories()

  if (!params?.category && categories?.length) {
    const category = categories[indexSelectedCategory]?.code || null;
    params = {
      ...params,
      category
    }
  }

  const queryKey = [`${keyProduct}-${languageAPP}-${indexSelectedCategory}`, params];

  // GET
  // const loadProducts = useQuery({
  //   queryKey: queryKey,
  //   queryFn: () => productService.getProducts({ languageAPP, ...params }),
  //   enabled: !!categories,
  //   staleTime: Infinity,
  //   cacheTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });
  const loadProducts = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      productService.getProducts({
        ...params,
        languageAPP,
        page: pageParam,
      }),
    enabled: !!categories,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((acc, page) => acc + page.data.length, 0);
      if (totalLoaded < lastPage.total) {
        return allPages.length;
      }
      return undefined;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });


  
  const queryClient = useQueryClient();

  return {
    ...loadProducts,
    categories,
    setIndexCategory,
    indexSelectedCategory
  };
}

