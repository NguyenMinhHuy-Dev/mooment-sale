export async function fetchCategories() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
        cache: "no-cache"
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
     
      return res.json()
}

export async function fetchProducts() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        cache: "no-cache"
    }); 

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}