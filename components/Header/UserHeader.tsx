import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'; 
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logOut } from '@/redux/features/auth-slice';
import Link from 'next/link';

export default function UserHeader() {
    const user: any = useAppSelector((state) => state.authReducer.value.user);

    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        dispatch(logOut());    
    }

    return (
        <>
            <Link href="/tai-khoan" className='spanHover flex items-center justify-center h-full'>
                <AccountCircleOutlinedIcon className='linkIcon myicon  cursor-pointer'/>
                <span className="cursor-pointer font-bold">{user.fullName}</span>
            </Link>
            <div className='mymenu absolute w-[270px] shadow-menu p-4 rounded-lg  mt-[5px] top-full  right-0 bg-white'>
                <span className='block w-full text-left font-semibold'>
                    <WavingHandOutlinedIcon className='myicon'/>
                    Xin chào, {user.fullName}
                </span>
                <div className='w-full h-[1px] bg-[#d1d1d1] my-4'></div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover'>
                    <Link href="/tai-khoan" className='flex w-full h-full items-center justify-start'>
                        <FolderSharedOutlinedIcon className='myicon'/>
                        Thông tin tài khoản
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover'>
                    <Link href='/tai-khoan?don-hang' className='flex w-full h-full items-center justify-start'>
                        <LocalShippingOutlinedIcon className='myicon'/>
                        Đơn hàng của tôi
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover'>
                    <Link href="/tai-khoan?ma-giam-gia" className='flex w-full h-full items-center justify-start'>
                        <StyleOutlinedIcon className='myicon'/>
                        Kho voucher
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover'>
                    <Link href="/tai-khoan?yeu-thich" className='flex w-full h-full items-center justify-start'>
                        <InterestsOutlinedIcon className='myicon'/>
                        Danh sách yêu thích
                    </Link>
                </div>
                
                {/* <div className='flex w-full h-[40px] items-center justify-start boldOnHover'>
                    <Link href="/tai-khoan/da-xem" className='flex w-full h-full items-center justify-start'>
                        <RemoveRedEyeOutlinedIcon className='myicon'/>
                        Đã xem gần đây
                    </Link>
                </div> */}

                <div className='w-full h-[1px] bg-[#d1d1d1] my-4'></div>

                <div className='flex w-full h-[40px] items-center justify-start mydiv'>
                    <button className='mybutton flex w-full h-full items-center justify-start' onClick={handleLogOut}>
                        <MeetingRoomOutlinedIcon className='myicon'/>
                        Đăng xuất
                    </button>
                </div>

            </div>
        </>
    )
}
