import React from 'react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

export default function Slides() {
  return ( 
    <div className="myslide w-full h-[calc(100vh-4rem)] mb-5"> 
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            pagination={true}
            loop={true} 
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }} 
            modules={[EffectFade, Autoplay, Pagination]}
            className="mySwiper w-full h-full"
        >
            <SwiperSlide className="bg-white">
                <Image 
                src="https://bizweb.dktcdn.net/100/438/322/themes/837712/assets/slider_1.jpg?1690601689331"
                alt="slide"
                fill
                className="object-cover"
                />
            </SwiperSlide> 
            <SwiperSlide className="bg-white">
                <Image 
                src="https://bizweb.dktcdn.net/100/438/322/themes/837712/assets/slider_2.jpg?1690601689331"
                alt="slide"
                fill
                className="object-cover"
                />
            </SwiperSlide> 
            <SwiperSlide className="bg-white">
                <Image 
                src="https://bizweb.dktcdn.net/100/438/322/themes/837712/assets/slider_3.jpg?1690601689331"
                alt="slide"
                fill
                className="object-cover"
                />
            </SwiperSlide> 
            <SwiperSlide className="bg-white">
                <Image 
                src="https://bizweb.dktcdn.net/100/438/322/themes/837712/assets/slider_5.jpg?1690601689331"
                alt="slide"
                fill
                className="object-cover"
                />
            </SwiperSlide> 
        </Swiper>
    </div> 
  )
}
