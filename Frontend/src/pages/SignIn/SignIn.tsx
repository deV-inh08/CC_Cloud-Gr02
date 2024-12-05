import React from 'react'
import image from "../../assets/imageRegister.png"

const SignIn = () => {
  return (
    <section className='grid grid-cols-12 mt-20'>
    <div className='col-span-7 bg-cyan-400/40 w-[800px] h-[700px]'>
      <img src={image} alt="" />
    </div>
    <div className='col-span-5 mt-24 ml-5'>
      <h1 className='font-medium text-5xl'>Log in to Exclusive</h1>
      <p className='mt-8 '>Enter your details below</p>

      <form action="" className='flex flex-col gap-7 mt-9'>
        <div>
          <input 
            required 
            type="email" 
            placeholder='Enter your email' 
            className='border-b-2 border-ransparent outline-none focus:text-primaryColor/80 bg-transparent py-3 '
          />
        </div>
        <div>
          <input 
            required 
            type="password" 
            placeholder='Enter your password' 
            className='border-b-2 border-ransparent outline-none focus:text-primaryColor/80 bg-transparent py-3'/>
        </div>
        <div className='flex items-center gap-10'>
          <button className='bg-primaryColor mt-3 md:w-[150px] text-gray-200 px-5 py-3 text-sm rounded hover:bg-primaryColor/70 transition-all'>Login</button>
          <p className='text-primaryColor mt-3'>Forget Password?</p>
        </div>
      </form>
    </div>
  </section>
  )
}

export default SignIn;
