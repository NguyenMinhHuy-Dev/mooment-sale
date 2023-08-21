import React, { useEffect, useState } from 'react'
import VoucherCard from '../Voucher/VoucherCard';
import { useAppSelector } from '@/redux/store';

export default function VouchersSection() {
  const [data, setData] = useState([]);

  const userData: any = useAppSelector((state) => state.authReducer.value.user);

  useEffect(() => {
    const getData = async () => {
      // process.env.NEXT_PUBLIC_API_URL
      await fetch("http://localhost:3001/v1" + "/vouchers")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(err => {
        console.log(err);
      });
    }

    getData();
  }, [])

  return (
    <div className='bg-light-gray mb-[50px] py-[40px]'>
        <div className='mygrid flex flex-wrap items-center justify-center'>
          {data?.map((item: any) => 
            <VoucherCard key={item._id} data={item}/>
          )} 
        </div>
    </div>
  )
}
