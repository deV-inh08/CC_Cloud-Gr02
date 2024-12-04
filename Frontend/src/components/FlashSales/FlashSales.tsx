import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProductApi from '../../api/products.api';
import { Product, ProductListConfig } from '../../types/products.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import ViewAllProduct from '../ViewAllProduct';
import CountdownTimer from '../CountDown/CountDown';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
};

const FlashSales = () => {
  const queryConfig: QueryConfig = {
    skip: "0",
    limit: "10"
  };
  const flashSaleEndTime = '2024-12-04T23:59:59';

  const { data } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => {
      return ProductApi.getProducts(queryConfig)
    }
  });

  return (
    <>
      <div className='flex items-center'>
        <div className='w-[20px] h-[40px] bg-primaryColor rounded-md'></div>
        <p className='text-primaryColor ml-3 font-bold'>Today's</p>
      </div>
      <section className='mt-4 flex justify-between items-center'>
        <h2 className='font-medium text-3xl'>Flash Sales</h2>
        <CountdownTimer endTime={flashSaleEndTime}></CountdownTimer>
      </section>
      <div className='mt-5'>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {data && data?.products.map((item: Product, index: number) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem item={item}></ProductItem>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className='flex justify-center'>
    <ViewAllProduct></ViewAllProduct>

      </div>
    </>
   
  )
}

export default FlashSales;
