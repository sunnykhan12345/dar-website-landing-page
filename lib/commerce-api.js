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
    description:
      "Premium quality product designed for modern buyers with reliable delivery and simple checkout.",
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
    description:
      "Stylish everyday fashion item available from trusted marketplace stores.",
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
    description:
      "Premium quality product designed for modern buyers with reliable delivery and simple checkout.",
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
    description:
      "Stylish everyday fashion item available from trusted marketplace stores.",
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
    description:
      "Premium quality product designed for modern buyers with reliable delivery and simple checkout.",
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
    description:
      "Book professional car services from verified providers near your location.",
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
    description:
      "Book professional car services from verified providers near your location.",
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
    description:
      "Book professional car services from verified providers near your location.",
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
    description:
      "Book professional car services from verified providers near your location.",
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
    description:
      "Book professional car services from verified providers near your location.",
  },
];

const stores = [
  {
    id: 1,
    slug: "the-hamzito-store",
    title: "The Hamzito Store",
    logo: "/images/stores/logo.png",
    cover: "/images/stores/capily.png",
    category: "Coffee Shop",
    location: "Marrakech, Morocco",
    distance: "1.4 km away",
    description: "Fueling your day, one sip at a time.",
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
    description:
      "Book professional car services from verified providers near your location.",
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
