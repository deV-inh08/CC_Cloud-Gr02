import React from 'react'
import { Categories } from '../../types/categories.type';

interface PropsType {
  categories: Categories[] 
}

const Sidebar = ({categories}: PropsType) => {
  return (
    <section className='flex justify-around'>
      <div className='flex flex-col gap-3'>
        {categories && categories?.slice(0, 11).map((item: Categories, index: number) => {
          return (
            <ul key={index}>
              <li>{item.name}</li>
            </ul>
          )
        })}
      </div>
      <div className='w-[1px] h-[400px] bg-gray-300 -mt-3'></div>
    </section>
    
  )
}

export default Sidebar;
