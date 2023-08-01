import React from 'react'
import VoucherCard from './VoucherCard';

export default function VouchersSection() {
  return (
    <div className='bg-light-gray mb-[50px] py-[40px]'>
        <div className='mygrid flex flex-wrap items-center justify-center'>
            <VoucherCard />
            <VoucherCard />
            <VoucherCard />
        </div>
    </div>
  )
}
