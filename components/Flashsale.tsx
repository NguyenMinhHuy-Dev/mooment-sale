import React, { useState, useEffect } from 'react';
import PunchClockRoundedIcon from '@mui/icons-material/PunchClockRounded';
import ProductCard from './ProductCard'; 

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';

export default function Flashsale({ date }: { date: string }) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let interval: any;
    
    const countDown = () => { 
        const destination = new Date(date).getTime(); 

        interval = setInterval(() => {
            const now = new Date().getTime();
            const different = destination - now;

            const days = Math.floor(different / (1000* 60 * 60 * 24))
            const hours = Math.floor((different%(1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 7 + days * 24;
            const minutes = Math.floor((different%(1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((different%(1000 * 60)) / 1000);

            if (destination < 0 || seconds < 0) {
                clearInterval(interval.current);
            }
            else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes)
                setSeconds(seconds);
            }
        });
    };

    useEffect(() => {
        countDown(); 
    },[]);

  return ( 
    <div className='mygrid relative mt-[75px] p-2 bg-light-gray rounded-[10px] drop-shadow-xl overflow-hidden'> 
        
        <PunchClockRoundedIcon className='absolute z-[1] myicon-2 text-[500px] top-[-30%] left-[-7%]'/>
        <div className='relative z-[1] w-full flex items-center px-2 justify-between'>
            <h2 className='mb-2 flex items-center font-black text-[35px] tracking-widest uppercase text-white'>
                Flashsale chính hãng
            </h2> 
            <div className='flex items-center'> 
                <span className='text-white text-[16px] mr-2'>Kết thúc trong</span>
                <span className='font-bold text-black text-[20px] rounded p-1 block bg-white'>{hours < 10 ? '0' + hours :  hours}</span>
                <p className='text-white font-bold text-[16px] mx-1'>h :</p>
                <span  className='font-bold text-black text-[20px] rounded p-1 block bg-white'>{minutes < 10 ? '0' + minutes :  minutes}</span>
                <p  className='text-white font-bold text-[16px] mx-1'>m :</p>
                <span className='font-bold text-black text-[20px] rounded p-1 block bg-white'>{seconds < 10 ? '0' + seconds :  seconds}</span>
                <p  className='text-white font-bold text-[16px] mx-1'>s</p>
            </div>
        </div>
        <div className='relative z-[2] w-full h-full flex bg-white p-2 rounded'>
            <div className='w-[20%]'>
                <h3 className='w-full text-center font-bold text-[20px] text-dark-yellow'>Sản phẩm hot nhất</h3>
                <ProductCard isFlashsale={true} />
            </div>
            <div className='relative w-[2px] aspect-video rounded bg-[#d1d1d1] mx-3'></div>
            <div className=' myslide w-[80%] h-auto'>
                <Swiper   
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[ Navigation, Pagination]} 
                    className="mySwiper h-full"
                > 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                    <SwiperSlide><ProductCard  isFlashsale={true}  /> </SwiperSlide> 
                </Swiper>
            </div>
        </div>
    </div>
  )
}
