import React, { useRef, useState } from 'react'
import ProductApi from '../../api/products.api';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QuantityController from '../../components/QuantityController';
import { Product, ProductList } from '../../types/products.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import ProductItem from '../../components/ProductItem/ProductItem';
import { useDispatch } from 'react-redux';
import { addCart } from '../Cart/CartReducer';
import { paths } from '../../constants/paths';

const ProductDetails = () => {
  const [buyCount, setBuyCount] = useState(1);
  const { id } = useParams();
  const imgRef = useRef<HTMLImageElement>(null);
  const dispath = useDispatch();


  const { data: productDetailData } = useQuery({
    queryKey: ['products', id],
    queryFn: () => ProductApi.getProductDetail(id as string),
    staleTime: 3 * 60 * 1000
  });

  const queryConfig = { category: productDetailData?.data.category as string };
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
        return ProductApi.getProductByCategory(queryConfig.category as ProductList)
    }
  });


  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const react = e.currentTarget.getBoundingClientRect();
    const image = imgRef.current as HTMLImageElement;

    let { naturalHeight, naturalWidth } = image;
    naturalWidth = naturalWidth + 400;
    naturalHeight = naturalHeight + 400;

    const { offsetX, offsetY } = e.nativeEvent;
    const top = offsetY * (1 - naturalHeight / react.height);
    const left = offsetX * (1 - naturalWidth / react.width);

    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";

    image.style.top = top + "px";
    image.style.left = left + "px";
  };

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute("style")
  };

  const handleAddToCart = (product: Product) => {
    const productWithQuantity = {...product, quantity: buyCount}
    dispath(addCart(productWithQuantity))
  }

  return (
    <section className='container mx-auto'>
      <div className='mt-[100px] grid grid-cols-12'>
        {productDetailData?.data && (
          <>
            <div className='col-span-2'>
              <div className='flex flex-col gap-5'>
                {productDetailData?.data.images.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt="product"
                      className='w-[120px] h-[120px] object-cover p-4 bg-gray-800/10'
                    />
                  )
                })}
              </div>
            </div>
            <div className='col-span-4'>
              <div className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in' onMouseMove={handleZoom} onMouseLeave={handleRemoveZoom}>
                <img
                  src={productDetailData?.data.thumbnail}
                  alt={productDetailData?.data.title}
                  className='absolute pointer-events-none top-0 left-0 h-full w-full bg-gray-200 object-cover'
                  ref={imgRef}
                />
              </div>
            </div>
            <div className='col-span-6 ml-20'>
              <div className='flex flex-col'>
                <h3 className='font-medium text-5xl'>{productDetailData?.data.title}</h3>
                <p className='text-green-900 text-md mt-3'>{productDetailData?.data.stock} {productDetailData?.data.availabilityStatus}</p>
                <div className='flex gap-3 mt-3'>
                  <p className='text-primaryColor'>${(productDetailData?.data.price - Math.floor(productDetailData?.data.price) * (productDetailData?.data.discountPercentage / 100)).toFixed(1)}</p>
                  <p className='line-through'>${productDetailData?.data.price}</p>
                </div>
                <p className=' mt-3 text-gray-800 leading-7'>{productDetailData?.data.description}</p>
                <div className='h-[1px] bg-gray-600 my-4'></div>
                <div className='flex items-center mt-4'>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                  ></QuantityController>
                  <Link
                    to={paths.cart}
                    className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-6 capitalize text-white shadow-sm outline-none bg-primaryColor'
                    onClick={() => handleAddToCart(productDetailData.data)}
                  >
                    Buy Now
                  </Link>
                </div>
                <div className='flex flex-col mt-5 gap-5'>
                  <div className='flex border border-black gap-3 py-2 px-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <g clip-path="url(#clip0_261_4843)">
                        <path d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 11.8182H11.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.81836 15.4545H8.48503" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 19.0909H11.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_261_4843">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <p>Free Delivery</p>
                      <p>Enter your postal code for Delivery Availability</p>
                    </div>
                  </div>
                  <div className='flex border border-black gap-3 py-2 px-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <g clip-path="url(#clip0_261_4865)">
                        <path d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_261_4865">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <p>Return Delivery</p>
                      <p>Free 30 Days Delivery Returns. Details</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
      <div className='mt-[100px] '>
      <div className='flex items-center'>
        <div className='w-[20px] h-[40px] bg-primaryColor rounded-md'></div>
        <p className='text-primaryColor ml-3 font-bold'>Related Item</p>
      </div>
      <div className='mt-5'>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {productsData && productsData?.products.map((item: Product, index: number) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem item={item}></ProductItem>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      </div>
    </section>
  )
}

export default ProductDetails;