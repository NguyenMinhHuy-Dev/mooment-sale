import Link from 'next/link'
import React from 'react';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'; 
import ImageFaded from './ImageFaded';
import NewsCard from './NewsCard';

export default function NewsSection() {
  return (
    <div className='mygrid mb-[50px]'>
        <div className='w-full flex items-center justify-between py-2 px-4 bg-white shadow-threed rounded-[10px]'>
            <h2 className='font-bold text-[27px]'>Tin tức công nghệ</h2>
            <Link href="/tin-tuc" className='flex items-center text-[13px] badge hover:text-light-yellow'>
                Xem thêm 
                <OpenInNewRoundedIcon className='myicon ml-1 !mr-0 !text-[20px]'/>
            </Link>
        </div> 
        <div className='w-full grid grid-cols-4 gap-4 mt-3'>
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </div>
    </div>
  )
}
