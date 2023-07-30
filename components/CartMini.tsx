"use client"
import React, { useState, useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Cart } from './CartModal';

export default function CartMini() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(isOpen)

    })

    return (
        <>
        <div className='min-w-[120px] px-2 h-full cursor-pointer flex justify-center text-[13px] items-center border-b-[2px] border-white hover:border-b-[2px] hover:border-black transition ease-in-out relative' onClick={(e) => setIsOpen(true)}>
            <ShoppingCartOutlinedIcon className='myicon'/>
            <p>Giỏ hàng</p>
            <span className='absolute w-5 h-5 text-xs bg-dark-yellow text-black font-bold rounded-full flex justify-center items-center top-3 left-3'>1</span>

        </div>
        <Cart isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </>
  )
}
