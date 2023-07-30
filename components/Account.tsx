"use client"

import React, { useState, useEffect } from 'react';
import { SignFormModal } from './SignFormModal';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppSelector } from '@/redux/store';
import UserHeader from './UserHeader';

export default function Account() {
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const switchToSignIn = async () => {
    await setIsOpen(true)
    await setIsOpenSignIn(true) 
    await setIsOpenSignUp(false);
  } 

  const switchToSignUp = async () => {
    await setIsOpen(true)
    await setIsOpenSignIn(false) 
    await setIsOpenSignUp(true);
  } 
  return (
    <>
        <div 
          className='relative category mx-1min-w-[100px] px-2 h-[100%] text-[13px] flex justify-center items-center' 
          // onClick={(e) => !isAuth && setIsOpen(true)}
        >
        {/* <UserHeader /> */}
            {isAuth ? (
              <UserHeader />
            ) : (
              <>
                <AccountCircleOutlinedIcon className='myicon  cursor-pointer '/>
                <p className=' cursor-pointer '>Đăng nhập</p>

                <div className='mymenu absolute w-[300px] shadow-menu p-4 rounded-lg mt-[5px] top-full  right-0 bg-white'>
                  <span className='block w-full text-left font-semibold'>
                    <WavingHandOutlinedIcon className='myicon'/>
                    Xin chào, vui lòng đăng nhập
                  </span>
                  <div className='flex justify-center items-center mt-4 '>
                    <button className='flex-1 flex items-center justify-center p-2 mr-1 border-2 border-dark-yellow bg-dark-yellow rounded outline-none font-bold hover:bg-light-yellow hover:border-light-yellow' onClick={switchToSignIn}>Đăng nhập</button>
                    <button className='flex-1 flex items-center justify-center p-2 ml-1 border-2 border-[#000] rounded outline-none' onClick={switchToSignUp}>Đăng ký</button>
                  </div>
                  <div className='w-full h-[1px] bg-[#d1d1d1] my-4'></div>
                  <span className=' w-full text-left font-medium hover:text-[#f39c12] cursor-pointer'>
                    <HelpOutlineOutlinedIcon className='myicon'/>
                    Trợ giúp
                  </span>
                </div>
              </>
            )}
        </div>
        <SignFormModal 
          isOpen={isOpen} 
          closeModal={() => setIsOpen(false)} 

          isOpenSignIn={isOpenSignIn} 
          switchToSignIn={switchToSignIn} 

          isOpenSignUp={isOpenSignUp} 
          switchToSignUp={switchToSignUp} 
        />
    </>
  )
}
