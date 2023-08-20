import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='w-full min-h-[500px] bg-light-gray'>
        <div className='mygrid h-full py-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1'>
            <div className='w-full mt-2'> 
                <span className='block font-black text-[25px] text-light-yellow'>Mooment Store</span>
                <span className='block text-white text-[13px]'>&copy; 2023 được phát triển bởi Mooment</span>
                <span className='block text-white text-[13px]'> Bảo lưu mọi quyền.</span> 
            </div> 
            <div className='w-full mt-2'>
                <h4 className='font-bold text-[16px] text-light-yellow'>VỀ MOOMENT</h4>
                <ul className='w-full mt-2'>
                    <li className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/gioi-thieu" className='text-white text-[13px]'>Giới thiệu</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Tuyển dụng</Link>
                    </li>
                </ul>
            </div> 
            <div className='w-full mt-2'>
                <h4 className='font-bold text-[16px] text-light-yellow'>CHÍNH SÁCH</h4>
                <ul className='w-full mt-2'>
                    <li className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/gioi-thieu" className='text-white text-[13px]'>Chính sách bảo hành</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Chính sách thanh toán</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Chính sách giao hàng</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Chính sách bảo mật</Link>
                    </li>
                </ul>
            </div> 
            <div className='w-full mt-2'>
                <h4 className='font-bold text-[16px] text-light-yellow'>THÔNG TIN</h4>
                <ul className='w-full mt-2'>
                    <li className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/gioi-thieu" className='text-white text-[13px]'>Hệ thống cửa hàng</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Trung tâm bảo hành</Link>
                    </li> 
                </ul>
            </div> 
            <div className='w-full mt-2'>
                <h4 className='font-bold text-[16px] text-light-yellow'>TỔNG ĐÀI HỖ TRỢ (GỌI MIỄN PHÍ)</h4>
                <ul className='w-full mt-2'>
                    <li className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/gioi-thieu" className='text-white text-[13px]'>Gọi mua: 0888278748 (8:00 - 21:00)</Link>
                    </li>
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Hotline: 0938745593 (8:00 - 21:00)</Link>
                    </li> 
                    <li  className='boldOnHover py-1 cursor-pointer'>
                        <Link href="/tuyen-dung" className='text-white text-[13px]'>Email: cskh.mooment@gmail.com</Link>
                    </li>  
                </ul>
            </div> 
            <div className='w-full mt-2'>
                <h4 className='font-bold text-[16px] text-light-yellow'>ĐƠN VỊ VẬN CHUYỂN</h4>
                <div className='w-full grid grid-cols-3 gap-1 mt-2'>
                    <div className='relative w-full h-[40px] bg-black'>
                        <Image 
                            src="https://theme.hstatic.net/200000722513/1001065590/14/ship_1.png?v=1177"
                            alt='Shipping'
                            fill
                            className='object-contain'
                        />
                    </div>
                    <div className='relative w-full h-[40px] bg-black'>
                        <Image 
                            src="https://theme.hstatic.net/200000722513/1001065590/14/ship_2.png?v=1177"
                            alt='Shipping'
                            fill
                            className='object-contain'
                        />
                    </div>
                    <div className='relative w-full h-[40px] bg-black'>
                        <Image 
                            src="https://theme.hstatic.net/200000722513/1001065590/14/ship_4.png?v=1177"
                            alt='Shipping'
                            fill
                            className='object-contain'
                        />
                    </div>
                </div>
                <h4 className='font-bold text-[16px] text-light-yellow  mt-8'>CÁCH THỨC THANH TOÁN</h4>
                <div className='w-full grid grid-cols-2 gap-1 mt-2'>
                    <div className='relative w-full h-[60px] rounded-[10px]'>
                        <Image 
                            src="https://cdn.printgo.vn/uploads/media/779402/ship-cod-la-gi-4_1598600664.jpg"
                            alt='Shipping'
                            fill
                            className='object-cover  rounded-[10px]'
                        />
                    </div>
                    <div className='relative w-full h-[60px]'>
                        <Image 
                            src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png"
                            alt='payment'
                            fill
                            className='object-cover rounded-[10px]'
                        />
                    </div> 
                </div>
            </div> 
        </div>
        <div className='mygrid h-[1px] bg-[#807b7b] my-3'></div>
        <div className='mygrid flex justify-between items-start mt-8 h-[200px]'>
            <div className='flex justify-start items-center'>
                <h5 className='text-white font-semibold text-[16px] uppercase mr-3'>Kết nối với chúng tôi</h5>
                <Link href="https://www.facebook.com/profile.php?id=100095037903481" target='_blank'>
                    <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/1024px-Facebook_logo_36x36.svg.png"
                        alt="facebook"
                        width={50}
                        height={50}
                        className='rounded-[10px] mr-3'
                    />
                </Link>
                <Link href="https://www.youtube.com/channel/UCgqsyGlxtIDgw_7VbV_rmuA" target='_blank'>
                    <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/2048px-YouTube_play_button_square_%282013-2017%29.svg.png"
                        alt="youtube"
                        width={50}
                        height={50}
                        className='rounded-[10px]'
                    />
                </Link>
            </div>
            <div>
            <Image 
                src="https://theme.hstatic.net/200000722513/1001065590/14/logo-bct.png?v=1177"          
                alt="privacy"
                width={200}
                height={30}
            />
            </div>
        </div>
    </div>
  )
}
