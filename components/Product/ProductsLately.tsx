import React, { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import { useAppSelector } from '@/redux/store';

export default function ProductsLately() {
  // const [products, setProducts] = useState([]);

  const products: any = useAppSelector((state) => state.productReducer.list);

  // const getProducts = async () => {
  //   await fetch(process.env.NEXT_PUBLIC_API_URL + "/products/" + product.slug + "/relate", {
  //     cache: 'no-cache',
  //     method: "GET", 
  //     headers: { 'Content-type': 'application/json' }
  //   })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setProducts(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  // useEffect(() => {
  //   getProducts();
  // }, [product])

  return (
    <div className='mygrid mt-[20px] min-h-[500px]'>
        {products.length !== 0 && 
            <>
                <div className="w-full flex items-center justify-between py-2 px-4 bg-white shadow-threed rounded-[10px]">
                  <h2 className="font-bold text-[25px]">Đã xem gần đây</h2>
                </div>
                <div className='myslide w-full mt-3'>
                  <Swiper
                      spaceBetween={10}
                      slidesPerView={5}
                      navigation={true}
                      pagination={{
                          clickable: true,
                      }}
                      modules={[ Navigation, Pagination]} 
                      className="mySwiper h-[400px] rounded-[10px]"
                  >
                    {products.map((item: any) =>  
                      <SwiperSlide key={item._id + 'related'}><ProductCard isFlashsale={false} data={item} /></SwiperSlide>  
                    )}
                  </Swiper>
                </div>
            </>
        }
    </div>
  )
}
