
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

export async function fetchProducts() {  
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        cache: "no-cache"
    })
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        // throw new Error("Failed to fetch data");
    }); 
}