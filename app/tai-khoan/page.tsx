import AccountList from '@/components/Account/AccountList' 
import React from 'react';

export async function generateMetadata() {
  return {
    title: "Tài khoản - Mooment.com",
    description: "Thông tin của tài khoản",
    openGraph: {
      title:  "Tài khoản - Mooment.com",
      type: 'website',
      url: 'https://mooment.vercel.app/tai-khoan',
      description: "Thông tin của tài khoản",
      images: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.15752-9/364535853_955953882363740_1424107074459890270_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Qinfdaxe_e8AX9TP_xN&_nc_oc=AQkdBS0ucbN7UDdif1-4pAszdGJY5DtO4y-WquvK3U_fgCx91G82KfFi9OVXq_shPUA&_nc_ht=scontent.fsgn5-8.fna&oh=03_AdR2z1W-0sXu7ilTqW84zKHMEIUjk0vRti7aQ64Tg_4L7g&oe=64F1D7FB'
    }
  }
}  


export default function User({params}: {params: {slug: String}}) { 
  return (
    <div className='mysection pt-5 min-h-[700px]'> 
        <AccountList />
    </div>
  )
}
