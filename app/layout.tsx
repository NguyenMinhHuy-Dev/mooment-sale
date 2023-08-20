import Navbar from '@/components/Header/Navbar'
import './globals.css'
import TawkTo from '@/components/TawkTo'; 
import { Providers } from '@/redux/provider';
import Footer from '@/components/Footer';
import MailChimpPopUp from '@/components/MailChimpPopUp';
import MessengerChat from '@/components/MessengerChat';
import Script from 'next/script';
import Head from 'next/head';


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
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J9WGMJM2PN"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); 
              gtag('config', 'G-J9WGMJM2PN');
            `
          }}
        > 
        </script>
      </Head>
      

      <Script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=64e1d1a680556000127479ff&product=inline-share-buttons&source=platform"></Script>
      <Script id="mcjs">
            {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/b20d117330404a90801147d3f/1d24ba73d202403817eda5d3d.js");`}
      </Script>
      <body className="relative bg-white">
          <Providers>
            {/* <MailChimpPopUp /> */}
            <TawkTo />
            <MessengerChat />
            <Navbar />
            {children}
            <Footer />
          </Providers> 
      </body>
    </html>
  )
}
