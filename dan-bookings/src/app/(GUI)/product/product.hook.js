import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { keyCategory, keyProduct } from './product.constant'
import { useApplication } from '../application/application.hook';
import { productService } from './product.service';
import { useCategories } from './category/category.hook'

export function useProduct(params = { page: 0}) {
  const { languageAPP } = useApplication();

  
  const queryClient = useQueryClient();
  const queryKey = [keyProduct,languageAPP,params];

  // GET
  const loadProducts = useQuery({
    queryKey: queryKey,
    queryFn: () => productService.getProducts({languageAPP,...params}),
    staleTime: Infinity,                
    cacheTime: Infinity,                
    refetchOnWindowFocus: false,  
  });

  // const loadProduct = useInfiniteQuery({
  //   queryKey,
  //   queryFn: ({ page = params.page || 0 }) => fetchProducts({ page }),
  //   getNextPageParam: (lastPage, allPages) => {

  //     // Asumiendo que tu API devuelve algo como { data: [...], nextPage: number | null }
  //     return lastPage.nextPage ?? false
  //   },
  // })
  // POST
// const createProduct = useMutation({
//   mutationFn: (newProduct) => productService.createProduct(newProduct),
//   onSuccess: (createdProduct) => {
//     queryClient.setQueryData(queryKey, (oldProducts = []) => {
//       return [...oldProducts, createdProduct]
//     })
//   },
// })


  
//   // PUT
//   const createMutation = useMutation(createCategory, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(queryKey);
//     },
//   });



//   // DELETE
// const deleteProduct = useMutation({
//   mutationFn: (id) => productService.deleteProduct(id),
//   onSuccess: (_, id) => {
//     queryClient.setQueryData(queryKey, (oldData) => {
//       if (!oldData) return []
//       return oldData.filter((p) => p.id !== id)
//     })
//   },
//   onError: ({error}) => {
//     // console.error(error)
//   },
// }).mutate

  return {
    ...loadProducts,
    // createCategory: createMutation.mutate,
    // updateCategory: updateMutation.mutate,
    //  deleteProduct,
  };
}

