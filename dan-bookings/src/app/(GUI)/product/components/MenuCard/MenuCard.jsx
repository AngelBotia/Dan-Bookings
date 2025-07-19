import React, { useState,useEffect } from 'react'
import { useProduct } from '../../product.hook'
import { useCategories } from '../../category/category.hook'
import { CategoriesSelector } from '../CategoriesSelector/CategoriesSelector'

export const MenuCard = () => {
    const [params, setparams] = useState({CATEGORY:null})
    const { data:categories } = useCategories()
    const { data:products } = useProduct(params);

    const onClickCategory = (category,index) =>{
        let value = ["PRINCIPAL","fsdfafasdfasdf"]
        setparams(prev => ({...prev,CATEGORY:value[index].code}));
    }

    const createProducts = () =>{
      return products.map(product=>{
        
        return (<div key={product.ID_WORK}>{product.ID_WORK}</div>)
      })
    }
 
  return (
    <>
    {products?.length && createProducts()}
    <CategoriesSelector 
      categories={categories}
      indexSelect={params.index}
      onClick={onClickCategory}
    />
    </>
  )
}
