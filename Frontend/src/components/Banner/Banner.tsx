import React from 'react'
import { Swiper, SwiperSlide} from "swiper/react"
import { Pagination } from 'swiper/modules';
import { bannerDb } from '../../db/banner.db'
import "swiper/css";
import 'swiper/css/pagination';

interface BannerItemType {
  item: string
}

const Banner = () => {
  return (
    <div className='h-[400px] mb-10 overflow-hidden relative z-0'>
      <Swiper pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
      {bannerDb.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <BannerItem item={item}></BannerItem>
          </SwiperSlide>
        )
      })}
      </Swiper>
      
    </div>
  )
}

function BannerItem({item}: BannerItemType) {
  return(
    <div className='w-full h-full rounded-lg bg-white relative'>
      <img 
        src={item} 
        alt="Banner" 
        className='w-full h-full object-cover rounded-lg object-top'
      />
    </div>
  )
}

export default Banner;
