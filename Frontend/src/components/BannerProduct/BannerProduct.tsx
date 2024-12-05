import React, { useEffect, useState } from 'react'
import { flashSaleEndTime } from '../../constants/timeCountdown';
import image from '../../assets/JBL_BOOMBOX_2_HERO_020.png'


const BannerProduct = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Convert endTime to timestamp
    const endTimestamp = new Date(flashSaleEndTime).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Stop countdown
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [flashSaleEndTime]);

  return (
    <section className='grid grid-cols-12 h-[500px] bg-black mt-20'>
      <div className='col-span-6 mt-[69px] ml-16'>
        <p className='text-primaryColor font-bold text-xl'>Categories</p>
        <h3 className='text-6xl text-white mt-9 text-wrap'>Enhance Your Music Experience</h3>
        <div className='flex gap-5 mt-9'>
          <div className='flex flex-col justify-center items-center bg-white rounded-full w-20 h-20'>
            <span className='font-bold'>{timeLeft.days}</span>
            <span className='text-sm'>Days</span>
          </div>
          <div className='flex flex-col justify-center items-center bg-white rounded-full w-20 h-20'>
            <span className='font-bold'>{timeLeft.hours}</span>
            <span className='text-sm'>Hours</span>
          </div>
          <div className='flex flex-col justify-center items-center bg-white rounded-full w-20 h-20'>
            <span className='font-bold'>{timeLeft.minutes}</span>
            <span className='text-sm'>Minutes</span>
          </div>
          <div className='flex flex-col justify-center items-center bg-white rounded-full w-20 h-20'>
            <span className='font-bold'>{timeLeft.seconds}</span>
            <span className='text-sm'>Seconds</span>
          </div>
        </div>
        <button className='py-4 px-10 bg-primaryColor/80 text-white rounded-sm mt-10'>Buy now!</button>
      </div>
      <div className='col-span-6 relative'>
        <div
          className="absolute inset-0 -z-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-900 blur-3xl opacity-50"
        ></div>
        <img src={image} alt="banner" className='ml-4 mt-[75px] z-1 absolute' />
      </div>
    </section>
  )
};

export default BannerProduct;
