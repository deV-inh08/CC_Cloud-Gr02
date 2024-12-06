import React from 'react'
import { Product } from '../../types/products.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import ViewAllProduct from '../ViewAllProduct';
import CountdownTimer from '../CountDown/CountDown';
import { flashSaleEndTime } from '../../constants/timeCountdown';
import useProducts from '../../hooks/useProduct';


const FlashSales = () => {
  const { data } = useProducts({ skip: "0", limit: "15" });

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
        <ViewAllProduct size='large'></ViewAllProduct>
      </div>
      <div className='h-[1px] bg-gray-600 mt-10 rounded-md mb-10'></div>
    </>
   
  )
}

export default FlashSales;
