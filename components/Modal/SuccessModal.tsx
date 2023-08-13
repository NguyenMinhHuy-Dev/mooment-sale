"use client"

import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

interface AlertProps {
    isOpen: boolean,
    closeModal: () => void,
}

export const Success = ({ isOpen, closeModal }: AlertProps) => {  

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative" onClose={() => {}}>
                <Transition.Child
                    as={Fragment} 
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 z-10 bg-black bg-opacity-10'> 
                    </div>
                </Transition.Child>

                <div className='fixed inset-0 z-[20000000000000000] '>
                    <div className='flex min-h-full items-center justify-center'>
                        <Transition.Child 
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0 scale-75"
                            enterTo="opacity-100 scale-100"
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-75'
                        >
                            <Dialog.Panel className="relative  w-[100vw] h-[100vh] shadow-menu bg-white">
                            <div className='mygrid top-[30px] rounded-[10px] h-[900px] bg-white flex items-center flex-col justify-center'>

                                <CheckCircleRoundedIcon className='checkoutsuccessicon !text-[200px] text-[#27ae60]' />
                                <h1 className='checkoutsuccess font-bold text-[45px] uppercase tracking-widest text-[#27ae60]'>Đặt hàng thành công</h1>
                                <h2 className='font-medium text-[25px] uppercase text-black'>Cảm ơn vì đã mua hàng!</h2>
                                <div className='flex items-center justify-between mt-8'>
                                    <Link href="/" className=' mx-2 flex items-end justify-center py-4 px-5 rounded-[10px] text-[16px] text-black font-bold uppercase hover:text-light-yellow'><HomeRoundedIcon className='myicon'/>Trở lại trang chủ</Link>
                                    <Link onClick={closeModal} href="/tai-khoan?don-hang" className='w-[200px] mx-2 flex items-center justify-center  py-4 px-5 rounded-[10px] text-[16px] font-medium text-base uppercase border-2 border-black bg-white hover:bg-light-gray hover:border-light-gray hover:text-white duration-300'>Xem đơn hàng</Link>
                                </div>
                                <Link href="https://mooment.vercel.app/" className='absolute bottom-0 right-2 tracking-widest text-[16px]'>MOOMENT.COM</Link>
                            </div>  
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}