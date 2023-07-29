import React from 'react'
import { fetchCategories } from '@/utils'; 
import Link from 'next/link';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

export default async function CategoryHeader() {
    const categories = await fetchCategories();  
    const isCategoriesEmpty = !Array.isArray(categories) ||  categories.length < 1 || !categories;

    return (
        <div className='category min-w-[130px] h-full px-[10px] flex justify-center items-center cursor-default border-b-[2px] border-white hover:border-b-[2px] hover:border-black transition'>
            <CategoryOutlinedIcon className='myicon' />
            <span className='flex justify-center items-center text-[13px] font-bold'>Danh mục</span>
            <div className='shadow-menu mymenu overflow-hidden absolute w-full h-[500px] bg-white rounded-lg z-20 top-[75px] left-0'>
                <div className='relative w-full h-full bg-white rounded-lg flex justify-between items-center p-4'>

                {!isCategoriesEmpty ? (
                    <>
                    <div className='w-[20%] h-full pr-3 border-r border-[#d1d1d1]'>
                        {categories?.map((category: any) => 
                        <div  
                            key={category._id}
                            className='mycategory boldOnHover'
                        >
                            <Link href={`${category.slug}`} className='flex justify-between items-center py-2 text-[13px] font-bold hover:text-dark-yellow'>
                                {category.name}
                                <KeyboardDoubleArrowRightRoundedIcon />
                            </Link>
                            
                            <div className='mysubcategory absolute w-[80%] p-7 pl-7 h-full top-0 right-0 grid grid-cols-4 overflow-scroll gap-2'> 
                            {category.collections?.map((collection: any) => 
                                <div>
                                <span className='font-bold text-[16px]'>
                                    {collection.name} 
                                </span>
                                <ul key={collection._id} className='flex flex-col'>
                                    {collection?.items.map((item: any) =>
                                    <li key={`${item._id}`} className='w-full my-1 boldOnHover'>
                                        <Link
                                        href={`/${category.slug}/${item.slug}`}
                                        className='inline-block h-full w-full font-normal text-[13px]'
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                    )}
                                </ul>
                                </div>
                            )}
                            </div>
                        </div>
                        )}
                    </div>
                    </>
                ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                    <span className='text-black text-3xl font-bold'>OOPS!... đã xảy ra lỗi</span>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}
