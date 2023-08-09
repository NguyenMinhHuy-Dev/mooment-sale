"use client"

import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface AlertProps {
    isOpen: boolean,
    closeModal: () => void,
}

export const Alert = ({ isOpen, closeModal }: AlertProps) => {

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative" onClose={closeModal}>
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
                            <Dialog.Panel className="relative overflow-y-auto  min-w-[400px] rounded-lg shadow-menu h-[300px] bg-white px-4">
                                <button type="button" onClick={closeModal} className="absolute top-4 right-4 border-2 border-[#2f3542] rounded hover:bg-[#2f3542] hover:text-white transition"><CloseRoundedIcon /></button>

                                <div className='w-full h-full flex items-center justify-center flex-col'>
                                    <NoAccountsOutlinedIcon className="!text-[150px] mb-3 block text-light-red shadow-card rounded-lg" />
                                    <span className='block mygradienttitle text-[20px]'>Bạn cần đăng nhập vào tài khoản</span>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}