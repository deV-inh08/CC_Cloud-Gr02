import React from 'react'
import { Product } from '../../types/products.type';

interface Props {
  item: Product
};

const ProductItem = ({ item }: Props) => {
  return (
    <article className='flex'>
      <section className='w-[270px] h-[350px] overflow-hidden rounded-md'>
        <div className='flex items-center justify-center w-[220px] h-[250px] bg-zinc-200/50 shadow-lg'>
          <img src={item.images[0]} alt="products" className='w-[180px] h-[145px] object-cover ' />
        </div>
        <h3 className='font-bold'>{item.title}</h3>
        <div className='flex'>
          <p className='text-primaryColor'>$120</p>
          <p className='text-gray line-through'>$120</p>
        </div>
      </section>
    </article>
  )
};

export default ProductItem;
