import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import { CustomButton } from './CustomButton';
import { CategoryHeader } from './CategoryHeader';
import CartMini from './CartMini';

const Navbar = () => { 

  return (
    <header className='shadow-header fixed top-0 w-full h-[70px] bg-white'>
        <nav className='mygrid relative flex justify-between h-full items-center'>
            {/* LOGO */}
            <Link href="/" className='h-full w-[100px] relative'>
                <Image
                    src="/logo-1.png"
                    alt='Mooment Logo'
                    fill
                />
            </Link>

            <div className='ml-[20px] h-full flex-1 flex justify-between items-center'>
              {/* DANH MỤC */}
              <CategoryHeader />

              {/* SEARCH */}
              <div className='mx-[20px] w-full h-[80%] flex justify-between items-center bg-slate-200 rounded-lg overflow-hidden' >
                <input type='text' placeholder='Bạn đang tìm kiếm gì?' className='w-[94%] h-full pl-4  bg-transparent rounded-lg outline-none'/>
                <div className='w-[6%] h-full flex items-center justify-center'>
                <SearchIcon className='cursor-pointer'/>
                </div>
              </div>
            </div>

            <div className='flex justify-between h-full items-center'> 
              {/* HOTLINE */}
              <Link href="tel:0938745593" className='min-w-[120px] px-2 h-full flex justify-center items-center border-b-[2px] border-white hover:border-b-[2px] hover:border-black transition ease-in-out relative'>
                  <HeadsetMicOutlinedIcon className='myicon'/>
                  <p><b>Hotline</b> <br></br> 0938745593</p> 
              </Link>

              {/* CHI NHÁNH */}
              <Link href="/chi-nhanh" className='min-w-[120px] px-2 h-full flex justify-center items-center border-b-[2px] border-white hover:border-b-[2px] hover:border-black transition ease-in-out'>
                  <LocationOnOutlinedIcon className='myicon'/>
                  <p>Chi nhánh</p> 
              </Link>
              
              {/* GIỎ HÀNG */}
              <CartMini />

              <div className='w-[2px] h-[60%] mx-1 bg-[#d1d1d1]'></div>

              {/* USER */}
              <div className='mx-1 cursor-pointer min-w-[100px] px-2 h-[80%] flex justify-center items-center'>
                <AccountCircleOutlinedIcon className='myicon'/>
                <p>Đăng nhập</p>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar