"use client";

import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useAppDispatch } from '@/redux/store';
import { signIn } from '@/redux/features/auth-slice';

interface SignInFormProps {
    switchToSignUp: () => void,
    closeModal: () => void,
}

export default function SignInForm({switchToSignUp, closeModal}: SignInFormProps) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(''); 
    const [errorPassword, setErrorPassword] = useState(''); 

    const dispatch = useAppDispatch();
 
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorEmail('');
        setErrorPassword('');
        setLoading(true);
        // try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/signin", {
                cache: 'no-cache',
                method: "POST",
                body: JSON.stringify({ email, password}),
                headers: { 'Content-type': 'application/json' }
            })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false); 
                if (data === "Invalid email") {
                    setErrorEmail("Tài khoản không tồn tại!");
                }
                else if (data === "Invalid password" ) {
                    setErrorPassword("Mật khẩu không hợp lệ!");
                } 
                else {
                    dispatch(signIn(data));
                    closeModal();
                }
            })
            .catch((err) => {
                setLoading(false);
                setErrorEmail("Something went wrong!");
                // console.log(err);
            })
        // }
        // catch (err) {
        //     setLoading(false);
        //     // console.log(err);
        // }
    }
    return (
        <>
            <div className='w-full h-[10%] flex justify-between items-center pt-5'>
                <span className='font-black uppercase text-2xl tracking-wider text-[#2f3542]'>Đăng nhập</span>
            </div>
            {loading ? ( 
                <div className='w-full h-[300px] flex items-center justify-center'>
                    <span className='myloading'></span>
                </div>
            ) : (
                <div className='w-full pt-7'>
                      
                            <form onSubmit={handleSignIn}>  
                                <div className='w-full'>
                                    <label htmlFor="username" className='font-normal text-[#646464]'>Email</label>
                                    <input type='email' name="username" placeholder='Email' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={email} onChange={(e) => setEmail(e.target.value)} /> 
                                    <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span>
                                </div>
                                <div className='w-full mb-1'>
                                    <label htmlFor="password" className='font-normal text-[#646464]'>Mật khẩu</label>
                                    <input type='password' name="password" placeholder='Mật khẩu' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={password} onChange={(e) => setPassword(e.target.value)}/> 
                                    <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorPassword}</span>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <div>Chưa có tải khoản? <span className='font-bold underline cursor-pointer' onClick={switchToSignUp}>Đăng ký ngay</span></div>
                                    <span className='linkHover italic cursor-pointer'>Quên mật khẩu?</span>
                                </div>
                                <button type='submit' className='mt-5 uppercase w-full py-4 font-bold rounded-lg bg-dark-yellow hover:bg-light-yellow transition'>Đăng nhập</button>
                                
                            </form>
                            <div className='w-full h-auto flex justify-center items-center mt-4'>
                                <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                                <p className='font-normal text-[#a09898] text-[14px] mx-2 '>Hoặc đăng nhập bằng</p>
                                <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                            </div>
                            <div className='flex justify-center items-center w-full mt-3'>

                            </div> 
                    
                </div>
            )}
        </>
    )
}
