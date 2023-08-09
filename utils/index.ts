
// 'use server'
export async function fetchCategories() { 
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
        cache: 'no-cache'
    }) 
    if (!res.ok) { 
      throw new Error('Failed to fetch data')
    } 
    return res.json()
}

export async function fetchCategory(slug: String) { 
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories/" + slug, {
        cache: 'no-cache'
    }) 
    if (!res.ok) { 
      throw new Error('Failed to fetch data')
    } 
    return res.json()
}

export async function fetchBrands() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/brands", {
      cache: 'no-cache'
  });
  if (!res.ok) { 
    throw new Error('Failed to fetch data');
  } 
  return res.json();
}

export async function fetchProducts() {  
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        cache: 'no-cache'
    }) 
    if (!res.ok) { 
      throw new Error('Failed to fetch data')
    } 
    return res.json()

    // await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    //     cache: "no-cache"
    // })
    // .then(res => res.json())
    // .then(res => {
    //     return res;
    // })
    // .catch((err) => {
    //     // throw new Error("Failed to fetch data");
    // }); 
}

export async function addToFavourite(id: any) {
  
}
export async function  getProduct(slug: String) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products/" + slug);
  return response.json();
} 