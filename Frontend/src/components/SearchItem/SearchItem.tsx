import React from 'react'
import {  Product } from '../../types/products.type';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';

interface searchItemType {
  item: Product
}

const SearchItem = ({ item }: searchItemType) => {
  return (
    <Link to={`${paths.home}${item.id}`} className='bg-white pt-3 hover:bg-slate-200'>
      <p className=' px-5'>{item.title}</p>
      <div className='h-[1px] w-full bg-gray-400 mt-2'></div>
    </Link>
  )
};

export default SearchItem;
