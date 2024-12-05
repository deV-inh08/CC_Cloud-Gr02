import React from 'react'

const Contact = () => {
  return (
    <div className='container mx-auto'>
      <section className='grid grid-cols-12 mt-[180px]'>
        <div className='col-span-4'>
          <div className='flex flex-col'>
            <article>
              <div className='flex items-center gap-5'>
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="icons-phone">
                    <rect width={40} height={40} rx={20} fill="#DB4444" />
                    <path id="Vector" d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
                <p className='font-medium text-xl'>Call To Us</p>
              </div>
              <p className='mt-5'>We are available 24/7, 7 days a week.</p>
              <p className='mt-5'>Phone: +8801611112222</p>
            </article>
            <div className='h-[1px] bg-gray-500 mt-5'></div>
            <article className='mt-4'>
              <div className='flex items-center gap-5'>
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="icons-mail">
                    <rect width={40} height={40} rx={20} fill="#DB4444" />
                    <path id="Vector" d="M10 13L20 20L30 13M10 27H30V13H10V27Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>

                <p className='font-medium text-xl'>Write To Us</p>
              </div>
              <p className='mt-3'>Fill out our form and we will contact you within 24 hours.</p>
              <p className='mt-3'>Emails: customer@exclusive.com</p>
              <p className='mt-3'>Emails: support@exclusive.com</p>
            </article>
          </div>
        </div>
        <div className='col-span-7 ml-20'>
          <form>
            <div className='flex gap-3'>
              <input 
                type="text"
                placeholder='Your name'
                className='flex-grow py-2 w-[300px] border-b-2 pl-3 outline-none focus:border-b-primaryColor/50'  
              />
              <input 
                type="email"
                placeholder='Your email'
                className='flex-grow py-2 w-[250px] border-b-2 pl-3 outline-none focus:border-b-primaryColor/50'  
              />
              <input 
                type="tel"
                placeholder='Your phone'
                className='flex-grow py-2 w-[300px] border-b-2 pl-3 outline-none focus:border-b-primaryColor/50'  
              />
            </div>
            <div className='relative'>
              <textarea className='mt-10 w-full h-[200px] outline-none text-primaryColor pl-2' name="" id="" placeholder='Your message'></textarea>
              <button type='reset' className='absolute bottom-0 right-0 bg-primaryColor mt-3 md:w-[200px] text-gray-200 px-5 py-3 text-sm rounded hover:bg-primaryColor/70 transition-all'>Send Message</button>
            </div>
          </form>
        </div>
      </section>
    </div>

  )
}

export default Contact;
