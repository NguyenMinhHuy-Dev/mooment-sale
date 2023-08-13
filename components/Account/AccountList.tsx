"use client"

import React, { useState, useEffect } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'; 
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logOut } from '@/redux/features/auth-slice';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Link from 'next/link';
import UserInfo from '../User/UserInfo';
import { SignFormModal } from '../Modal/SignFormModal';
import UserAddress from '../User/UserAddress';
import UserOrder from '../User/UserOrder';

export default function AccountList() { 
    const params = useSearchParams();
    const [tab, setTab] = useState('');
    const user: any = useAppSelector((state) => state.authReducer.value.user);
 
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);

    const switchToSignIn = async () => {
        await setIsOpen(true)
        await setIsOpenSignIn(true) 
        await setIsOpenSignUp(false);
    } 

    const switchToSignUp = async () => {
        await setIsOpen(true)
        await setIsOpenSignIn(false) 
        await setIsOpenSignUp(true);
    } 

    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        dispatch(logOut());    
    } 
 
    useEffect(() => {
        if (user.email === undefined) {
            switchToSignIn();
        }
        const getTab = async () => { 
            if (typeof(params.get('don-hang')) === 'string') {
                await setTab('don-hang')
            }
            else if (typeof(params.get('so-dia-chi')) === 'string') {
                await setTab('so-dia-chi')
            }
            else if (typeof(params.get('ma-giam-gia')) === 'string') {
                await setTab('ma-giam-gia')
            }
            else if (typeof(params.get('yeu-thich')) === 'string') {
                await setTab('yeu-thich')
            }
            else if (typeof(params.get('da-xem')) === 'string') {
                await setTab('da-xem')
            }
            else {
                await setTab('')
            }
        } 
        getTab();
    }, [params]);

    return (
        <div className='mygrid flex justify-between'>
            <div className='w-[21%] h-[600px] p-5 rounded-[10px] bg-light-gray shadow-menu'>
                <div className='w-full text-center'>
                    <AccountCircleRoundedIcon className='!text-[100px] text-[#504e4e]'/>
                    <span className='block w-full mt-2 text-center text-white text-[15px] font-semibold'>
                        <WavingHandOutlinedIcon className='myicon'/>
                        Xin chào, {user.fullName}
                    </span>
                </div>

                <div className='w-[100%] my-3 h-[1px] bg-[#5f5959] mx-auto'></div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href="/tai-khoan" className={`flex w-full h-full  items-center text-[14px] justify-start ${tab === '' ? "text-light-yellow" : "text-white"}`}>
                        <FolderSharedOutlinedIcon className='myicon'/>
                        Thông tin tài khoản
                    </Link>
                </div>
                
                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href="/tai-khoan?so-dia-chi" className={`flex w-full h-full items-center text-[14px] justify-start ${tab === 'so-dia-chi' ? "text-light-yellow" : "text-white"}`}>
                        <FmdGoodOutlinedIcon className='myicon'/>
                        Sổ địa chỉ
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href='/tai-khoan?don-hang' className={`flex w-full h-full  items-center text-[14px] justify-start ${tab === 'don-hang' ? "text-light-yellow" : "text-white"}`}>
                        <LocalShippingOutlinedIcon className='myicon'/>
                        Đơn hàng của tôi
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href="/tai-khoan?ma-giam-gia" className={`flex w-full h-full  items-center text-[14px] justify-start ${tab === 'ma-giam-gia' ? "text-light-yellow" : "text-white"}`}>
                        <StyleOutlinedIcon className='myicon'/>
                        Kho voucher
                    </Link>
                </div>

                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href="/tai-khoan?yeu-thich" className={`flex w-full h-full  items-center text-[14px] justify-start ${tab === 'yeu-thich' ? "text-light-yellow" : "text-white"}`}>
                        <InterestsOutlinedIcon className='myicon'/>
                        Danh sách yêu thích
                    </Link>
                </div>
                
                <div className='flex w-full h-[40px] items-center justify-start boldOnHover my-2'>
                    <Link href="/tai-khoan?da-xem" className={`flex w-full h-full  items-center text-[14px] justify-start ${tab === 'da-xem' ? "text-light-yellow" : "text-white"}`}>
                        <RemoveRedEyeOutlinedIcon className='myicon'/>
                        Đã xem gần đây
                    </Link>
                </div>

                
                <div className='w-[100%] my-3 h-[1px] bg-[#5f5959] mx-auto'></div>
                
                <div className='flex w-full h-[40px] items-center justify-start mydiv'>
                    <button className='mybutton flex w-full h-full items-center justify-start text-white' onClick={handleLogOut}>
                        <MeetingRoomOutlinedIcon className='myicon'/>
                        Đăng xuất
                    </button>
                </div>
            </div>
            <div className='w-[78%] min-h-[600px] py-5 px-3 rounded-[10px] bg-white shadow-menu'> 
                {user.email !== undefined && <>
                     {tab === '' && <UserInfo />}
                     {tab === 'so-dia-chi' && <UserAddress />}
                     {tab === 'don-hang' && <UserOrder />}
                </>}
            </div>

            
            <SignFormModal 
                isOpen={isOpen} 
                closeModal={() => setIsOpen(false)} 

                isOpenSignIn={isOpenSignIn} 
                switchToSignIn={switchToSignIn} 

                isOpenSignUp={isOpenSignUp} 
                switchToSignUp={switchToSignUp} 
            />
        </div>
    )
}
