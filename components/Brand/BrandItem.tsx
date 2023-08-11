import Image from 'next/image';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function BrandItem({ data }: any) {
    const [color, setColor] = useState("");

    const generateColor = async () => {
        await setColor(Math.random().toString(16).substr(-6));
    };

    useEffect(() => {
        generateColor();
    }, []);
  return (
    <Link href={`?hang=${data?.slug}`} className='flex flex-wrap items-center justify-center py-3 px-5 rounded-[10px] text-[16px] bg-black font-semibold mr-2 text-black'>
        <Image
            src={
                data?.logo ? (
                    data?.logo
                ) : (
                    'https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.15752-9/363287209_115917478242701_5627344067562780529_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=2imzheYtNdkAX98kD93&_nc_ht=scontent.fsgn5-8.fna&oh=03_AdQIyBDLH4TgiJ_3qkRwX0ufoR_7IQyzYKm5LUde8a4Idg&oe=64F5B97E'
                )
            }
            alt="logo"
            width={100}
            height={50} 
        /> 
    </Link>
  )
}
