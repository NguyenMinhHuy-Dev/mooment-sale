import React, {useState, useEffect} from 'react';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

export default function Slides() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const getSlides = async () => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + '/slides')
            .then(res => res.json())
            .then(res => {
                setSlides(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
        getSlides();
    }, [])

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
                {slides?.map((item: any) => 
                    <SwiperSlide key={item._id} className="bg-white">
                        <Image 
                            src={item.image}
                            alt="slide"
                            fill
                            className="object-cover"
                        />
                    </SwiperSlide>  
                )}
            </Swiper>
        </div> 
    )
}
