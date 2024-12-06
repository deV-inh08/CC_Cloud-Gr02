import React from 'react'
import Sidebar from '../Sidebar';
import Banner from '../Banner';
import useCategories from '../../hooks/useCategories';

const HeroSection = () => {
  const { data: categoriesData } = useCategories()
  return (
    <div className='grid grid-cols-12 '>
        <div className='col-span-3 mt-3'>
          <Sidebar categories={categoriesData?.data} sliceEnd={11}></Sidebar>
        </div>
        <div className='col-span-9 mt-3'>
          <Banner></Banner>
        </div>
    </div>
  )
};

export default HeroSection;
