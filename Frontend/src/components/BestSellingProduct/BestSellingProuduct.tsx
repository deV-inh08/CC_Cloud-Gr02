import React from 'react'
import ViewAllProduct from '../ViewAllProduct';
import { QueryConfig } from '../FlashSales/FlashSales';
import { useQuery } from '@tanstack/react-query';
import ProductApi from '../../api/products.api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import ProductItem from '../ProductItem/ProductItem';

const BestSellingProuduct = () => {
  const queryConfig: QueryConfig = {
    skip: "20",
    limit: "10"
  };
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
        <p className='text-primaryColor ml-3 font-bold'>This Month</p>
      </div>
      <section className='mt-4 flex justify-between items-center'>
        <h2 className='font-medium text-3xl'>Best Selling Product</h2>
        <ViewAllProduct size='small'></ViewAllProduct>
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
    </>
  )
}

export default BestSellingProuduct;
