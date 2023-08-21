"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { usePathname, useRouter } from 'next/navigation'

import { useAppDispatch } from '@/redux/store'; 
import { addItem, deleteItems, removeItems } from '@/redux/features/cart-slice';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

import PayPalPayment from '@/components/PaypalPayment';import { Loading } from '../Modal/LoadingScreen';
import { Success } from '../Modal/SuccessModal';

import { reset } from '@/redux/features/cart-slice'; 

export default function CheckOutPage() {
    
    const pathname = usePathname();
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState(''); 
    const [gender, setGender] = useState(0); 

    const [note, setNote] = useState('');
    const [voucher, setVoucher] = useState<null | any>({ price: 0 });
    
    const [province, setProvince] = useState(''); 
    const [district, setDistrict] = useState(''); 
    const [ward, setWard] = useState(''); 

    const [provinceName, setProvinceName] = useState(''); 
    const [districtName, setDistrictName] = useState(''); 
    const [wardName, setWardName] = useState(''); 

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);

    // 0: COD       1: PAYPAL
    const [payment, setPayment] = useState(0);

    const dispatch: any = useAppDispatch(); 
    const products = useAppSelector((state) => state.cartReducer.cartItems);
    const user: any = useAppSelector((state) => state.authReducer.value.user);
    const cartItems: any = useAppSelector((state) => state.cartReducer.cartItems);
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const totalPriceCart = useAppSelector((state) => state.cartReducer.totalAmount);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
    })};

    const handleCheckOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsOpen(true);

        var wardName: any = wards.find((e: any) => e.code === ward);
        var districtName: any = districts.find((e: any) => e.code === district);
        var provinceName: any = provinces.find((e: any) => e.code === province);

        // process.env.NEXT_PUBLIC_API_URL

        await fetch(process.env.NEXT_PUBLIC_API_URL + '/orders', {
            cache: 'no-cache',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                customerEmail: email,
                customerName: fullName,
                customerPhoneNumber: phoneNumber,
                customerAddress: address + ', ' + wardName.name_with_type + ', ' + districtName.name_with_type + ', ' + provinceName.name_with_type,
                payment: payment === 0 ? 'COD' : 'Paypal',
                isAuth: isAuth,
                orderDetail: cartItems,
                totalCost: Number(totalPriceCart) - Number(voucher.price),
                note: note,
                voucher: voucher.price
        })})
        .then((res) => res.json())
        .then((res) => { 
            dispatch(reset());
            setIsOpen(false);
            setIsOpenSuccess(true);
        })
        .catch((err) => { 
        })
    }

    const findWard = () => {
        var wardName: any = wards.find((e: any) => e.code === ward);
        // console.log(wardName)
        return wardName.name_with_type;
    }
    const findDistrict = () => {
        var districtName: any = districts.find((e: any) => e.code === district);
        // console.log(wardName)
        return districtName.name_with_type;
    }
    const findProvince = () => {
        var provinceName: any = provinces.find((e: any) => e.code === province);
        // console.log(wardName)
        return provinceName.name_with_type;
    }
    
    const [userData, setUserData] = useState<null | any>({}); 
    useEffect(() => {
        if (products.length === 0) {
            router.back();
        }
        if (isAuth) {
            setFullName(user.fullName);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setGender(user.gender);
        }
        const getProvinces = async () => {
            setLoading(true);
            await fetch(process.env.NEXT_PUBLIC_VN_API_URL + 'provinces/getAll?limit=-1')
            .then((res) => res.json())
            .then((res) => {
                setProvinces(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } 
        const getUser = async () => {
            // process.env.NEXT_PUBLIC_API_URL
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id)
            .then((res) => res.json())
            .then((res) => {
                setUserData(res);
            })
            .catch(err => {
                console.log(err);
            });
            }
            getUser();  
 
        scrollToTop();
        getProvinces();
    }, []);

    
    useEffect(() => { 
        const getProvinces = async () => {
            setLoading(true);
            await fetch(process.env.NEXT_PUBLIC_VN_API_URL + 'provinces/getAll?limit=-1')
            .then((res) => res.json())
            .then((res) => {
                setProvinces(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } 
        getProvinces();
    }, [province]);

    useEffect(() => {
        const getDistricts = async () => {
            setLoadingDistricts(true);
            setLoadingWards(true);
            await fetch(process.env.NEXT_PUBLIC_VN_API_URL + 'districts/getByProvince?provinceCode=' + province + '&limit=-1')
            .then((res) => res.json())
            .then((res) => {
                setDistricts(res.data.data);
                setLoadingDistricts(false);
                setLoadingWards(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingDistricts(false);
                setLoadingWards(false);
            });
        }
        getDistricts();
    }, [province])
    
    useEffect(() => {
        const getWards = async () => {
            setLoadingWards(true);
            await fetch(process.env.NEXT_PUBLIC_VN_API_URL + 'wards/getByDistrict?districtCode=' + district + '&limit=-1')
            .then((res) => res.json())
            .then((res) => {
                setWards(res.data.data);
                setLoadingWards(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingWards(false);
            });
        }
        getWards();
    }, [district])
      
    return (
        <div className='mysection pt-[10px] mb-[10px]'>  
            <div className='mygrid min-h-[400px]'>  
                <div className='w-full flex items-center p-2'>
                    <Link href="/" className='text-[16px] font-medium flex items-center text-dark-yellow'> 
                        <HomeRoundedIcon className='mr-1'/>
                        Trang chủ
                    </Link>
                    <span className='mx-2 text-[20px]'>/</span> 
                    <span className='text-[16px] font-normal'>Thanh toán</span> 
                </div>  

                <form onSubmit={handleCheckOut}>
                <div className='w-full flex justify-between'>
                    <div className='w-[60%]'>
                        <h1 className='font-black mb-2 mygradienttitle text-[25px] w-full text-center uppercase'>Thông tin khách đặt hàng</h1>
                        <div className='w-full bg-light-gray flex flex-col rounded-[10px] shadow-card p-5'> 
                            <h2 className='font-medium mb-1 text-[#ffffff] text-[16px] tracking-wide'>Thông tin khách hàng</h2>
                            <input 
                                placeholder="Họ và tên (Bắt buộc)" 
                                className="w-[100%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                required 
                                type="text" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)}
                                name="fullName" 
                            />
                            <div className="gender w-full flex items-center my-2 pl-2">
                                <label className='mymain relative text-[13px] text-white mr-8 flex items-center cursor-pointer select-none'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        required
                                        // defaultChecked={0}
                                        value={0}
                                        checked={gender === 0 && true}
                                        onChange={(e) => setGender(0)}
                                    />
                                    <span className='geekmark'></span>
                                    <p className='ml-3 text-[15px]'>Anh</p>
                                </label>
                                <label className='mymain relative text-[13px] text-white flex items-center cursor-pointer select-none'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={1}
                                        checked={gender === 1 && true}
                                        onChange={(e) => setGender(1)}
                                    />
                                    <span className='geekmark'></span>
                                    <p className='ml-3 text-[15px]'>Chị</p>
                                </label>
                            </div>
                            <input 
                                placeholder="Email (Bắt buộc)" 
                                className="w-[100%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                required 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                name="email" 
                            />
                            <input 
                                placeholder="Số điện thoại (Bắt buộc)" 
                                className="w-[100%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                required 
                                type="tel" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                                name="phoneNumber" 
                            />

                            <h2 className='font-medium mb-1 mt-4 text-[#fff] text-[16px] tracking-wide'>Địa chỉ nhận hàng</h2>
                            <div className='w-full flex justify-between'>
                                <select 
                                    className="w-[49%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                    name="province"  
                                    required 
                                    defaultValue={'Chọn Tỉnh / Thành phố'}
                                    onChange={(e) => setProvince(e.target.value)}
                                >
                                    <option className='text-[#fff]' disabled >Chọn Tỉnh / Thành phố</option>
                                    { 
                                        provinces?.map((item: any) =>
                                            <option className='text-white block py-2' key={item._id + 'province'} value={item.code} >{item.name_with_type}</option>
                                        )
                                    }
                                </select>
                                <select 
                                    className="w-[49%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                    name="district" 
                                    required 
                                    defaultValue={'Chọn Quận / Huyện'}
                                    onChange={(e) => setDistrict(e.target.value)}
                                >
                                    <option className='text-[#fff]' disabled >Chọn Quận / Huyện</option>
                                    {!loadingDistricts && districts?.map((item: any) =>
                                        <option className='text-white block py-2' key={item._id + 'district'} value={item.code} >{item.name_with_type}</option>
                                    )}
                                </select>
                            </div> 
                            <div className='w-full flex justify-between'> 
                                <select 
                                    className="w-[49%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                    name="ward"  
                                    required
                                    defaultValue={'Chọn Phường / Xã'}
                                    onChange={(e) => setWard(e.target.value)}
                                >
                                    <option className='text-[#fff]' disabled >Chọn Phường / Xã</option>
                                    {!loadingWards && wards?.map((item: any) =>
                                        <option className='text-white block py-2' key={item._id + 'ward'} value={item.code} >{item.name_with_type}</option>
                                    )}
                                </select>

                                <input 
                                    placeholder="Số nhà, đường" 
                                    className="w-[49%] py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                    required 
                                    type="text" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    name="address" 
                                />
                            </div>

                            <h2 className='font-medium mb-1 mt-4 text-[#fff] text-[16px] tracking-wide'>Ghi chú cho đơn hàng</h2>
                            <textarea 
                                placeholder="Bạn muốn ghi chú gì cho đơn hàng?" 
                                className="w-[100%] h-[100px] resize-none py-2 pl-4 my-2 text-[15px] text-white bg-[#4e4e4e]  rounded-lg outline-none"   
                                value={note} 
                                onChange={(e) => setNote(e.target.value)} 
                                name="note" 
                            />
                        </div> 
                    </div>

                    <div className='w-[38%]'> 
                        <h2 className='font-semibold mb-2 text-[#535252] text-[25px] scale-90 w-full text-center uppercase'>Thông tin đơn hàng</h2>
                        <div className='w-full bg-white flex flex-col rounded-[10px] shadow-md p-5'>  
                            <h3 className='font-medium mb-1 text-[#757272] text-[16px] tracking-wide'>Sản phẩm</h3>  
                            <ul className='w-full flex flex-col'>
                                {products?.map((item: any) =>  
                                        <li key={item._id + 'product'} className='flex w-full h-[85px] py-1 mb-5 rounded-[7px] bg-white'>
                                            <div className='relative h-full aspect-square rounded-[7px] overflow-hidden'>
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    fill 
                                                />
                                            </div>
                                            <div className='ml-2 flex-1 h-full flex flex-col'>
                                                <div className='text-left w-full h-[40px] mb-1'>
                                                    <span className='font-medium text-[15px] leading-5 line-clamp-2 overflow-hidden whitespace-pre-wrap'> 
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div className='w-full flex justify-between items-center mb-1'>
                                                    <span className='text-[13px] text-[#929292]'>Số lượng: {item.quantity}</span>
                                                    <span className='text-[13px] text-[#929292]'></span>
                                                    
                                                </div>
                                                <div className='w-full flex justify-between items-end'> 
                                                    <span className='text-[15px] text-[#929292] leading-[15px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</span>
                                                    <span className='font-bold text-black text-[16px] leading-[15px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</span>
                                                </div>
                                            </div>
                                            
                                        </li>  
                                )}
                            </ul>  
                        {/* </div> */}
                        
                        {/* <div className='mt-4 w-full bg-white flex flex-col rounded-[10px] shadow-md p-5'> */}
                            <h3 className='font-medium mb-1 mt-4 text-[#757272] text-[16px] tracking-wide'>Khuyến mãi cho đơn hàng</h3>  
                            {isAuth &&  
                                <div className='w-full flex items-center flex-col justify-between'> 
                                    {userData?.vouchers?.map((item: any) => item.status !== 1 &&
                                        <div key={item._id} className='w-full flex items-center my-1 justify-between'>
                                            <div className='flex items-center'> 
                                                <Image 
                                                    src="/logo-1.png"
                                                    alt="logo"
                                                    width={70}   
                                                    height={70}
                                                    className='object-contain' 
                                                />
                                                <div className='w-[2px] h-[80%] bg-[#e0e0e0]'></div>
                                                <div className='h-[80%] ml-2 flex flex-col justify-center'>
                                                    <h4 className='font-semibold text-[15px] text-black'>MÃ GIẢM GIÁ 100K</h4>
                                                    <p className='font-normal text-[13px] text-[#a3a3a3]'>Đơn tối thiểu 1000000</p>
                                                </div>
                                            </div>  
                                            {voucher._id === item._id ? (
                                                <span className='font-medium cursor-pointer text-[15px] text-light-red mr-2'>Đã chọn</span>
                                            ) : (
                                                <span onClick={(e) => setVoucher(item)} className='font-medium cursor-pointer text-[15px] text-light-yellow mr-2'>Chọn</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            }
                            <h3 className='font-medium mb-1 mt-6 text-[#757272] text-[16px] tracking-wide'>Phương thức thanh toán</h3>  
                            <div className='w-full grid grid-cols-2 gap-4'>
                                <label className='mymain  w-full h-[100px] relative p-1 rounded-[10px] shadow-card cursor-pointer overflow-hidden'>
                                    <input 
                                        type='radio'
                                        name="payment" 
                                        required
                                        value={0}
                                        onChange={(e) => setPayment(0)}
                                    />
                                    <Image 
                                        src="https://cdn.printgo.vn/uploads/media/779402/ship-cod-la-gi-4_1598600664.jpg"
                                        alt='payment'
                                        fill
                                        className='object-cover pointer-events-none'
                                    />
                                    <span className='geekmark !left-[7px] !top-[7px]'></span>
                                </label>

                                <label className='mymain  w-full h-[100px] relative p-1 rounded-[10px] shadow-card cursor-pointer overflow-hidden'>
                                    <input 
                                        type='radio'
                                        name="payment" 
                                        required
                                        value={1}
                                        onChange={(e) => setPayment(1)}
                                    />
                                    <Image 
                                        src="https://www.nopcommerce.com/images/thumbs/0014294_paypal-express-payment-plugin.png"
                                        alt='payment'
                                        fill
                                        className='object-cover pointer-events-none'
                                    />
                                    <span className='geekmark !left-[7px] !top-[7px]'></span>
                                </label>
                            </div>

                            <div className='w-full h-[1px] mt-[40px] bg-[#d1d1d1]'></div>

                            <div className='w-full mt-4'>
                                <div className='w-full mt-2 flex items-end justify-between'>
                                    <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Tổng tạm tính:</h3>  
                                    <span className='font-black text-[15px] text-black'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceCart)}</span>
                                </div>
                                <div className='w-full mt-2 flex items-end justify-between'>
                                    <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Voucher:</h3>  
                                    <span className='font-black text-[15px] text-black'>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher?.price)}</span>
                                </div>
                                <div className='w-full mt-2 flex items-end justify-between'>
                                    <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Phí vận chuyển:</h3>  
                                    <span className='font-black text-[15px] text-black'>
                                        {/* {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}     */}
                                        Miễn phí
                                    </span>
                                </div>
                                <div className='w-full mt-2 flex items-end justify-between'>
                                    <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Thành tiền:</h3>  
                                    <span className='font-black text-[20px] text-light-red'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceCart - voucher?.price)}
                                    </span>
                                </div>
                            </div>

                            <div className='w-full mt-4'>
                                {payment === 0 ? (
                                    <button type="submit" className='w-full py-[8px] outline-none rounded-[5px] bg-dark-yellow text-[#000000ca] font-black text-lg hover:bg-light-yellow hover:text-[#000]'>Thanh toán</button>
                                ) : (   
                                    <PayPalPayment 
                                        object={{ 
                                            customerEmail: email,
                                            customerName: fullName,
                                            customerPhoneNumber: phoneNumber,
                                            customerAddress: `${address} , ${findWard()}, ${findDistrict()}, ${findProvince()}`,
                                            payment: payment === 0 ? 'COD' : 'Paypal',
                                            isAuth: isAuth,
                                            isPaid: true,
                                            orderDetail: cartItems,
                                            totalCost: totalPriceCart,
                                            note: note,
                                        }}  
                                    />   
                                )}
                            </div>

                            <span className='italic text-[13px] mt-5 text-light-red'>* Kiểm tra thông tin trước khi thanh toán</span>
                            <span className='italic text-[13px] text-[#666666]'>(Liên hệ nhân viên để được hướng dẫn chi tiết)</span>
                        </div>
                    </div>
                </div>
                </form>
            </div>

            <Loading isOpen={isOpen} closeModal={() => {setIsOpen(false)}} /> 
            <Success isOpen={isOpenSuccess} closeModal={() => {setIsOpenSuccess(false)}} />
                  
        </div>
    )
}
