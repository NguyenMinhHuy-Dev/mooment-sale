import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'; 

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../Product/ProductCard';
import ProductSkeleton from '../Skeleton/ProductSkeleton';

export default function TopProductsSection({ category, direction }: { category: String, direction: Boolean }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + '/products')
            .then(res => res.json())
            .then(res => {
                // res.map((item: any) => {
                //     console.log(item.category.name.toString());
                // })
                setProducts(res.filter((item: any) => item.category.name === category).sort((a: any, b:any) => b.sold - a.sold));
                setLoading(false);
            })
            .catch((err) => { 
                setLoading(false);
            })
        }
        setLoading(true);
        getProducts();
    },[])

    return (
        <div className='mygrid min-h-[500px] my-[50px]'>
            <div className='w-full p-2 px-4 bg-white flex items-center justify-between shadow-threed rounded-[10px]'>
                <div className='flex items-center'> 
                    <Link href="/loai-san-pham" className='hover:text-light-yellow transition-all'>
                        <h2 className='font-semibold tracking-wider uppercase text-[27px]'>
                            { category.toLocaleUpperCase() } bán chạy nhất
                        </h2>
                    </Link>
                    <div className='w-[1px] h-[30px] bg-[#d1d1d1] ml-[20px]'></div>
                    <LocalShippingRoundedIcon className='myicon ml-[10px] !text-[35px] text-[#27ae60]'/>
                    <h3 className='text-[16px] font-bold'>Miễn phí giao hàng</h3>
                </div>
                <div className='flex items-center'>
                    <Link href="/loai-san-pham?akko" className='myshadow py-[5px] px-[10px] font-semiboldbold bg-[#f3f4f6] rounded-[5px] text-[13px]'>
                        Akko
                    </Link>
                    <Link href="/loai-san-pham?akko" className='myshadow py-[5px] px-[10px] font-semiboldbold bg-[#f3f4f6] rounded-[5px] text-[13px]'>
                        FL-Esport
                    </Link>
                    <Link href="/loai-san-pham?akko" className='myshadow py-[5px] px-[10px] font-semiboldbold bg-[#f3f4f6] rounded-[5px] text-[13px]'>
                        Leopold
                    </Link>
                    <Link href="/loai-san-pham?akko" className='myshadow py-[5px] px-[10px] font-semiboldbold bg-[#f3f4f6] rounded-[5px] text-[13px]'>
                        iKBC
                    </Link>
                    <Link href="/loai-san-pham?akko" className='myshadow py-[5px] px-[10px] font-semiboldbold bg-[#f3f4f6] rounded-[5px] text-[13px]'>
                        Tất cả
                    </Link>
                </div>
            </div>

            <div className='myslide w-full mt-4'> 
                <div className='w-full grid grid-cols-5 gap-5'>
                    {!loading ? (
                        products.map((product: any) => 
                            <ProductCard key={product._id} isFlashsale={false} data={product} /> 
                        )
                        // <>
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} /> 
                        //     <ProductCard isFlashsale={false} data={products[0]} />  
                        // </>

                    ) : (
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </>
                    )}
                </div>
                {/* <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation={true} 
                    loop={true} 
                    // autoplay={{
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // }} 
                    modules={[ Navigation]} 
                    className="mySwiper h-full"
                >
                    {!loading ? (
                        <>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                        </>
                    ) : (
                        <>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                        </>
                    )}
                </Swiper>
                
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation={true} 
                    loop={true} 
                    // autoplay={{
                    //     delay: 4000,
                    //     disableOnInteraction: false,
                    // }} 
                    modules={[ Navigation]} 
                    className="mySwiper h-full mt-4"
                >
                    {!loading ? (
                        <>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                            <SwiperSlide><ProductCard isFlashsale={false} /></SwiperSlide>
                        </>
                    ) : (
                        <>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                            <SwiperSlide><ProductSkeleton /></SwiperSlide>
                        </>
                    )}
                </Swiper> */}
            </div>
        </div>
    )
}
