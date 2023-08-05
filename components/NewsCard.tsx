import Link from 'next/link'
import React from 'react'
import ImageFaded from './ImageFaded'

export default function NewsCard() {
  return ( 
    <div className='w-full'>
        <Link href="/tin-tuc/blog" className='block w-full badge'>
            <div className='w-full relative  aspect-[4/3] rounded-[10px] overflow-hidden'> 
                <ImageFaded 
                    src={ 
                        "https://bizweb.dktcdn.net/thumb/large/100/436/596/articles/z4463060186906-c7f01664b7bb23e3a4066f2f7a8a3230.jpg?v=1687710067893"
                    } 
                    className="w-full h-full object-cover rounded-[10px] transition-all hover:scale-110"
                    alt={"news"}
                />
                <div className='overflow-hidden w-[90%] bottom-[10px] py-2 px-4 flex items-center backdrop-blur-md bg-black/30 rounded-[100px] h-[60px] absolute z-[1] left-[50%] translate-x-[-50%]'>
                    <span className='line-clamp-2 overflow-hidden whitespace-pre-wrap text-white text-[13px] font-bold'>HƯỚNG DẪN SỬ DỤNG BÀN PHÍM CƠ CMK75</span>
                </div>
            </div>
            <div className='block w-full mt-1 overflow-hidden  p-2 rounded-[10px] '>
                <span className='line-clamp-3 font-semibold overflow-hidden whitespace-pre-wrap text-black text-justify text-[15px]'>
                Bàn phím cơ FL CMK75 là thế hệ mới nhất của hãng FL-Esports. Kicap cũng vinh dự khi là một trong những nhà bán lẻ trực tiếp sản phẩm này.
                Tuy nhiên hãng lại chưa bổ sung kịp hướng dẫn sử dụng kèm theo hộp nên KICAP sẽ viết chi tiết lại cách dùng con phím này sao cho tiện và dễ dàng nhất nhé!
                </span>
            </div>
        </Link>
    </div> 
  )
}
