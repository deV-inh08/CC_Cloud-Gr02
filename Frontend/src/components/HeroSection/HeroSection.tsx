import React from 'react'
import Sidebar from '../Sidebar';
import Banner from '../Banner';
import ProductApi from '../../api/products.api';
import { useQuery } from '@tanstack/react-query';

const HeroSection = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => {
      return ProductApi.getCategories()
    }
  });
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-12 '>
        <div className='col-span-3 mt-3'>
          <Sidebar categories={categoriesData?.data}></Sidebar>
        </div>
        <div className='col-span-9 mt-3'>
          <Banner></Banner>
        </div>
      </div>
    </div>
  )
};

export default HeroSection;
