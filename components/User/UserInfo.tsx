import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import SignInForm from '../Auth/SignInForm';

export default function UserInfo() {
    const [userInfo, setUserIInfo] = useState({});
    const user: any = useAppSelector((state) => state.authReducer.value.user);

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState(-1);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const getUser = async () => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id)
            .then((res) => res.json())
            .then((res) => {
                setEmail(res.email);
                setFullName(res.fullName);
                setGender(res.gender);
                setPhoneNumber(res.phoneNumber);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getUser();
    }, []);

    return (
        <div className='w-full h-full flex flex-col'>
            <h1 className='font-bold text-[25px] mb-5'>Thông tin tài khoản</h1>
            <form className='w-[50%] h-full'>    
                <div className='w-full my-2'> 
                    <label htmlFor="fullName" className='font-normal text-[14px]  text-[#646464]'>Họ và tên</label>
                    <input type='text' name="fullName" placeholder='Nguyễn Văn A' className='w-full py-3 pl-4 text-[13px]  bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={fullName} onChange={(e) => setFullName(e.target.value)}/> 
                    {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                </div>
                <div className='w-full my-2'> 
                    <label htmlFor="username" className='font-normal text-[14px]  text-[#646464]'>Email</label>
                    <input type='email' name="username" placeholder='abc@gmail.com' className='w-full py-3 text-[13px] pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={email} onChange={(e) => setEmail(e.target.value)}/> 
                    {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                </div>
                <div className='w-full my-2'> 
                    <label htmlFor="gender" className='font-normal text-[14px]  text-[#646464]'>Giới tính</label>
                    <div className="gender2 w-full flex items-center my-2 pl-2">
                        <label className='mymain relative text-[13px] text-black mr-8 flex items-center cursor-pointer select-none'>
                            <input
                                type="radio"
                                name="gender"
                                // defaultChecked={0}
                                value={0}
                                checked={gender === 0 && true}
                                onChange={(e) => setGender(0)}
                            />
                            <span className='geekmark'></span>
                            <p className='ml-3 text-[15px]'>Nam</p>
                        </label>
                        <label className='mymain relative text-[13px] text-black     flex items-center cursor-pointer select-none'>
                            <input
                                type="radio"
                                name="gender" 
                                value={1}
                                checked={gender === 1 && true}
                                onChange={(e) => setGender(1)}
                            />
                            <span className='geekmark'></span>
                            <p className='ml-3 text-[15px]'>Nữ</p>
                        </label>
                    </div> 
                </div>
                <div className='w-full my-2'> 
                    <label htmlFor="phoneNumber" className='font-normal text-[14px]  text-[#646464]'>Số điện thoại</label>
                    <input 
                        type="tel" 
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }} 
                        name="phoneNumber" 
                        placeholder='123-123-123' 
                        className='w-full py-3 text-[13px] pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' 
                        
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        /> 
                    {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                </div>
                <div className='w-full mt-4 text-right'> 
                    <button className='w-[150px] h-[40px] uppercase text-[14px] font-semibold bg-light-yellow rounded-[10px] text-black'>
                        Lưu thay đổi
                    </button>
                </div>
            </form>

        </div>
    )
}
