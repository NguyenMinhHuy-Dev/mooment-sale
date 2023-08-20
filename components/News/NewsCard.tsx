import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import ImageFaded from '../Loading/ImageFaded'

export default function NewsCard({data, img}: {data: any, img: any}) {
   

    return ( 
        <div className='w-full'>  
            <Link href={data?.link} target='_blank' className='block w-full badge'>
                <div className='w-full relative  aspect-[4/3] rounded-[10px] overflow-hidden'> 
                    <ImageFaded 
                        src="/logo-1.png"
                        className="w-full h-full object-cover rounded-[10px] transition-all hover:scale-110"
                        alt={"news"}
                    />
                    <div className='overflow-hidden w-[90%] bottom-[10px] py-2 px-4 flex items-center backdrop-blur-md bg-black/30 rounded-[100px] h-[60px] absolute z-[1] left-[50%] translate-x-[-50%]'>
                        <span className='line-clamp-2 overflow-hidden whitespace-pre-wrap text-white text-[13px] font-bold'>{data?.title}</span>
                    </div>
                </div>
                <div className='block w-full mt-1 overflow-hidden  p-2 rounded-[10px] '>
                    <span className='line-clamp-3 font-semibold overflow-hidden whitespace-pre-wrap text-black text-justify text-[15px]'>
                    {data?.description}
                    </span>
                </div>
            </Link>
        </div> 
    )
}
