import React from 'react'
import { Categories } from '../../types/categories.type';
import { QueryConfig } from '../../types/products.type';
import classNames from 'classnames';
interface PropsType {
  categories: Categories[]
  sliceStart: number
  sliceEnd: number
  queryConfig?: QueryConfig,
  onCategoryClick: (category: string) => void;
}

const Sidebar = ({ categories, sliceStart = 0, sliceEnd, onCategoryClick, queryConfig }: PropsType) => {
  const category = queryConfig?.category;
  return (
    <section className='flex justify-around'>
      <ul className='flex flex-col gap-3'>
        {categories && categories?.slice(sliceStart, sliceEnd).map((item: Categories, index: number) => {
          const isActive = category === item.slug
          return (
            <li
              className='cursor-pointer'
              key={index}>
              <a
               className={classNames("relative px-2", {
                'flex items-center text-primaryColor': isActive
              })}
                onClick={() => onCategoryClick(item.slug)}
              >
                {isActive && (
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-orange h-4 w-4 absolute -left-2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                )}
                 
                {item.slug}
               
              </a>

            </li>
          )
        })}
      </ul>
      {sliceEnd && (
        <div className='w-[1px] h-[400px] bg-gray-300 -mt-3'></div>
      )}
    </section>

  )
}

export default Sidebar;
