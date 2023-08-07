
import React, { useState } from 'react'; 

interface SignUpFormProps {
    switchToSignIn: () => void
}

export default function SignUpForm({switchToSignIn}: SignUpFormProps) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorPassword('');
        setErrorConfirmPassword('');
        if (password.length < 6) {
            setErrorPassword("Tối thiểu 6 kí tự!");
            return;
        }
        if (confirmPassword !== password) {
            setErrorConfirmPassword("Mật khẩu trong trùng khớp!");
            return;
        }
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            cache: 'no-cache',
            method: "POST",
            body: JSON.stringify({ email, password, fullName }),
            headers: { 'Content-type': 'application/json' }
        })
        .then((res) => res.json())
        .then((data) => {
            setLoading(false); 
            switchToSignIn();
            // console.log(data, "ok");
        })
        .catch((err) => {  
            setLoading(false); 
            // console.log(err);
        })
    }
    return (
        <>
            <div className='w-full h-[10%] flex justify-between items-center pt-5'>
                <span className='font-black uppercase text-2xl tracking-wider text-[#2f3542]'>Đăng ký</span>
            </div>
            {loading ? (
                <div className='w-full h-[300px] flex items-center justify-center'>
                    <span className='myloading'></span>
                </div>
            ) : (
                <> 
                    <div className='w-full pt-7'>
                        <form onSubmit={handleSignUp}> 
                            <div className='w-full'>
                                <label htmlFor="username" className='font-normal text-[#646464]'>Họ và tên</label>
                                <input type='text' name="fullName" placeholder='Họ và tên' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={fullName} onChange={(e) => setFullName(e.target.value)} /> 
                                <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'></span>
                            </div>
                            <div className='w-full'>
                                <label htmlFor="username" className='font-normal text-[#646464]'>Email</label>
                                <input type='email' name="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required/> 
                                <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'></span>
                            </div>
                            <div className='w-full mb-1'>
                                <label htmlFor="password" className='font-normal text-[#646464]'>Mật khẩu mới</label>
                                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Mật khẩu' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required/> 
                                <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorPassword}</span>
                            </div>
                            <div className='w-full mb-1'>
                                <label htmlFor="password" className='font-normal text-[#646464]'>Xác nhận mật khẩu mới</label>
                                <input type='password' name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  placeholder='Xác nhận mật khẩu' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required/> 
                                <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorConfirmPassword}</span>
                            </div>
                            <div className='w-full flex justify-end items-center'>
                                <div>Đã có tải khoản? <span className='font-bold underline cursor-pointer' onClick={switchToSignIn}>Đăng nhập ngay</span></div>
                                {/* <span className='linkHover italic cursor-pointer'>Quên mật khẩu?</span> */}
                            </div>
                            <button type='submit' className='mt-5 uppercase w-full py-4 font-bold rounded-lg bg-dark-yellow hover:bg-light-yellow transition'>Đăng ký</button>
                            
                        </form>
                        <div className='w-full h-auto flex justify-center items-center mt-4'>
                            <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                            <p className='font-normal text-[#a09898] text-[14px] mx-2 '>Hoặc đăng nhập bằng</p>
                            <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                        </div>
                        <div className='flex justify-center items-center w-full mt-3'>

                        </div>
                    </div> 
                </>
            )}
        </>
    )
}
