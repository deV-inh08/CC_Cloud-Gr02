import React, { useContext } from 'react'
import { Product } from '../../types/products.type';
import { paths } from '../../constants/paths';
import { Link } from 'react-router-dom';
import ProductRating from '../ProductRating';
import { addCart } from '../../pages/Cart/CartReducer';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { AppContext } from '../../contexts/app.context';

interface Props {
  item: Product
};

const ProductItem = ({ item }: Props) => {
  const { isAuthenticated } = useContext(AppContext)
  const BUYCOUNT: number = 1;

  const dispath = useDispatch();
  
  const handleAddToCartOneProduct = (product: Product, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if(isAuthenticated) {
      const productWithQuantity = {...product, quantity: BUYCOUNT}
      dispath(addCart(productWithQuantity));
      toast.success("Add To Cart Success", { autoClose: 1000 })
    }
    toast.error("Please sign in to continute", { autoClose: 1000 })
  };
  
  return (
    <Link to={`${paths.home}${item.id}`}>
      <article className='flex select-none'>
        <section className='rounded-md relative w-[250px] h-[400px] flex flex-col'>
          <div className='absolute z-10 w-[50px] h-[25px] bg-primaryColor text-white text-center'>
            -{(item.discountPercentage).toFixed(1)}%
          </div>
          <div className='flex flex-col mt-2 mr-2 gap-3 absolute right-0'>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="heart small">
                <path id="Vector" d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <svg width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Group">
                <path id="Vector" d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path id="Vector_2" d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <div className='flex flex-col items-center justify-center relative w-full h-[250px] shadow-md bg-zinc-200/50 overflow-hidden'>
            <img src={item.images[0]} alt="products" className='w-[180px] h-[145px] object-cover' />
            <div className='w-full h-full absolute bg-black/10 flex flex-col-reverse -bottom-20 hover:bottom-0 opacity-0 hover:opacity-100 transition-all duration-55'>
              <button
                className='bg-black text-white py-2 px-5 rounded-sm bottom-0 text-center'
                onClick={(e) => handleAddToCartOneProduct(item, e)}
              >
                Add To Cart
              </button>
            </div>
          </div>
          <h3 className='font-medium mt-2'>{item.title}</h3>
          <div className='flex gap-3 mt-2'>
            <p className='text-primaryColor'>${(item.price - Math.floor(item.price) * (item.discountPercentage / 100)).toFixed(1)}</p>
            <p className='text-gray-500 line-through'>${item.price}</p>
          </div>
          <div className='flex gap-2 mt-2 items-center text-sm text-gray-600'>
            <ProductRating></ProductRating>
            <span>{item.rating}</span>
            <div className='h-[15px] w-[1px] bg-gray-400'></div>
            <div className=''>
              <span>{item.stock}k</span>
              <span className='ml-1'>sold</span>
            </div>
          </div>
        </section>
      </article>
    </Link>
  )
};

export default ProductItem;
