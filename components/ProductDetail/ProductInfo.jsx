'use client'

import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import Image from 'next/image';

import { EffectFade, FreeMode, Autoplay, Navigation, Thumbs } from 'swiper/modules';

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import Link from 'next/link';


export default function ProductInfo({ product }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null); 
 

 
    return (
        <div className='mygrid pt-[5px] h-auto flex justify-between'>
            {Object.keys(product).length !== 0 && 
                <> 
                    <div className='w-[33%]'>
                        {product.imageUrl !== undefined && 
                            <>
                                <Swiper 
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    effect={'fade'}
                                    autoplay={{
                                        delay: 4500,
                                        disableOnInteraction: false,
                                    }} 
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[EffectFade, Autoplay, FreeMode, Navigation, Thumbs]} 
                                    className="myslide w-full aspect-square rounded-[10px] overflow-hidden mb-1"
                                >
                                    {product.imageList.map((item) =>    
                                        <SwiperSlide className='!flex overflow-hidden'> 
                                            <Image 
                                                src={item}
                                                alt='product image'
                                                width={490}
                                                height={490}
                                                className="object-contain rounded-[10px]"
                                            /> 
                                        </SwiperSlide> 
                                    )}  
                                </Swiper>
                                
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="myslide2 w-full !h-[100px] box-border py-[10px]"
                                >
                                    {product.imageList.map((item) =>    
                                        <SwiperSlide> 
                                            <Image 
                                                src={item}
                                                alt='product image'
                                                fill
                                                className="object-contain"
                                            /> 
                                        </SwiperSlide> 
                                    )}  
                                </Swiper>
                            </>
                        }
                    </div>

                    <div className='w-[65%] h-[500px] p-1'> 
                        <h1 className='font-bold text-[20px] tracking-wider mb-2'>{product.category?.name} {product.name}</h1>
                        <div id="ratedStars" className='flex items-center mb-2'>
                            {/* <StarRoundedIcon className='!text-[30px] text-light-yellow'/>
                            <StarHalfRoundedIcon className='!text-[30px] text-light-yellow'/>
                            <StarOutlineRoundedIcon className='!text-[30px] text-light-yellow'/> */}
                            {Array.apply(null, Array(Math.round(product.rated))).map(function (_, i) {
                                return (
                                    <StarRoundedIcon className='!text-[30px] text-light-yellow'/>
                                )
                            })}
                            {Array.apply(null, Array(Math.round(10 - product.rated))).map(function (_, i) {
                                return (
                                    <StarOutlineRoundedIcon className='!text-[30px] text-light-yellow'/>
                                )
                            })}
                            <span className='font-bold text-light-yellow ml-2 text-[16px]'>{product.rated} / 10</span>
                        </div>
                        {product.brand && 
                            <>
                                <h2 className='text-[16px] font-normal'>Hãng sản xuất: <strong>{product.brand?.name}</strong></h2>
                                <h2 className='text-[16px] font-normal'>Tình trạng: <strong className='font-bold text-light-yellow'>Mới</strong></h2> 
                            </>
                        }
                        <div className='w-full italic text-light-gray my-2 text-[14px]'>
                            <p>✔ Bảo hành chính hãng 24 tháng. </p>
                            <p>✔ Hỗ trợ đổi mới trong 7 ngày. </p> 
                            <p>✔ Miễn phí giao hàng cho các đơn hàng thành phố Hồ Chí Minh. </p>  
                        </div>
                        <div className=' border rounded-[10px] p-2 mt-2'>
                            {/* <h2 className='font-bold text-[20px]'>Ưu đãi</h2> */}
                            <div className=' flex items-center text-light-red'>
                                <SellRoundedIcon className='myicon  !text-[20px]'/>
                                <Link href="#" className='text-[15px] leading-7 font-semibold'>Ưu đãi giảm khi mua kèm switch.</Link>
                            </div>
                            <div className=' flex items-center text-light-red'>
                                <SellRoundedIcon className='myicon  !text-[20px]'/>
                                <Link href="#" className='text-[15px] leading-7 font-semibold'>Ưu đãi giảm khi mua kèm keycap.</Link>
                            </div>
                            <div className=' flex items-center text-light-red'>
                                <SellRoundedIcon className='myicon  !text-[20px]'/>
                                <Link href="#" className='text-[15px] leading-7 font-semibold'>Giảm ngay 50.000đ khi mua kèm stabilizer.</Link>
                            </div>
                            <div className=' flex items-center text-light-red'>
                                <SellRoundedIcon className='myicon  !text-[20px]'/>
                                <Link href="#" className='text-[15px] leading-7 font-semibold'>Giảm ngay 100.000đ khi mua kèm keycap của Akko.</Link>
                            </div>
                        </div>

                    </div> 
                </>
            }
        </div>
    )
}
