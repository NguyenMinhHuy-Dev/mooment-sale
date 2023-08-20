'use client'
import ProductInfo from '@/components/Product/ProductInfo';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ProductDescription from './ProductDescription';
import ProductComments from './ProductComments';
import ProductsRelate from './ProductsRelate';
import { useAppDispatch, useAppSelector } from '@/redux/store'; 
import { addToLately, reset } from '@/redux/features/product-slide';
import ProductsLately from './ProductsLately'; 

export default function ProductDetail({slug}: {slug : string}) {
  const [product, setProduct] = useState<null | any>({});

  const dispatch = useAppDispatch();
  const lately: any = useAppSelector((state) => state.productReducer.list);
  const isAuth: any = useAppSelector((state) => state.authReducer.value.isAuth);
  const user: any = useAppSelector((state) => state.authReducer.value.user);

  const addToLateLyList = async (id: any) => {
    // process.env.NEXT_PUBLIC_API_URL
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id + "/lately", {
      cache: 'no-cache',
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const getProduct = async () => {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/products/" + slug, {
        cache: 'no-cache',
        method: "GET", 
        headers: { 'Content-type': 'application/json' }
      })
      .then((res) => res.json())
      .then((res: any) => {
        setProduct(res);
        dispatch(addToLately(res));
        if (isAuth) {
          addToLateLyList(res._id);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }; 

    getProduct();

  }, [slug])
  return (
    <div className='mysection min-h-[100vh] mb-[30px]'>
      <div className='mygrid w-full flex items-center py-4'>
        <Link href="/" className='text-[16px] font-medium flex items-center text-dark-yellow'> 
            <HomeRoundedIcon className='mr-1'/>
            Trang chủ
        </Link>
        {product.category && 
          <>
            <span className='text-[16px] mx-2'>/</span>
            <Link href={"/danh-muc/" + product.category?.slug} className='text-[16px] font-medium flex items-center text-dark-yellow'> 
                {product.category?.name}
            </Link>
          </>
        }
        {product.name && 
          <>
            <span className='text-[16px] mx-2'>/</span>
            <span className='text-[16px] text-[#8a8a8a] font-normal'>{product.name}</span>
          </>
        }
      </div>
      
      {product !== null && 
        <> 
          <ProductInfo product={product}/>
          <ProductDescription product={product}/>
          {/* <ProductComments product={product}/> */}
          <ProductsRelate product={product}/>
          {lately?.length > 0 && 
            <ProductsLately />
          }
        </>
      }
    </div>
  )
}
