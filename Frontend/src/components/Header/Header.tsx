import React from 'react'
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';

const Header = () => {
  return (
    <div className="py-4 top-0 sticky z-10 bg-white shadow-lg font-karla">
      <div className='container flex justify-between mx-auto'>
        <Link
          to={paths.home}
          className='font-bold text-2xl'
        >
          Exclusive
        </Link>
        <ul className='flex items-center gap-10 px-4'>
          <Link
            to={paths.home}
            className=''
          >
            Home
          </Link>
          <Link
            to={paths.contact}
            className=''
          >
            Contact
          </Link>
          <Link
            to={paths.about}
            className=''
          >
            About
          </Link>
          <Link
            to={paths.signup}
            className=''
          >
            Sign up
          </Link>
        </ul>
        <div className='flex gap-4 items-center'>
          <Link
            className='flex items-center relative'
          >
            <input
              type="text"
              placeholder='What are you looking for?'
              className='border w-full py-1 px-5 mr-5 rounded-md shadow-sm'
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
          <Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Link>
          <Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;