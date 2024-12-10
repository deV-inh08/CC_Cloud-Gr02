import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';
import { AppContext } from '../../contexts/app.context';
import { useMutation } from '@tanstack/react-query';
import authAPI from '../../api/auth.api';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated} = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: authAPI.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })
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
          <Link to={paths.wishlist}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Link>
          <Link to={paths.cart}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Link>
          {isAuthenticated && (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p></p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Header;