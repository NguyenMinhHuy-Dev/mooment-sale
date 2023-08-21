import Image from 'next/image'
import React, { useEffect, useState } from 'react';

import StyleIcon from '@mui/icons-material/Style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SignFormModal } from '../Modal/SignFormModal';

export default function VoucherCard({data}: {data: any}) { 
    const [user, setUser] = useState<null | any>({});
    const [isSaved, setIsSaved] = useState(false);
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

    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const userData: any = useAppSelector((state) => state.authReducer.value.user);

    const addToList = async () => {
        if (!isAuth) {
            switchToSignIn();
            return;
        }
        // process.env.NEXT_PUBLIC_API_URL
        await fetch("http://localhost:3001/v1" + "/users/" + user._id + "/vouchers", {
            cache: 'no-cache',
            method: "PUT",
            body: JSON.stringify({id: data?._id}),
            headers: { 'Content-type': 'application/json' }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setIsSaved(true);
        })
        .catch(err => {
            console.log(err);
        })

    }
    
    useEffect(() => { 
        const getUser = async () => {
            // process.env.NEXT_PUBLIC_API_URL
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + userData._id)
            .then((res) => res.json())
            .then((res) => {
              setUser(res);
            })
            .catch(err => {
              console.log(err);
            });
          }
          getUser();
    }, []);
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
                    <span className='block font-bold text-[20px] text-black uppercase'>Mã giảm giá {data?.price/1000}K</span>
                    <span className='text-[16px] font-medium text-[#9b9b9b]'>Đơn tối thiểu {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.condition)}</span>
                </div>
            </div>
            <div className='w-full h-[50px] mt-[30px] p-2 flex items-center justify-between border border-[#d1d1d1]'>
                <span className='text-dark-yellow font-medium'>Hết hạn ngày {(new Date(data?.expDate)).toLocaleString('vi-VN')}</span>
                {isSaved || user?.vouchers?.includes(data?._id) ? ( 
                    <button  className='px-1 py-1 bg-light-red rounded text-white flex items-center'  > 
                        <span>Đã lưu</span>
                        <StyleIcon className='ml-2'/>
                        <span>+1</span> 
                    </button>
                ) : ( 
                    <button 
                        className='px-4 py-1 bg-light-red rounded text-white flex items-center'
                        onClick={addToList}
                    >  
                        Lưu 
                    </button> 
                )}
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
