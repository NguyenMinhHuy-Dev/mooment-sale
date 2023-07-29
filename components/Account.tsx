"use client"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import React, { useState, useEffect } from 'react';
import { SignFormModal } from './SignFormModal';

export default function Account() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(isOpen)

    })
  return (
    <>
        <div className='mx-1 cursor-pointer min-w-[100px] px-2 h-[80%] text-[13px] flex justify-center items-center' onClick={(e) => setIsOpen(true)}>
            <AccountCircleOutlinedIcon className='myicon'/>
            <p>Đăng nhập</p>
        </div>
        <SignFormModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}
