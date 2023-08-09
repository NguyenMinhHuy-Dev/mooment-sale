import ProductDetail from '@/components/ProductDetail';
import { getProduct } from '@/utils';
import { Metadata } from 'next'; 

type Props = {
  params: {
    slug: string
  }
};

export async function generateMetadata({ params: { slug } }: Props) {
  const productData: Promise<any> = getProduct(slug);
  const data = await productData; 
  return {
    title: data.name,
    description: data.name + ' chính hãng - giá rẻ tại Mooment',
    openGraph: {
      title: data.name,
      type: 'website',
      url: 'https://mooment.vercel.app/' + data.slug,
      description: data.name + ' chính hãng - giá rẻ tại Mooment',
      images: data.imageUrl
    }
  }
}  

export default function page({ params }: { params: { slug: string } }) { 
  return (
    <ProductDetail slug={params.slug}/>
  )
}
