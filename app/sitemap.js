import { fetchProducts } from "@/utils";

 
const URL = "https://mooment.vercel.app";

export default async function sitemap() {
  // const posts = getSortedPostsData.map(({ id, date }) => ({
  //   url: `${URL}/blog/${id}`,
  //   lastModified: date,
  // }));
  const products = await fetchProducts(); 
  const renderProducts =  products.map(({ _id, updatedAt }) => ({
      url: `${URL}/${_id}`,
      lastModified: updatedAt,
  }))

  const routes = ["", "/chi-nhanh", "/tai-khoan", "/tai-khoan?so-dia-chi", "/tai-khoan?don-hang", "/tai-khoan?yeu-thich", "/tai-khoan?da-xem"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...renderProducts];
}
