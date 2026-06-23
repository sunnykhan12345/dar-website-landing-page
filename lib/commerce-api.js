const API_URL = process.env.NEXT_PUBLIC_API_URL;
const products = [
  {
    id: 1,
    slug: "smart-watch",
    type: "product",
    title: "Long Sleeve Overshirt, Khaki",
    category: "Shoes",
    price: 45,
    oldPrice: 650,
    rating: 4.9,
    reviews: 3853,
    image: "/images/watch.png",

  },
  {
    id: 2,
    slug: "yellow-fashion-jacket",
    type: "product",
    title: "Yellow Fashion Jacket",
    category: "Jackets",
    price: 45,
    rating: 4.8,
    reviews: 420,
    image: "/images/jacket.png",

  },
  {
    id: 3,
    slug: "smart-watch",
    type: "product",
    title: "Shoes For Running",
    category: "Shoes",
    price: 45,
    oldPrice: 650,
    rating: 4.9,
    reviews: 3853,
    image: "/images/shoes.png",

  },
  {
    id: 4,
    slug: "yellow-fashion-jacket",
    type: "product",
    title: "T shirts for summer",
    category: "Jackets",
    price: 45,
    rating: 4.8,
    reviews: 420,
    image: "/images/t-shirt.png",

  },
  {
    id: 5,
    slug: "smart-watch",
    type: "product",
    title: "Shoes For Running",
    category: "Shoes",
    price: 45,
    oldPrice: 650,
    rating: 4.9,
    reviews: 3853,
    image: "/images/shoes.png",
    // description:
    //   "Premium quality product designed for modern buyers with reliable delivery and simple checkout.",
  },
];
const services = [
  {
    id: 1,
    slug: "car-wash-service",
    type: "service",
    title: "Premium Car Service",
    category: "Car Wash",
    price: 45,
    rating: 4.8,
    reviews: 210,
    image: "/images/car-wash.png",
    gallery: [
      "/images/car-wash-1.png",
      "/images/car-wash-2.png",
      "/images/car-wash-3.png",
    ],
    description: "Shop 08, Ground Floor, Gueliz, Marrakech, Morocco",
  },
  {
    id: 2,
    slug: "car-wash-service",
    type: "service",
    title: "Premium Car Service",
    category: "Car Wash",
    price: 45,
    rating: 4.8,
    reviews: 210,
    image: "/images/car-wash-1.png",
    gallery: [
      "/images/car-wash-1.png",
      "/images/car-wash-2.png",
      "/images/car-wash-3.png",
    ],
    description: "Shop 08, Ground Floor, Gueliz, Marrakech, Morocco",
  },
  {
    id: 3,
    slug: "car-wash-service",
    type: "service",
    title: "Premium Car Service",
    category: "Car Wash",
    price: 45,
    rating: 4.8,
    reviews: 210,
    image: "/images/car-wash-2.png",
    gallery: [
      "/images/car-wash-1.png",
      "/images/car-wash-2.png",
      "/images/car-wash-3.png",
    ],
    description: "Shop 08, Ground Floor, Gueliz, Marrakech, Morocco",
  },
  {
    id: 4,
    slug: "car-wash-service",
    type: "service",
    title: "Premium Car Service",
    category: "Car Wash",
    price: 45,
    rating: 4.8,
    reviews: 210,
    image: "/images/car-wash-3.png",
    gallery: [
      "/images/car-wash-1.png",
      "/images/car-wash-2.png",
      "/images/car-wash-3.png",
    ],
    description: "Shop 08, Ground Floor, Gueliz, Marrakech, Morocco",
  },
  {
    id: 5,
    slug: "car-wash-service",
    type: "service",
    title: "Premium Car Service",
    category: "Car Wash",
    price: 45,
    rating: 4.8,
    reviews: 210,
    image: "/images/car-wash.png",
    gallery: [
      "/images/car-wash-1.png",
      "/images/car-wash-2.png",
      "/images/car-wash-3.png",
    ],
    description: "Shop 08, Ground Floor, Gueliz, Marrakech, Morocco",
  },
];
const stores = [
  {
    id: 1,
    slug: "the-hamzito-store",
    title: "The Hamzito Store",
    logo: "/images/store-logo.png",
    cover: "/images/store.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description:
      "Fueling Your Day, One Sip at a Time: Discover the Magic of Coffee.",
  },
  {
    id: 2,
    slug: "the-sunny-store",
    title: "The Sunny Store",
    logo: "/images/store-3-logo.png",
    cover: "/images/store-3.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description:
      "Fueling Your Day, One Sip at a Time: Discover the Magic of Coffee.",
  },
  {
    id: 3,
    slug: "moon-coffee-store",
    title: "Moon Coffee Store",
    logo: "/images/moon-logo.png",
    cover: "/images/moon.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description:
      "Fueling Your Day, One Sip at a Time: Discover the Magic of Coffee.",
  },
  {
    id: 4,
    slug: "moon-night-store",
    title: "Moon Night Store",
    logo: "/images/moon-logo.png",
    cover: "/images/moon.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description:
      "Fueling Your Day, One Sip at a Time: Discover the Magic of Coffee.",
  },
  {
    id: 5,
    slug: "marrakech-moon-store",
    title: "Marrakech Moon Store",
    logo: "/images/moon-logo.png",
    cover: "/images/moon.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description:
      "Fueling Your Day, One Sip at a Time: Discover the Magic of Coffee.",
  },
];
async function safeFetch(endpoint, fallback) {
  if (!API_URL) return fallback;

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}
export async function getMarketplaceData() {
  return safeFetch("/marketplace", { products, services, stores });
}
export async function getProducts() {
  return safeFetch("/products", products);
}
export async function getServices() {
  return safeFetch("/services", services);
}
export async function getProductBySlug(slug) {
  const data = await getProducts();
  return data.find((item) => item.slug === slug) || null;
}
export async function getServiceBySlug(slug) {
  const data = await getServices();
  return data.find((item) => item.slug === slug) || null;
}
