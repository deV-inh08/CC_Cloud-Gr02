import React from 'react'
import { Product } from '../../types/products.type';
import { paths } from '../../constants/paths';
import { Link } from 'react-router-dom';

interface Props {
  item: Product
};

const ProductItem = ({ item }: Props) => {

  return (
    <article className='flex'>
      <section className='w-[270px] h-[350px] overflow-hidden rounded-md relative'>
        <div className='absolute z-10 w-[50px] h-[25px] bg-primaryColor text-white text-center'>
          -{(item.discountPercentage).toFixed(1)}%
        </div>
        <div className='flex flex-col mt-2 mr-2 gap-3 absolute right-0'>
          <Link>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="heart small">
                <path id="Vector" d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </Link>
          <Link>
            <svg width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Group">
                <path id="Vector" d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path id="Vector_2" d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center relative w-full h-[250px] shadow-md bg-zinc-200/50 overflow-hidden'>
          <img src={item.images[0]} alt="products" className='w-[180px] h-[145px] object-cover' />
          <div className='w-full h-full absolute bg-black/10 flex flex-col-reverse -bottom-20 hover:bottom-0 opacity-0 hover:opacity-100 transition-all duration-55'>
            <Link
              to={paths.cart}
              className='bg-black text-white py-2 px-5 rounded-sm bottom-0 text-center'
            >
              Add To Cart
            </Link>
          </div>
        </div>
        <h3 className='font-medium mt-2'>{item.title}</h3>
        <div className='flex gap-3 mt-2'>
          <p className='text-primaryColor'>{(item.price - Math.floor(item.price) * (item.discountPercentage / 100)).toFixed(2)}</p>
          <p className='text-gray-500 line-through'>${item.price}</p>
        </div>
      </section>
    </article>
  )
};

export default ProductItem;