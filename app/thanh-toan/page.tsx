import CheckOutPage from '@/components/CheckOut/CheckOutPage';
import Link from 'next/link';  
 
type Props = {
  params: {
    slug: string
  }
};

export async function generateMetadata({ params: { slug } }: Props) { 
  return {
    title: "Thanh toán đơn hàng - Mooment",
    description: "Thanh toán đơn hàng của bạn",
    openGraph: {
      title: "Thanh toán đơn hàng - Mooment",
      type: 'website',
      url: 'https://mooment.vercel.app/thanh-toan',
      description: "Thanh toán đơn hàng của bạn",
      images: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.15752-9/364535853_955953882363740_1424107074459890270_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Qinfdaxe_e8AX9TP_xN&_nc_oc=AQkdBS0ucbN7UDdif1-4pAszdGJY5DtO4y-WquvK3U_fgCx91G82KfFi9OVXq_shPUA&_nc_ht=scontent.fsgn5-8.fna&oh=03_AdR2z1W-0sXu7ilTqW84zKHMEIUjk0vRti7aQ64Tg_4L7g&oe=64F1D7FB'
    }
  }
}  

export default function page() {  
      
  return (
    <CheckOutPage />
  )
}
