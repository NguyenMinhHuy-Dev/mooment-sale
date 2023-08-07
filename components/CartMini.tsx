"use client"
import React, { useState, useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Cart } from './CartModal';
import { useAppSelector } from '@/redux/store';

export default function CartMini() {
    const [isOpen, setIsOpen] = useState(false); 
    
    const totalQuantity = useAppSelector((state) => state.cartReducer.totalQuantity);

    return (
        <>
        <div className='min-w-[120px] px-2 h-full cursor-pointer flex justify-center text-[13px] items-center border-b-[2px] border-white hover:border-b-[2px] hover:border-black transition ease-in-out relative' onClick={(e) => setIsOpen(true)}>
            <ShoppingCartOutlinedIcon className='myicon'/>
            <p>Giỏ hàng</p>
            <span className='absolute w-5 h-5 text-xs bg-dark-yellow text-black font-bold rounded-full flex justify-center items-center top-3 left-3'>{totalQuantity}</span>

        </div>
        <Cart isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </>
  )
}
