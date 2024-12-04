import React from 'react'
import HeroSection from '../../components/HeroSection';
import FlashSales from '../../components/FlashSales';

const Home = () => {
  return (
    <div className='container mx-auto'>
      <HeroSection></HeroSection>
      <FlashSales></FlashSales>
    </div>
  )
}

export default Home;