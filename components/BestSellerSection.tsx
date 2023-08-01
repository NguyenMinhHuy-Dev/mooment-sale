import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import ProductSkeleton from './ProductSkeleton';

export default function BestSellerSection() {
  const [loading, setLoading] = useState(false);

  return (
    <>
    <div className='mygrid h-[1px] bg-[#a8a6a6] mt-8'></div>
    <div className='myslide mygrid mt-10 h-[450px]'>
        <h2 className='flex items-center justify-center w-full mb-2 text-center font-black text-[35px] tracking-widest uppercase text-black mygradienttitle'>
            <WhatshotRoundedIcon className='myicon text-light-red text-[30px]'/>
            Best seller tại Mooment
            <Diversity1RoundedIcon className='myicon ml-2 text-light-yellow text-[30px]'/>
        </h2>

        {loading ? ( 
          <Swiper  
              loop={true}  
              spaceBetween={20}
              slidesPerView={5}
              pagination={{
                clickable: true,
              }}
              modules={[ Pagination]} 
              className="mySwiper h-full"
          > 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
            <SwiperSlide><ProductCard  isFlashsale={false}  /> </SwiperSlide> 
          </Swiper>
        ) : (
          <div className='w-full grid grid-cols-5 gap-5'>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div> 
        )}
    </div>
    {/* <div className="mygrid min-h-[500px] mt-5 grid grid-cols-5 gap-5">
      <ProductCard /> 
    </div> */}
    </>
  )
}
