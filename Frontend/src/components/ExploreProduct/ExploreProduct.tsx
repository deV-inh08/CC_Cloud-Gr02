import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProductApi from '../../api/products.api';
import { QueryConfig } from '../FlashSales/FlashSales';
import { Product } from '../../types/products.type';
import ProductItem from '../ProductItem/ProductItem';
import ViewAllProduct from '../ViewAllProduct';

const ExploreProduct = () => {
  const queryConfig: QueryConfig = {
    skip: "100",
    limit: "15"
  };
  const { data } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => {
      return ProductApi.getProducts(queryConfig)
    }
  });
  return (
    <section className='mt-20'>
      <div className='flex items-center'>
        <div className='w-[20px] h-[40px] bg-primaryColor rounded-md'></div>
        <p className='text-primaryColor ml-3 font-bold'>Our Products</p>
      </div>
      <section className='mt-4 flex justify-between items-center'>
        <h2 className='font-medium text-3xl'>Explore Our Products</h2>
        {/* <ViewAllProduct size='small'></ViewAllProduct> */}
      </section>
      <div className='mt-5'>
        <div className='grid md:grid-cols-5 grid-cols-2'>
          {data && data?.products.map((item: Product, index: number) => {
            return (
              <ProductItem item={item}></ProductItem>
            )
          })
          }
        </div>
      </div>
      <div className='flex justify-center'>
        <ViewAllProduct size='large'></ViewAllProduct>
      </div>
    </section>
  )
};

export default ExploreProduct;
