import { useAppSelector } from '@/redux/store'
import React from 'react'
import ProductCard from '../Product/ProductCard';

export default function UserLately() {
    const lately: any = useAppSelector((state) => state.productReducer.list);
    return (
        <div className='w-full h-full'>
            <h1 className='font-bold text-light-yellow text-[25px] mb-5'>Sản phẩm đã xem gần đây</h1>
            <div className='w-full  grid grid-cols-4 gap-3'> 
                {lately?.map((item: any) => 
                    <ProductCard key={item._id} isFlashsale={false} data={item} />
                )} 
            </div>
        </div>
    )
}
