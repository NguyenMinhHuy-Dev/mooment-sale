'use client'

import ProductCard from '@/components/ProductCard';
import { fetchBrands, fetchCategories, fetchCategory, fetchProducts } from '@/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import React, { useState, useEffect } from 'react'
import BrandItem from '@/components/BrandItem';
 
export default function Products({ params }: { params: { slug: string } }) {  
    const searchParams = useSearchParams();
    const slug = params.slug;

    const brand = searchParams?.get("hang"); 

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState<null | any>({});

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
        setProducts(result.filter((item: any) => item.category.slug === slug));
    }

    useEffect(() => {
        getCategory(slug);
        getProducts(slug); 
        getBrands(slug);
        console.log(brands)
    }, [slug])

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
                <div className='w-full h-[1000px] mt-3 mb-[50px]rounded-[10px] '>
                    
                </div>
            </div>
        </div>
    )
}
