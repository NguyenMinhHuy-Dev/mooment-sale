'use client'

import ProductCard from '@/components/ProductCard';
import { fetchBrands, fetchCategories, fetchCategory, fetchProducts } from '@/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import React, { useState, useEffect } from 'react'
import BrandItem from '@/components/BrandItem';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SwitchAccessShortcutAddRoundedIcon from '@mui/icons-material/SwitchAccessShortcutAddRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import ProductsPagination from '@/components/ProductsPagination';
import { useSelectedLayoutSegment } from 'next/navigation';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
 

export default function Products({ params }: { params: { slug: string } }) {  
    const searchParams = useSearchParams();
    const slug = params.slug;

    const brand = searchParams?.get("hang"); 
 
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState<null | any>({});

    const [isIncrease, setIsIncrease] = useState(false);
    const [isDecrease, setIsDecrease] = useState(false);
    const [isViewed, setIsViewed] = useState(false);
    const [isRate, setIsRate] = useState(true);
    const [isSold, setIsSold] = useState(false); 

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    const getCategory = async (slug: string) => {
        const res = await fetchCategory(slug); 
        setCategory(res[0]);
    }
    const getBrands = async (tag: String) => {
        const result = await fetchBrands(); 
        setBrands(result);
    }
    const getProducts = async (slug: String) => {
        const result = await fetchProducts();  

        // await setProducts(result.filter((item: any) => item.category.slug === slug)); 
        await setProducts(result);  

        await setPageSize(16 > result.length ? result.length : 16);
        
        const tempPageSize = 16 > result.length ? result.length : 16;

        const firstPageIndex = (currentPage - 1) * tempPageSize;
        const lastPageIndex = firstPageIndex + tempPageSize;  
        await setData(result.slice(firstPageIndex, lastPageIndex))
    }
   
    const onClickIncrease = async () => {
         setIsDecrease(false);
         setIsIncrease(true);
         setIsViewed(false);
         setIsRate(false);
         setIsSold(false);
         refreshPage();

        await products.sort((a: any, b: any) => a.salePrice - b.salePrice);
    }
    const onClickDecrease = async () => {
        setIsDecrease(true);
        setIsIncrease(false);
        setIsViewed(false);
        setIsRate(false);
        setIsSold(false);
        refreshPage();
        await products.sort((a: any, b: any) => b.salePrice - a.salePrice);
    }
    const onClickViewed = () => {
        setIsDecrease(false);
        setIsIncrease(false);
        setIsViewed(true);
        setIsRate(false);
        setIsSold(false);
    }
    const onClickRate = () => {
        setIsDecrease(false);
        setIsIncrease(false);
        setIsViewed(false);
        setIsRate(true);
        setIsSold(false);
    }
    const onClickSold = async () => {
        setIsDecrease(false);
        setIsIncrease(false);
        setIsViewed(false);
        setIsRate(false);
        setIsSold(true);
        refreshPage();
        
        await products.sort((a: any, b: any) => b.sold - a.sold);
    } 
    const refreshPage = async () => {
        await setCurrentPage(1);
    }
    const onClickPrev = async () => {
        if (currentPage <= 1)
            return;
        await setCurrentPage(currentPage - 1)
    }
    const onClickNext = async () => {
        if (currentPage >= products.length / pageSize)
            return;
        await setCurrentPage(currentPage + 1)
    }
    const onClickGoToPage = async (page: number) => {
        await setCurrentPage(page);
    }
    const getData = async (currentPage: number) => { 
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;  
        await setData(products.slice(firstPageIndex, lastPageIndex))
    }
    
    useEffect(() => {
        getCategory(slug);
        getProducts(slug);  
        getBrands(slug);   
    }, [slug]) 

    useEffect(() => {
        getData(currentPage);
    }, [currentPage, isDecrease, isIncrease, isSold])

    return (
        <div className='mysection min-h-[100vh]'>
            <div className='mygrid w-full'> 
                <div className='w-full flex items-center p-2'>
                    <Link href="/" className='text-[16px] font-medium flex items-center text-dark-yellow'> 
                        <HomeRoundedIcon className='mr-1'/>
                        Trang chủ
                    </Link>
                    <span className='mx-2 text-[20px]'>/</span>
                    {!brand && 
                        <span className='font-normal text-[16px] text-black'>{category?.name}</span>
                    }
                    {brand && <>
                        <Link href={`/danh-muc/${category?.slug}`} className='text-[16px] font-medium flex items-center text-dark-yellow'>  
                            {category?.name}
                        </Link>
                        <span className='mx-2 text-[20px]'>/</span>
                        <span className='font-normal text-[16px] text-black'>{brand}</span>
                    </>}
                </div>

                {!brand &&  
                    <div className='w-full flex items-center'>
                        {brands && brands.map((item: any) => <BrandItem key={item._id} data={item} />)}
                    </div>
                }
                <div className='w-full mt-5 mb-[50px] flex justify-between'>
                    <div className='w-[20%] p-3  bg-white shadow-header rounded-[10px]'> 
                        <div className='w-full'>
                            <h3 className='font-medium text-[16px] mb-1'>Giá tiền</h3>
                            <ul className='w-full'>
                                <li className='text-[13px]'>
                                    {/* <input /> */}
                                    Dưới 500 nghìn
                                </li> 
                            </ul>
                        </div>
                    </div>

                    <div className='w-[80%] ml-5 h-full '>
                        <div className='w-full p-3 flex items-center justify-between bg-white shadow-card rounded-[10px]'>
                            <div className='text-left flex items-center'>
                                <h3 className='font-medium text-[14px] mr-3'>Sắp sếp theo:</h3>
                                <div className='flex items-center'>

                                    {/* <div onClick={onClickViewed} className={`px-2 py-1 mx-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${isViewed ? "bg-[#2424247a] text-black" : "bg-white text-black"} cursor-pointer`}>
                                        <RemoveRedEyeRoundedIcon className='mr-1 !text-[20px]'/>
                                        Xem nhiều
                                    </div> */}

                                    
                                    <div onClick={onClickRate} className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${isRate ? "bg-[#2424247a] text-black" : "bg-white text-black"} cursor-pointer`}>
                                        <SwitchAccessShortcutAddRoundedIcon className='mr-1 !text-[20px]'/>
                                        Đánh giá cao
                                    </div> 
                                    <div onClick={onClickIncrease} className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${isIncrease ? "bg-[#2424247a] text-black" : "bg-white text-black"} cursor-pointer`}>
                                        <TrendingUpRoundedIcon className='mr-1 !text-[20px]'/>
                                        Giá thấp - cao
                                    </div>

                                    <div onClick={onClickDecrease} className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${isDecrease ? "bg-[#2424247a] text-black" : "bg-white text-black"} cursor-pointer`}>
                                        <TrendingDownRoundedIcon className='mr-1 !text-[20px]'/>
                                        Giá cao - thấp
                                    </div>
                                    
                                    <div onClick={onClickSold} className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${isSold ? "bg-[#2424247a] text-black" : "bg-white text-black"} cursor-pointer`}>
                                        <WidgetsRoundedIcon className='mr-1 !text-[20px]'/>
                                        bán chạy
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center'> 
                                <span onClick={onClickPrev} className={`px-1 py-1 mx-2 select-none rounded border-2 ${currentPage > 1 ? 'border-light-gray cursor-pointer' : 'border-[#d1d1d1] cursor-default'}`}><ArrowBackIosNewRoundedIcon className={`!text-[12px] ${currentPage > 1 ? 'text-light-gray' : 'text-[#d1d1d1]'}`} /></span>

                                {Array.apply(null, Array(products.length / pageSize)).map(function (_, i) {return (
                                    <span onClick={e => onClickGoToPage(i + 1)} className={`px-2 py-1 mx-1 rounded border-2 select-none cursor-pointer border-light-gray  ${currentPage === i + 1 ? 'bg-light-gray text-white' : 'bg-white text-black'}`}>{i + 1}</span>
                                );})}

                                <span onClick={onClickNext} className={`px-1 py-1 mx-2 select-none rounded border-2 ${currentPage < products.length / pageSize ? 'border-light-gray cursor-pointer' : 'border-[#d1d1d1] cursor-default'}`}><ArrowForwardIosRoundedIcon  className={`!text-[12px] ${currentPage < products.length / pageSize ? 'text-light-gray' : 'text-[#d1d1d1]'}`}/></span>
                                
                            </div>
                        </div>
                        <div className='w-full min-h-[600px] grid grid-cols-4 mt-3 gap-3'>
                            {data && data?.map((item: any) =>  
                                <ProductCard key={item._id} isFlashsale={false} data={item} />   
                            )}
                        </div>
                        <div className='w-full p-3 flex items-center justify-between bg-white shadow-card rounded-[10px]'>
                            <div className='text-left flex items-center'>
                            </div>

                            <div className='flex items-center'> 
                                <span onClick={onClickPrev} className={`px-1 py-1 mx-2 select-none rounded border-2 ${currentPage > 1 ? 'border-light-gray cursor-pointer' : 'border-[#d1d1d1] cursor-default'}`}><ArrowBackIosNewRoundedIcon className={`!text-[12px] ${currentPage > 1 ? 'text-light-gray' : 'text-[#d1d1d1]'}`} /></span>

                                {Array.apply(null, Array(products.length / pageSize)).map(function (_, i) {return (
                                    <span onClick={e => onClickGoToPage(i + 1)} className={`px-2 py-1 mx-1 rounded border-2 select-none cursor-pointer border-light-gray  ${currentPage === i + 1 ? 'bg-light-gray text-white' : 'bg-white text-black'}`}>{i + 1}</span>
                                );})}

                                <span onClick={onClickNext} className={`px-1 py-1 mx-2 select-none rounded border-2 ${currentPage < products.length / pageSize ? 'border-light-gray cursor-pointer' : 'border-[#d1d1d1] cursor-default'}`}><ArrowForwardIosRoundedIcon  className={`!text-[12px] ${currentPage < products.length / pageSize ? 'text-light-gray' : 'text-[#d1d1d1]'}`}/></span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
