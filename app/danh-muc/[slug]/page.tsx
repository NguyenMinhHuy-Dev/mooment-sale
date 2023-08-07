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
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import Checkbox from '@mui/material/Checkbox';
import ProductSkeleton from '@/components/ProductSkeleton';
 

export default function Products({ params }: { params: { slug: string } }) {  
    const searchParams = useSearchParams();
    const slug = params.slug;

    const brand = searchParams?.get("hang"); 
    const layout = searchParams?.get("layout"); 

    // 1: MOST RATED
    // 2: INCREASE
    // 3: DECREASE
    // 4: BEST SELLER
    const [sortType, setSortType] = useState(1);
    
    // 0            :   0 - 999.999.999
    // 500000       :   0 - 500.000
    // 1000000      :   500.000 - 1.000.000
    // 2000000      :   1.000.000 - 2.000.000
    // 4000000      :   2.000.000 - 4.000.000
    // 999.999.999  :   4.000.000 - 999.999.999
    const [filterPrice, setFilterPrice] = useState(0);
    
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [brands, setBrands] = useState([]); 
    const [category, setCategory] = useState<null | any>({});
    const [products, setProducts] = useState([]); 
    const [data, setData] = useState([]);  

    const prevPage = async () => {
        await setCurrentPage(currentPage - 1);
    }

    const nextPage = async () => {
        await setCurrentPage(currentPage + 1);
    }

    const getData = async (list: any) => {
        const fromPage = (currentPage - 1) * pageSize;
        const toPage = fromPage + pageSize; 
        await setData(list.slice(fromPage, toPage))
    }

    const applySort = async (type: any) => {  
        var res = data;
        // 1: MOST RATED    2: INCREASE     3: DECREASE     4: BEST SELLER
        if (type === 1) {
            res.sort((a: any, b: any) => b.rated - a.rated);
        }
        else if (type === 2) {
            res.sort((a: any, b: any) => a.salePrice - b.salePrice);
        }
        else if (type === 3) {
            res.sort((a: any, b: any) => b.salePrice - a.salePrice);
        }
        else if (type === 4) {
            res.sort((a: any, b: any) => b.sold - a.sold);
        }
        await setData([...res]);  
        setSortType(type);
        setCurrentPage(1);  
    }  

    // 0            :   0 - 999.999.999
    // 500000       :   0 - 500.000
    // 1000000      :   500.000 - 1.000.000
    // 2000000      :   1.000.000 - 2.000.000
    // 4000000      :   2.000.000 - 4.000.000
    // 999.999.999  :   4.000.000 - 999.999.999
    const applyFilterPrice = async (from: any, to: any) => { 
        const res = products.filter((item: any) => item.salePrice >= from && item.salePrice <= to);
        if (sortType === 1) {
            res.sort((a: any, b: any) => b.rated - a.rated);
        }
        else if (sortType === 2) {
            res.sort((a: any, b: any) => a.salePrice - b.salePrice);
        }
        else if (sortType === 3) {
            res.sort((a: any, b: any) => b.salePrice - a.salePrice);
        }
        else if (sortType === 4) {
            res.sort((a: any, b: any) => b.sold - a.sold);
        }
        await setData(res);
    } 

    const resetFilterPrice = async () => { 
        var get: any = document.getElementsByName('radioPrices');
        for (var i = 0 ; i < get.length ; i++) {
            get[i].checked = false;
        }
        setFilterPrice(NaN);
        await applyFilterPrice(0, 999999999); 
    } 

    const resetFilterBrand = async () => { 
        var get: any = document.getElementsByName('checkBrands');
        for (var i = 0 ; i < get.length ; i++) {
            get[i].checked = false;
        } 
        await setData(products)
        // await applyFilterPrice(0, 999999999); 
    } 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resCate = await fetchCategory(slug);
                console.log(resCate)
                await setCategory(resCate[0]);

                const res = await fetchProducts();  
                
                await setTotalPages(res.length / pageSize);
                await setProducts(res.filter((item: any) => item.category.slug === slug)); 
                await setData(res.filter((item: any) => item.category.slug === slug));    
                
                const resBrands = await fetchBrands();
                await setBrands(resBrands);
            }
            catch (err) {

            }
        }
        fetchData();
    }, [slug]) 

    useEffect(() => {
        const appySearch = async () => {
            if (search !== '') {
                await setData(products.filter((item: any) => 
                    item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                    item.salePrice.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
                ))
                // await applySort(sortType)
            }
            else {
                setData(products);
            }
        }
        appySearch()
    }, [search])

    return (
        <div className='mysection min-h-[100vh]'>
            <div className='mygrid w-full'> 
                <div className='w-full flex items-center p-2'>
                    <Link href="/" className='text-[16px] font-medium flex items-center text-dark-yellow'> 
                        <HomeRoundedIcon className='mr-1'/>
                        Trang chủ
                    </Link>
                    <span className='mx-2 text-[20px]'>/</span>
                    {!brand && !layout && 
                        <span className='font-normal text-[16px] text-black'>{category?.name}</span>
                    }
                    {/* 
                    {brand && <>
                        <Link href={`/danh-muc/${category?.slug}`} className='text-[16px] font-medium flex items-center text-dark-yellow'>  
                            {category?.name}
                        </Link>
                        <span className='mx-2 text-[20px]'>/</span>
                        <span className='font-normal text-[16px] text-black'>{brand}</span>
                    </>}
                    {layout && <>
                        <Link href={`/danh-muc/${category?.slug}`} className='text-[16px] font-medium flex items-center text-dark-yellow'>  
                            {category?.name}
                        </Link>
                        <span className='mx-2 text-[20px]'>/</span>
                        <span className='font-normal text-[16px] text-black'>{layout}</span>
                    </>} */}
                </div> 

                <div className='w-full mt-5 mb-[50px] flex justify-between'>
                    {/* FILTER */}
                    <div className='w-[20%] p-3  bg-white shadow-header rounded-[10px]'> 
                        {/* PRICES */}
                        <div className='w-full'>
                            <div className='w-full flex items-center justify-between mb-1'>
                                <h3 className='font-medium text-[16px]'>Giá tiền</h3>
                                <RefreshRoundedIcon 
                                    onClick={resetFilterPrice}
                                    className='cursor-pointer bg-white shadow-md rounded hover:bg-light-gray hover:text-white'
                                />
                            </div>
                            <ul className='w-full'>
                                {/* <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input 
                                            onClick={(e: any) => {
                                                setFilterPrice(Number(e.target.value))
                                            }}  
                                            type="radio"  
                                            name='radioPrices' 
                                            className=' mr-4'  
                                            value={0} 
                                        />
                                        <span className='geekmark'></span>
                                        <p>Tất cả</p>
                                    </label>
                                </li>  */}

                                <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input  
                                            onClick={(e) => applyFilterPrice(0, 500000)}
                                            type="radio" 
                                            name='radioPrices' 
                                            className=' mr-4' 
                                            value={500000}
                                        />
                                        <span className='geekmark'></span>
                                        <p>Dưới 500 nghìn</p>
                                    </label>
                                </li> 
                                <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input 
                                            onClick={(e) => applyFilterPrice(500000, 1000000)}
                                            type="radio" 
                                            name='radioPrices' 
                                            className=' mr-4' 
                                            value={1000000}
                                        />
                                        <span className='geekmark'></span>
                                        <p>Giá từ 500 nghìn đến 1 triệu</p>
                                    </label>
                                </li> 
                                <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input   
                                            onClick={(e) => applyFilterPrice(1000000, 2000000)}
                                            type="radio" 
                                            name='radioPrices' 
                                            className=' mr-4' 
                                            value={2000000}
                                        />
                                        <span className='geekmark'></span>
                                        <p>Giá từ 1 triệu đến 2 triệu</p>
                                    </label>
                                </li> 
                                <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input   
                                            onClick={(e) => applyFilterPrice(2000000, 4000000)}
                                            type="radio"
                                            name='radioPrices' 
                                            className=' mr-4' 
                                            value={4000000}
                                        />
                                        <span className='geekmark'></span>
                                        <p>Giá từ 2 triệu đến 4 triệu</p>
                                    </label>
                                </li> 
                                <li className='my-1'> 
                                    <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                        <input 
                                            onClick={(e) => applyFilterPrice(4000000, 999999999)}
                                            type="radio" 
                                            name='radioPrices' 
                                            className=' mr-4' 
                                            value={999999999}
                                        />
                                        <span className='geekmark'></span>
                                        <p>Trên 4 triệu</p>
                                    </label>
                                </li> 
                            </ul>
                        </div>

                        {/* BRANDS */}
                        {!brand && 
                            <div className='w-full mt-3'>
                                <div className='w-full flex items-center justify-between mb-1'>
                                    <h3 className='font-medium text-[16px] mb-1'>Thương hiệu</h3>
                                    <RefreshRoundedIcon 
                                        onClick={resetFilterBrand}
                                        className='cursor-pointer bg-white shadow-md rounded hover:bg-light-gray hover:text-white'
                                    />
                                </div>
                                <ul className='w-full'>
                                    {brands.map((item: any) => 
                                        <li key={item._id} className='my-1'> 
                                            <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                                <input type="checkbox" name='checkBrands'  className=' mr-4' value={item.slug}/>
                                                <span className='geekmark'></span>
                                                <p>{item.name}</p>
                                            </label>
                                        </li> 
                                    )} 
                                </ul>
                            </div>
                        }
                        

                        {/* LAYOUTS */}
                        {!layout &&
                        <div className='w-full mt-3'>
                            <h3 className='font-medium text-[16px] mb-1'>Layout bàn phím</h3>
                            <ul className='w-full'> 
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'fullsize'}/>
                                            <span className='geekmark'></span>
                                            <p>Full-size</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'tkl'}/>
                                            <span className='geekmark'></span>
                                            <p>Tenkeyless</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'75'}/>
                                            <span className='geekmark'></span>
                                            <p>Layout 75%</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'65'}/>
                                            <span className='geekmark'></span>
                                            <p>Layout 65%</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'60'}/>
                                            <span className='geekmark'></span>
                                            <p>Layout 60%</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'40'}/>
                                            <span className='geekmark'></span>
                                            <p>Layout 40%</p>
                                        </label>
                                    </li>  
                            </ul>
                        </div>
                        }
                        
                        {/* CONNECT */}
                        <div className='w-full mt-3'>
                            <h3 className='font-medium text-[16px] mb-1'>Loại kết nối</h3>
                            <ul className='w-full'>    
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'wireless'}/>
                                            <span className='geekmark'></span>
                                            <p>Không dây - 2.4ghz</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'bt'}/>
                                            <span className='geekmark'></span>
                                            <p>Bluetooth</p>
                                        </label>
                                    </li> 
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'wired'}/>
                                            <span className='geekmark'></span>
                                            <p>Có dây</p>
                                        </label>
                                    </li>   
                            </ul>
                        </div>
                        
                        {/* LED */}
                        <div className='w-full mt-3'>
                            <h3 className='font-medium text-[16px] mb-1'>LED</h3>
                            <ul className='w-full'>    
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'rgb'}/>
                                            <span className='geekmark'></span>
                                            <p>Led RGB</p>
                                        </label>
                                    </li>  
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'single'}/>
                                            <span className='geekmark'></span>
                                            <p>Led đơn</p>
                                        </label>
                                    </li> 
                                    <li className='my-1'> 
                                        <label className='mymain relative text-[13px] flex items-center cursor-pointer select-none'>
                                            <input  type="checkbox" name='radioPrices'  className=' mr-4' value={'none'}/>
                                            <span className='geekmark'></span>
                                            <p>Không led</p>
                                        </label>
                                    </li>   
                            </ul>
                        </div>
                    </div>

                    <div className='w-[80%] ml-5 h-full '>
                        {/* TOP SORT & PAGINATION */}
                        <div className='w-full p-3 flex items-center justify-between bg-white shadow-card rounded-[10px]'>
                            {/* SORT */}
                            <div className='text-left flex items-center'>
                                <h3 className='font-medium text-[14px] mr-3'>Sắp sếp theo:</h3>
                                <div className='flex items-center'> 
                                    
                                    <div
                                        onClick={e => applySort(1)}
                                        className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${sortType === 1 ? "bg-[#242424] text-white" : "bg-white text-black"} cursor-pointer`}
                                    >
                                        <SwitchAccessShortcutAddRoundedIcon className='mr-1 !text-[20px]'/>
                                        Đánh giá cao
                                    </div> 

                                    <div 
                                        onClick={e => applySort(2)}
                                        className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${sortType === 2 ? "bg-[#242424] text-white" : "bg-white text-black"} cursor-pointer`}
                                    >
                                        <TrendingUpRoundedIcon className='mr-1 !text-[20px]'/>
                                        Giá thấp - cao
                                    </div>

                                    <div 
                                        onClick={e => applySort(3)}
                                        className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${sortType === 3 ? "bg-[#242424] text-white" : "bg-white text-black"} cursor-pointer`}
                                    >
                                        <TrendingDownRoundedIcon className='mr-1 !text-[20px]'/>
                                        Giá cao - thấp
                                    </div>
                                    
                                    <div
                                        onClick={e => applySort(4)} 
                                        className={`px-2 py-1 mr-2 text-[12px] flex items-center rounded-[10px] border-2 border-light-gray ${sortType === 4 ? "bg-[#242424] text-white" : "bg-white text-black"} cursor-pointer`}
                                    >
                                        <WidgetsRoundedIcon className='mr-1 !text-[20px]'/>
                                        bán chạy
                                    </div>
                                </div>
                            </div>

                            {/* PAGINATION */}
                            <div className='flex items-center'> 
                                <input onChange={(e) => {
                                    setSearch(e.target.value)
                                }} value={search} placeholder='Tìm kiếm sản phẩm' type='text' className='w-[200px] py-2 pl-3 text-[13px] bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' />
                                <RefreshRoundedIcon 
                                    onClick={(e) => {
                                        setSearch('')
                                    }}
                                    className='cursor-pointer ml-1'
                                />
                            </div>
                        </div>

                        {/* PRODUCTS RENDER */}
                        <div className='relative w-full min-h-[600px] grid grid-cols-4 mt-3 gap-3'>
                            {data?.map((item: any) =>  
                                <ProductCard key={item._id} isFlashsale={false} data={item} />   
                            )}
                        </div>

                        {/* BOTTOM PAGINATION */}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
