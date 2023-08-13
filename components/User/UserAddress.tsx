import React from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import AddressCard from '../Custom/AddressCard';

export default function UserAddress() {
  return (
    <div className='w-full h-full flex flex-col' >
        <div className='w-full flex justify-between  mb-5 '>
            <h1 className='font-bold text-light-yellow text-[25px]'>Sổ địa chỉ <span className='font-normal text-black text-[16px]'>(Tính năng đang phát triển)</span></h1>
            <span className='flex items-center text-[13px] px-4 py-1 rounded-[10px] bg-dark-yellow hover:bg-light-yellow cursor-pointer font-bold'><AddLocationAltOutlinedIcon className='!text-[20px] mr-1 '/>Thêm địa chỉ mới</span>
        </div>
        <div className='w-full'>
            <AddressCard data={{}}/>
            <AddressCard data={{}}/>
            <AddressCard data={{}}/>
            <AddressCard data={{}}/>
        </div>
    </div>
  )
}
