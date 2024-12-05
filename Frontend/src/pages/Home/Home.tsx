import React from 'react'
import HeroSection from '../../components/HeroSection';
import FlashSales from '../../components/FlashSales';
import BestSellingProuduct from '../../components/BestSellingProduct';
import BannerProduct from '../../components/BannerProduct';
import ExploreProduct from '../../components/ExploreProduct';
import Feature from '../../components/Feature';
import Services from '../../components/Services';

const Home = () => {
  return (
    <div className='container mx-auto'>
      <HeroSection></HeroSection>
      <FlashSales></FlashSales>
      <BestSellingProuduct></BestSellingProuduct>
      <BannerProduct></BannerProduct>
      <ExploreProduct></ExploreProduct>
      <Feature></Feature>
      <Services></Services>
    </div>
  )
}

export default Home;