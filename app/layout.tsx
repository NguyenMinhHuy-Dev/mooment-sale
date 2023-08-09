import Navbar from '@/components/Navbar'
import './globals.css'
import TawkTo from '@/components/TawkTo'; 
import { Providers } from '@/redux/provider';
import Footer from '@/components/Footer';


export async function generateMetadata() {
  return { 
    title: 'Mooment | Bàn phím cơ cao cấp - chính hãng',
    description: 'Mooment - Cung cấp Hi-End Bàn phím cơ, phụ kiện bàn phím custom Chuyên Nghiệp - Website : mooment.vercel.app- Hotline : 0938745593',
    metadataBase: new URL('https://mooment.vercel.app/'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: 'Mooment | Bàn phím cơ cao cấp - chính hãng',
      type: 'website',
      url: 'https://mooment.vercel.app/',
      description: 'Mooment - Cung cấp Hi-End Bàn phím cơ, phụ kiện bàn phím custom Chuyên Nghiệp - Website : mooment.vercel.app- Hotline : 0938745593',
      images: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.15752-9/364535853_955953882363740_1424107074459890270_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Qinfdaxe_e8AX9TP_xN&_nc_oc=AQkdBS0ucbN7UDdif1-4pAszdGJY5DtO4y-WquvK3U_fgCx91G82KfFi9OVXq_shPUA&_nc_ht=scontent.fsgn5-8.fna&oh=03_AdR2z1W-0sXu7ilTqW84zKHMEIUjk0vRti7aQ64Tg_4L7g&oe=64F1D7FB'
    }
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative bg-white">
        <Providers>
            <Navbar />
            {children}
            <Footer />
            <TawkTo />
        </Providers>
      </body>
    </html>
  )
}
