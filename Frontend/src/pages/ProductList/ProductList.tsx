import React, { useEffect, useState } from 'react'
import useCategories from '../../hooks/useCategories';
import Sidebar from '../../components/Sidebar';
import { paths } from '../../constants/paths';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SortProductList from '../../components/SortProductList';
import { Product } from '../../types/products.type';
import ProductItem from '../../components/ProductItem/ProductItem';
import Pagination from '../../components/Pagination/Pagination';
import { BounceLoader } from "react-spinners"
import { QueryConfig } from '../../types/products.type';
import { order, sort_by } from '../../constants/product';
import { useQuery } from '@tanstack/react-query';
import ProductApi from '../../api/products.api';

const ProductList = () => {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>({
    skip: '0',
    limit: '15',
  });
  const { data: categoriesData } = useCategories();


  const location = useLocation();
  console.log(location.search)
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setQueryConfig({
      skip: searchParams.get("skip") || "0",
      limit: searchParams.get("limit") || "15",
      sortBy: searchParams.get("sortBy") || sort_by.stock,
      order: searchParams.get("order") || order.desc,
      category: searchParams.get("category") || '',
    })
  },[location.search]);

  const { data: productData, isLoading } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => { 
    if(queryConfig.category) {
        return ProductApi.getProductByCategory(queryConfig.category, queryConfig)
      } else {
        return ProductApi.getProducts(queryConfig)
      }
    }
  });

  console.log(productData)

  const handleClickCategory = (category: string) => {
    setQueryConfig((prevConfig: QueryConfig) : QueryConfig => {
      const updatedConfig = {
        ...prevConfig,
        category: category,
        skip: "0"
      };
      navigate({
        pathname: location.pathname,
        search: `?category=${category}&skip=0&limit=${updatedConfig.limit}&sortBy=${updatedConfig.sortBy}&order=${updatedConfig.order}`
      });
      return updatedConfig
    })
  };

  const TOTALPAGE = productData?.total && productData?.limit ? Math.ceil(productData.total / parseInt(productData.limit)) : 0;

  return (
    <div className='container mx-auto py-6'>
      <section className='grid grid-cols-12'>
        <div className='col-span-3'>
          <div className=' flex py-5 gap-7 justify-center items-center'>
            <Link to={paths.home}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </Link>
            <p className='text-2xl font-medium'>Categories</p>
          </div>
          <div className='h-[1px] bg-gray-400 mb-3'></div>
          <Sidebar categories={categoriesData?.data} queryConfig={queryConfig} onCategoryClick={handleClickCategory}></Sidebar>
        </div>
        <div className='col-span-9'>
          <SortProductList queryConfig={queryConfig}></SortProductList>
          {productData && productData.products.length > 0 ? (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-stretch'>
              {productData.products.map((item: Product, index: number) => {
                return (
                  <div key={index}>
                    <ProductItem item={item}></ProductItem>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
              <div className='fixed z-50 left-[59%] top-[40%]'>
                <BounceLoader loading={isLoading} color="#e6330c"/>
              </div>
            </div>
          )
          }
          {
            productData && productData.products.length > 0 && (
              <article className='mx-auto'>
                <Pagination queryConfig={queryConfig} totalPage={TOTALPAGE}></Pagination>
              </article>
            )
          }
        </div>
      </section>
    </div>

  )
}

export default ProductList;