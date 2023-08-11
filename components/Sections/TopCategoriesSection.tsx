import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TopCategoriesSection() {
  return (
    <div className='mygrid flex items-center justify-center relative mt-[75px]'>
        <div className='relative w-[150px] h-[150px] rounded-full border-2 overflow-hidden border-[#d1d1d1] drop-shadow-xl'>
          <Link href="/loai-san-pham"> 
            <Image 
              src="https://bizweb.dktcdn.net/thumb/small/100/438/322/collections/f0048a3ee665ce54d0dd82cc89ddc026.jpg?v=1634229637710"
              alt="Top category"
              fill
              className='object-cover'
            />
          </Link>
        </div>
    </div>
  )
}
