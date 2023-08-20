import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'; 
import ImageFaded from '../Loading/ImageFaded';
import NewsCard from '../News/NewsCard';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [img, setImg] = useState('');

  useEffect(() => {
      const getNews = async () => {
          await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftrainghiemso.vn%2Fwindows%2Ffeed%2F')
          .then((res) => res.json())
          .then((res) => { 
              setImg(res.feed.image);
              setNews(res.items.slice(0, 4));
          })
          .catch((err) => {
              console.log(err);
          })
      }
      getNews();
  }, []);

  return (
    <div className='mygrid mb-[50px]'>
        <div className='w-full flex items-center justify-between py-2 px-4 bg-white shadow-threed rounded-[10px]'>
            <h2 className='font-bold text-[27px]'>Tin tức công nghệ</h2>
            <Link href="https://trainghiemso.vn/windows/" target='_blank' className='flex items-center text-[13px] badge hover:text-light-yellow'>
                Xem thêm 
                <OpenInNewRoundedIcon className='myicon ml-1 !mr-0 !text-[20px]'/>
            </Link>
        </div> 
        <div className='w-full grid grid-cols-4 gap-4 mt-3'>
          {news?.map((item: any) => 
              <NewsCard key={item.title} img={img} data={item} /> 
          )} 
        </div>
    </div>
  )
}
