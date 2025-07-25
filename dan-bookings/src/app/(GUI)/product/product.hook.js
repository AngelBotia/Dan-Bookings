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

  const addProduct = useMutation({
    mutationFn:(newProduct) => productService.createProduct({...newProduct,languageAPP}),
    onSuccess: (response) => {
      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return;
        return {...old,
          pages: [
            { 
              ...old.pages[0],
              data: [response, ...old.pages[0].data]
             },
            ...old.pages.slice(1),
          ],
        };
      });
    },
  }).mutate;


  
  const queryClient = useQueryClient();

  return {
    ...loadProducts,
    addProduct,
    categories,
    setIndexCategory,
    indexSelectedCategory
  };
}

