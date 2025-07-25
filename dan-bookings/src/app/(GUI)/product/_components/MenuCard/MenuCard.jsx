import React, { useState, useEffect, useRef } from 'react'
import { useProduct } from '../../product.hook'
import { CategoriesSelector } from '../CategoriesSelector/CategoriesSelector'
import { ProductForm } from '../ProductForm/ProductForm'
import { SwipeConainer } from '../../../Shared/components/containers/SwipeConainer'

export const MenuCard = () => {
  const [params, setparams] = useState({ page: 1, limit: 5 })
  const [productForm, setproductForm] = useState({})
  const {
    isLoading,
    data: products,
    addProduct,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    categories,
    indexSelectedCategory,
    setIndexCategory
  } = useProduct(params);

  if (isLoading) return <h2>Loading...</h2>

  const onClickCategory = (category, index) => {
    setIndexCategory(index)
  }
  const nextCategory = (e) => {
    const isLast = (categories.length - 1);
    setIndexCategory(indexSelectedCategory >= isLast ? indexSelectedCategory : indexSelectedCategory + 1);
  }
  const prevCategory = (e) => {
    const isFirst = indexSelectedCategory == 0
    setIndexCategory(isFirst ? indexSelectedCategory : indexSelectedCategory - 1);
  }

  const onSubmit = (e) => {
        try {
          e.preventDefault();    
          addProduct(productForm)
          
          e.target.reset(); 
          setproductForm(null);
    } catch (error) {
      window.alert(error.message)//TODO CHANGE THIS FOR A MODAL
    }
  }

  return (
    <>
      <ProductList
        products={products}
        categories={categories}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        nextCategory={nextCategory}
        prevCategory={prevCategory}
      />
      <CategoriesSelector
        categories={categories}
        indexSelect={indexSelectedCategory}
        onClick={onClickCategory}
      />
      <ProductForm
        formState={[productForm, setproductForm]}
        onDelete={()=>console.log("hola")}
        onSubmit={onSubmit}
      />
    </>
  )
}

function ProductList({ categories, products, fetchNextPage, hasNextPage, isFetchingNextPage, nextCategory, prevCategory }) {
  const loaderRef = useRef(null);


  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
           fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const createProducts = () => {
    const allProducts = products?.pages?.flatMap((page) => page.data) || [];
    return allProducts?.map((product,index) => (
      <article key={product.ID_WORK}>
        <SwipeConainer
          onSwipeLeft={nextCategory}
          onSwipeRigth={prevCategory}
          react={categories}>
          <img
            // onClick={(e)=>seteditMode(product.WO_NAME)}
            loading="lazy"
            src={product.IMAGE_URL[0]?.URL_MEDIA}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover"
            }}
            ref={index == allProducts?.length - 2 ? loaderRef : undefined}
          />
        </SwipeConainer>
      </article>
    ));
  };

  return (
    <div>
      {createProducts()}
      {isFetchingNextPage && <p>Cargando más...</p>}
    </div>
  );
}
