import Image from 'next/image'
import React, { useState } from 'react';

import StyleIcon from '@mui/icons-material/Style';

export default function VoucherCard() {
    const [isSaved, setIsSaved] = useState(false);
  return (
    <div className='mycard relative w-[100%] mx-4 bg-white p-[10px]'>
        <div className='relative w-full h-[50%] flex items-center justify-center'> 
            <Image 
                src="/logo-1.png"
                alt="logo"
                width={100}   
                height={100}
                className='object-contain'
            />
            <div className='flex flex-col mr-2'>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
                <div className='w-[3px] h-[3px] rounded-full bg-black my-1'></div>
            </div>
            <div className=''>
                <span className='block font-bold text-[20px] text-black uppercase'>Mã giảm giá 100k</span>
                <span className='text-[16px] font-medium text-[#9b9b9b]'>Đơn tối thiểu 1000000</span>
            </div>
        </div>
        <div className='w-full h-[50px] mt-[30px] p-2 flex items-center justify-between border border-[#d1d1d1]'>
            <span className='text-dark-yellow font-medium'>Hết hạn ngày 31/08/2023</span>
            <button 
                className='px-4 py-1 bg-light-red rounded text-white flex items-center'
                onClick={(e) => {
                    !isSaved && setIsSaved(true)
                }}
            >
                {isSaved ? (
                    <>
                        <span>Đã lưu</span>
                        <StyleIcon className='ml-2'/>
                        <span>+1</span>
                    </>
                ) : 'Lưu'}
            </button>
        </div>
    </div>
  )
}
