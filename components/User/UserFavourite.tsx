'use client'
import { useAppSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import ProductCard from '../Product/ProductCard';

export default function UserFavourite() {
    const user: any = useAppSelector((state) => state.authReducer.value.user);
    const [data, setData] = useState<null | any>([]);

    useEffect(() => {
        const getData = async () => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + user._id)
            .then((res) => res.json())
            .then((res) => {
                setData(res.favourite);
            })
            .catch((err) => {
                console.log(err);
            })
        };
        getData();
    }, [])

    return (
        <div className='w-full h-full'>
            <h1 className='font-bold text-light-yellow text-[25px] mb-5'>Danh sách sản phẩm yêu thích</h1>
            <div className='w-full  grid grid-cols-4 gap-3'>

            {data?.map((item: any) => 
                <ProductCard key={item._id} isFlashsale={false} data={item} />
            )} 
            </div>
        </div>
    )
}
