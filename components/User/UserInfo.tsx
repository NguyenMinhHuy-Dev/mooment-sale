import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import SignInForm from '../Auth/SignInForm';
import { signIn } from '@/redux/features/auth-slice';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function UserInfo() {
    const [userInfo, setUserIInfo] = useState({});
    const user: any = useAppSelector((state) => state.authReducer.value.user);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState(-1);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // const getUser = async () => {
        //     await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setEmail(res.email);
        //         setFullName(res.fullName);
        //         setGender(res.gender);
        //         setPhoneNumber(res.phoneNumber);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        // }
        // getUser();
        
        setEmail(user.email);
        setFullName(user.fullName);
        setGender(user.gender);
        setPhoneNumber(user.phoneNumber);
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!isChangePassword) {
        
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id, {
                cache: 'no-cache',
                method: "PUT",
                body: JSON.stringify({ gender, phoneNumber, isChangePassword }),
                headers: { 'Content-type': 'application/json' }
            })
            .then((res) => res.json())
            .then((res) => { 
                setLoading(false);
                setIsSuccess(true);
                dispatch(signIn(res));
                setTimeout(() => setIsSuccess(false), 3000);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        }
        else {
            if (newPassword.length < 6) {
                setErrorPassword("Mật khẩu mới phải tối thiểu 6 kí tự!");
                return;
            }
            if (confirmPassword !== newPassword) {
                setErrorPassword("Mật khẩu trong trùng khớp!");
                return;
            }
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id, {
                cache: 'no-cache',
                method: "PUT",
                body: JSON.stringify({ isChangePassword, oldPassword, newPassword }),
                headers: { 'Content-type': 'application/json' }
            })
            .then((res) => res.json())
            .then((res) => { 
                if (res === "Invalid password") {
                    setErrorPassword("Mật khẩu cũ không tồn tại!");
                }
                else {
                    setIsSuccess(true);
                    setIsChangePassword(false);
                    dispatch(signIn(res));
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setTimeout(() => setIsSuccess(false), 3000);
                }
                setLoading(false);
                setErrorPassword('');
            })
            .catch((err) => {
                setLoading(false);
                setIsChangePassword(false);
                console.log(err);
            });
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <h1 className='font-bold text-light-yellow text-[25px] mb-5'>Thông tin tài khoản</h1>
            {isSuccess ? ( 
                <div className='mygrid top-[30px] rounded-[10px] h-[900px] bg-white flex items-center flex-col justify-center'>
                    <CheckCircleRoundedIcon className='checkoutsuccessicon mb-[30px] !text-[100px] text-[#27ae60]' />
                    <h1 className='checkoutsuccess font-bold text-[35px] uppercase tracking-widest text-[#27ae60]'>Thay đổi thành công!</h1>
                </div>  
            ) : ( 
                !loading ? ( 
                    !isChangePassword ? (

                        <form onSubmit={onSubmit} className='mx-auto w-[50%] h-full'>    
                            <div className='w-full my-2'> 
                                <label htmlFor="fullName" className='font-normal text-[14px]  text-[#646464]'>Họ và tên</label>
                                <input disabled type='text' name="fullName" placeholder='Nguyễn Văn A' className='w-full py-3 pl-4 text-[13px]  bg-[#dadada] rounded-lg outline-[#d1d1d1]' required value={fullName} onChange={(e) => setFullName(e.target.value)}/> 
                                {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                            </div>
                            <div className='w-full my-2'> 
                                <label htmlFor="username" className='font-normal text-[14px]  text-[#646464]'>Email</label>
                                <input disabled type='email' name="username" placeholder='abc@gmail.com' className='w-full py-3 text-[13px] pl-4 bg-[#dadada] rounded-lg outline-[#d1d1d1]' required value={email} onChange={(e) => setEmail(e.target.value)}/> 
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
                                            value={gender}
                                            checked={gender === 0 ? true : false}
                                            onChange={(e) => setGender(0)}
                                        />
                                        <span className='geekmark'></span>
                                        <p className='ml-3 text-[15px]'>Nam</p>
                                    </label>
                                    <label className='mymain relative text-[13px] text-black     flex items-center cursor-pointer select-none'>
                                        <input
                                            type="radio"
                                            name="gender" 
                                            value={gender}
                                            checked={gender === 1 ? true : false}
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
                            <div className='w-full mt-4 flex items-center justify-between'> 
                                <span onClick={(e) => setIsChangePassword(true)} className='w-[150px] flex items-center justify-center cursor-pointer h-[40px] uppercase bg-transparent border border-light-yellow rounded-[10px] text-light-yellow text-[14px] font-semibold'>Đổi mật khẩu</span>
                                <button className='w-[150px] h-[40px] uppercase text-[14px] font-semibold bg-light-yellow rounded-[10px] text-black'>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={onSubmit} className='mx-auto w-[50%] h-full' >
                            <div className='w-full my-2'> 
                                <label htmlFor="oldPass" className='font-normal text-[14px]  text-[#646464]'>Mật khẩu cũ</label>
                                <input type='password' name="oldPass" placeholder='xxxxxxxx' className='w-full py-3 pl-4 text-[13px]  bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/> 
                                {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                            </div>
                            <div className='w-full my-2'> 
                                <label htmlFor="newPassword" className='font-normal text-[14px]  text-[#646464]'>Mật khẩu mới</label>
                                <input type='password' name="newPassword" placeholder='xxxxxxxx' className='w-full py-3 pl-4 text-[13px]  bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/> 
                                {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                            </div>
                            <div className='w-full my-2'> 
                                <label htmlFor="confirmPassword" className='font-normal text-[14px]  text-[#646464]'>Xác nhận mật khẩu mới</label>
                                <input type='password' name="confirmPassword" placeholder='xxxxxxxx' className='w-full py-3 pl-4 text-[13px]  bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> 
                                {/* <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'>{errorEmail}</span> */}
                            </div>
                            <div className='w-full'>
                                <span className='text-[13px] text-light-red'>{errorPassword}</span>
                            </div>
                            <div className='w-full mt-4 flex items-center justify-between'> 
                                <span onClick={(e) => setIsChangePassword(false)} className=' h-[40px] cursor-pointer uppercase bg-transparent text-light-yellow text-[14px] font-semibold'>Quay về</span>
                                <button className='w-[150px] h-[40px] uppercase text-[14px] font-semibold bg-light-yellow rounded-[10px] text-black'>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    ) 
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <span className='myloading'></span>
                    </div>
                )
            )}
        </div>
    )
}
