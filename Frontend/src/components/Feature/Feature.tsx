import React from 'react'
import PS5 from "../../assets/ps5.png"
import women from "../../assets/attractive-woman.png"
import speaker from "../../assets/loajbl.png"
import Perfume from "../../assets/nuocbong.png"


const Feature = () => {
  return (
    <section className='mt-20'>
      <div className='flex items-center'>
        <div className='w-[20px] h-[40px] bg-primaryColor rounded-md'></div>
        <p className='text-primaryColor ml-3 font-bold'>Feature</p>
      </div>
      <section className='mt-4 flex justify-between items-center'>
        <h2 className='font-medium text-3xl'>New Arrival</h2>
      </section>
      <div className="mt-8 grid grid-cols-12 gap-8">

        {/* PlayStation 5 */}
        <div className="relative bg-black col-span-6 text-white rounded-lg overflow-hidden">
          <img src={PS5} alt="PlayStation 5" className="w-[570px] h-[600px] object-cover absolute bottom-0" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-bold">PlayStation 5</h3>
            <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
            <a href="#" className="text-primaryColor mt-2 inline-block">Shop Now</a>
          </div>
        </div>

        <div className='col-span-6 '>
          <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden">
            <img src={women} alt="Women's Collections" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-xl font-bold">Women's Collections</h3>
              <p className="text-sm">Featured women collections that give you another vibe.</p>
              <a href="#" className="text-primaryColor mt-2 inline-block">Shop Now</a>
            </div>
          </div>
          <div className='flex gap-2 justify-between mt-7'>
            <div className="relative bg-gray-800 sm:w-[380px] h-auto text-white rounded-lg overflow-hidden">
              <img src={speaker} alt="Speakers" className="w-full h-full object-cover" />
              <div className="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold">Speakers</h3>
                <p className="text-sm">Amazon wireless speakers</p>
                <a href="#" className="text-primaryColor mt-2 inline-block">Shop Now</a>
              </div>
            </div>

            {/* Perfume */}
            <div className="relative bg-gray-800 sm:w-[380px] h-auto text-white rounded-lg overflow-hidden">
              <img src={Perfume} alt="Perfume" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold">Perfume</h3>
                <p className="text-sm">GUCCI INTENSE OUD EDP</p>
                <a href="#" className="text-primaryColor mt-2 inline-block">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Feature;
