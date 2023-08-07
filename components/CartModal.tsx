"use client"
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Dialog, Transition } from '@headlessui/react';
// import { fetchProducts } from '@/utils';
import Image from 'next/image';

import { useAppDispatch } from '@/redux/store'; 
import { addItem, deleteItems, removeItems } from '@/redux/features/cart-slice';
import { useAppSelector } from '@/redux/store';

interface CartProps {
    isOpen: boolean,
    closeModal: () => void,
}

let VND = new Intl.NumberFormat('vn-VI', {
    style: 'currency',
    currency: 'VND'
})

export const Cart = ({ isOpen, closeModal }: CartProps) => {  
    
    const dispatch = useAppDispatch(); 
    const products = useAppSelector((state) => state.cartReducer.cartItems);
    const totalPriceCart = useAppSelector((state) => state.cartReducer.totalAmount);

    const deleteFromCart = (_id: any) => {
        dispatch(deleteItems(_id))
    }
    const removeFromCart = (data: any) => {
        dispatch(removeItems({
            _id: data._id,
            name:data.name,
            slug: data.slug,
            salePrice: data.salePrice,
            imageUrl: data.imageUrl,
        }))
    }
    const addToCart =(data: any)=>{
        dispatch(
            addItem({
                _id: data._id,
                name:data.name,
                slug: data.slug,
                salePrice: data.salePrice,
                imageUrl: data.imageUrl,
            })
        );   
    };

    useEffect(() => {
        // const getProducts = async () => {
        //     await fetch(process.env.NEXT_PUBLIC_API_URL + '/products')
        //     .then(res => res.json())
        //     .then(res => {
        //         setProducts(res); 
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // }
        // getProducts();
    },[])
    

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative " onClose={closeModal}>
                    <Transition.Child
                        as={Fragment} 
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-10'> 
                        </div>
                    </Transition.Child>

                    <div className="fixed inset-0 z-[2000000000001] ">
                        <div className='flex min-h-full items-center justify-end text-center'>
                            <Transition.Child 
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="translate-x-[100%]"
                                enterTo="translate-x-[0]"
                                leave='ease-in duration-200'
                                leaveFrom='translate-x-[0]'
                                leaveTo='translate-x-[100%]'
                            >
                                <Dialog.Panel className="relative overflow-y-auto right-0 top-0 p-4 shadow-menu w-full max-w-[500px] h-[100vh] bg-white">
                                    <div className='w-full h-[10%] flex justify-between items-center'>
                                        <span className='font-bold text-2xl cursor-default'>My cart</span>
                                        <button type="button" onClick={closeModal} className="top-4 right-4 p-2 border-2 border-black rounded hover:bg-black hover:text-white transition"><CloseRoundedIcon /></button>
                                    </div>

                                    {products.length === 0 ? (
                                        <div className='w-full h-[71%] text-center'>
                                            <ProductionQuantityLimitsRoundedIcon className='w-full text-[120px] block text-center'/>
                                            <span className='font-medium text-[25px] block w-full text-center mt-5'>Giỏ hàng của bạn đang trống!</span>
                                        </div>
                                    ) : ( 
                                        <>
                                            <ul className='w-full h-[71%] text-center overflow-y-auto'>
                                                {products?.map((product: any) => 
                                                    <div key={product._id}>
                                                        <li className='flex justify-between items-center w-full h-[100px]  p-[10px]'>
                                                            <div className='w-[65px] h-[65px] relative '> 
                                                                <Image 
                                                                    src={product?.imageUrl}
                                                                    alt={product?.imageUrl}
                                                                    fill
                                                                    className='object-fill rounded border border-[#5f5f5f]'
                                                                    // fill
                                                                />   
                                                                <div onClick={(e) => {
                                                                    deleteFromCart(product._id)
                                                                }} className='absolute top-[-10px] right-[-10px] flex justify-center items-center bg-[#aeaeae] w-[20px] h-[20px] rounded-full cursor-pointer'>
                                                                    <CloseRoundedIcon className='text-black !text-[12px]'/>
                                                                </div>
                                                            </div>

                                                            <div className='w-[50%] h-[60px] text-justify'>
                                                                <div className='text-left overflow-hidden w-full h-[40px] '>
                                                                    <span className='font-medium text-[18px] leading-5 line-clamp-2 overflow-hidden whitespace-pre-wrap'> 
                                                                        {product.name}
                                                                    </span>
                                                                </div>
                                                                <span className='w-full h-[20px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}</span>
                                                            </div>

                                                            <div className='w-[30%] h-[60px]'>
                                                                <span className='inline-block w-full h-[20px] pr-2 text-end font-semibold'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.totalPrice)}</span>
                                                                <div className='flex justify-between items-center w-full h-[40px] rounded-full overflow-hidden border border-[#5f5f5f]'>
                                                                    <button onClick={(e) => {
                                                                        if (product.quantity === 1) {
                                                                            deleteFromCart(product._id)
                                                                        }
                                                                        else {
                                                                            removeFromCart(product)
                                                                        }
                                                                    }} className='flex justify-center items-center w-[30%] h-full '><RemoveRoundedIcon /></button>
                                                                    <span className='w-[40$] h-full flex justify-center items-center'>{product.quantity}</span>
                                                                    <button onClick={(e) => addToCart(product)} className='flex justify-center items-center w-[30%] h-full '><AddRoundedIcon /></button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <div className='w-full h-[1px] my-1 bg-[#d1d1d1]'></div>   
                                                    </div>
                                                )}  
                                                
                                            </ul>
                                        
                                            <div className='w-full h-[1%] text-center bg-white'></div>

                                            <div className='w-full h-[18%] text-center'>
                                                <div className='w-full p-1 flex justify-between items-center border-b border-[#d1d1d1]'>
                                                    <span className='font-normal text-[#5f5f5f]'>Phí vận chuyển</span>
                                                    <span className='font-bold text-lg'>Cần thanh toán để biết</span>
                                                </div>
                                                <div className='w-full p-1 my-3 flex justify-between items-center border-b border-[#d1d1d1]'>
                                                    <span className='font-normal text-[#5f5f5f]'>Tổng tiền</span>
                                                    <span className='font-bold text-lg'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceCart)}</span>
                                                </div> 
                                                <button className='w-full py-[10px] outline-none rounded-full bg-dark-yellow text-[#000000ca] font-bold text-lg hover:bg-light-yellow hover:text-[#000]'>Thanh toán</button>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
 