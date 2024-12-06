import React from 'react'
import { ProductListConfig, QueryConfig } from '../../types/products.type';
import { order, sort_by } from '../../constants/product';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { omit } from "lodash"
import classNames from 'classnames';

interface PropsType {
  queryConfig: QueryConfig
}

const SortProductList = ({ queryConfig }: PropsType) => {
  const { sortBy = sort_by.stock } = queryConfig;
  const navigate = useNavigate();
  const location = useLocation()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sortBy'], undefined>) => {
    return sortByValue === sortBy
  };

  const handleSort = (sortByValue: Exclude<ProductListConfig['sortBy'], undefined>) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams(omit(
        {
          ...queryConfig,
          sortBy: sortByValue
        },
        ['order']
      )).toString()
    })
  };

  const handleSortPrice = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams(omit(
        {
          ...queryConfig,
          sortBy: sort_by.price,
          order: orderValue
        },
      )).toString()
    })
  };

  return (
    <div className='bg-gray-300/40 py-5 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <p className='text-primaryColor'>Sort buy</p>
          <button
            className={classNames("h-8 px-4 capitalize text-center", {
                "bg-primaryColor text-white hover:bg-orange/80" : isActiveSortBy(sort_by.rating),
                'bg-white text-black text-sm hover:bg-slate-100': !isActiveSortBy(sort_by.rating)
            })}
            onClick={() => handleSort(sort_by.rating)}
          >
            Rating
          </button>
          <button
            className={classNames("h-8 px-4 capitalize text-center", {
              "bg-primaryColor text-white hover:bg-orange/80" : isActiveSortBy(sort_by.stock),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_by.stock)
          })}
          onClick={() => handleSort(sort_by.stock)}
          >
            Most Popular
          </button>
          <select
            className="h-8 px-4 capitalize text-center bg-white text-black text-sm hover:bg-slate-100"
            name=""
            id=""
            onChange={e => {handleSortPrice(e.target.value as Exclude<ProductListConfig['order'], undefined>)}}
          >
            <option value="">Price</option>
            <option value={order.desc}>Price: hight to low</option>
            <option value={order.asc}>Price: low to hight</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SortProductList;
