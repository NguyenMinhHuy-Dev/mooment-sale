import React from 'react'; 
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

export default function AddressCard({ data }: { data: any }) {
  return (
    <div className='w-full h-[60px] flex items-center justify-between my-2 py-3 border-b border-[#d1d1d1]'> 
        <div className='flex items-end'>
            <span className='font-bold text-[14px] mr-3 flex items-end'><HomeRoundedIcon className='!text-[25px] mr-1'/> Nhà riêng</span>
            <span className='font-bold text-[14px] mr-3 flex items-end'><ApartmentRoundedIcon className='!text-[25px] mr-1'/> Văn phòng</span>
            <p className='text-[13px]'>48A, Phường Thới An, Quận 12, Thành phố Hồ Chí Minh</p>
        </div>
        <div className='flex h-[80%] items-center'> 
            <span className='text-[14px] flex items-center justify-center font-medium text-[#16a085] py-1 px-3 border border-[#16a085] bg-[#bae6dd93] rounded-[7px] cursor-default'>Mặc định</span>
            <div className='w-[1px] h-[100%] bg-[#d1d1d1] mx-2'></div>
            <button className='flex items-center justify-center text-[13px] py-1 px-1 mr-1 rounded-[7px]'><BorderColorRoundedIcon /></button>
            <button className='flex items-center justify-center text-[13px] py-1 px-1 rounded-[7px] text-light-red'><DeleteForeverRoundedIcon /></button>
        </div>
    </div>
  )
}
