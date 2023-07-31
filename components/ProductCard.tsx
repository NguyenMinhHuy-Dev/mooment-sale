import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function ProductCard({ isFlashsale }: { isFlashsale: boolean }) {
  return (
    <div className='w-full overflow-hidden relative rounded-[10px] bg-white'>
        <div className='relative w-full z-0 aspect-square rounded-[10px] overflow-hidden'>
            <Link href="/san-pham" className='w-full aspect-square rounded-[10px]'>
                <Image 
                    src="https://bizweb.dktcdn.net/thumb/large/100/438/322/products/img-6846.jpg?v=1690496709043"
                    alt='product'
                    fill
                    className='object-cover rounded-[10px] transition-all hover:scale-110'
                />
            </Link> 
            <div className='absolute z-[1] w-[130px] h-[30px] top-2 right-[-95px] badge flex items-center justify-start cursor-pointer p-2 rounded-s mb-1 backdrop-blur-sm bg-black/30 transition-all hover:right-0'>
                <ShoppingCartOutlinedIcon className='myicon mr-1 text-[20px] text-white '/>
                <span className='text-[13px] text-white '>Thêm vào giỏ</span>
            </div> 
            <div className='absolute z-[1] w-[110px] h-[30px] top-12 right-[-75px] badge flex items-center justify-start cursor-pointer p-2 rounded-s mb-1 backdrop-blur-sm bg-light-red/30 transition-all hover:right-0'> 
                {/* <FavoriteRoundedIcon className='myicon mr-1 text-[20px] text-white '/> */}
                <FavoriteBorderRoundedIcon className='myicon love mr-1 !text-[20px] text-black '/>
                <span className='text-[13px] love text-black '>Yêu thích</span>
            </div> 
        </div> 

        <div className='relative z-[1] py-2 w-full h-[100px] flex flex-col justify-between'>
            <div className='w-full flex justify-between'>
                <div className="overflow-hidden w-90% h-[45px]">
                    <Link href="/san-pham" className="font-medium text-[16px] leading-5 line-clamp-2 overflow-hidden whitespace-pre-wrap hover:text-light-yellow">
                        [GB] Leviatán Keyboard Kit
                    </Link>
                    
                </div> 
                <span className='text-[13px] text-[#e84393] rounded font-bold uppercase ml-2 border h-[20px] px-1'>Mới</span>
            </div>
            
            <div className='w-full flex'>
                <div className='w-[50%]'>
                    <span className='font-bold text-[16px] text-light-red'>11.300.000₫</span>
                    <span className='line-through text-[13px] block'>13.300.000₫</span>
                </div>
                <div className='w-[50%] text-right'> 
                    <span className='text-light-red text-[13px] font-bold p-2 border border-light-red rounded bg-[#ebcac6a6]'>-12%</span>
                </div>
            </div>
        </div>
        {isFlashsale && (
            
            <div className='relative z-[1] mt-2  w-full  rounded-[20px] flex items-center justify-center h-[25px] border-2 border-[#f39c12] bg-[#f39d127a]'>
                <span className='relative z-[3] font-bold text-black text-[13px]'>Đã bán 10</span>
                <div className='myprogressbar absolute z-[2] top-0 left-0 w-[90%] h-full rounded-[20px] bg-[#f39c12] border-2 border-[#f39c12] flex items-center justify-end'>
                    <div className='relative z-[2] myfire w-[30px] h-[30px] rotate-45 rounded'>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
