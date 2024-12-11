import React from 'react'
import InputNumber from '../InputNumber';

interface QuantityCart {
  value: string
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
}

export const QuantityCart = ({  value, onIncrease, onDecrease }: QuantityCart) => {
  return (
    <div className={"flex items-center"}>
        <button  className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
        </button>
        <InputNumber
            value= {value}
            className='' 
            classNameError='hidden' 
            classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center outline-none'
        >
        </InputNumber>
        <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    </div>
)
}
export default QuantityCart;
