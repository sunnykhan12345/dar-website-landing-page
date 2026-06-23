// import ProductCard from "../../../components/ecommerce/ProductCard";

// export default function DetailPage({ item, related = [], type = "product" }) {
//   return (
//     <main className="bg-white pb-16">
//       <section className="container-dar py-10">
//         <div className="grid gap-10 lg:grid-cols-[560px_1fr]">
//           <div>
//             <div className="overflow-hidden rounded-[18px] bg-[#f5f5f5]">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-[560px] w-full object-cover"
//               />
//             </div>

//             <div className="mt-4 flex gap-3">
//               {(item.gallery || [item.image, item.image, item.image]).map(
//                 (img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt=""
//                     className="h-20 w-20 rounded-lg object-cover"
//                   />
//                 ),
//               )}
//             </div>
//           </div>

//           <div>
//             <p className="text-sm text-[#777]">
//               {type === "service" ? "Booking Service" : "The Hamzito Store"}
//             </p>

//             <h1 className="mt-2 text-3xl font-bold leading-tight">
//               {item.title}
//             </h1>

//             <div className="mt-3 flex items-center gap-4 text-sm">
//               <span>⭐ {item.rating}</span>
//               <span>{item.reviews} Reviews</span>
//             </div>

//             <div className="mt-5 flex items-end gap-3">
//               {item.oldPrice && (
//                 <span className="text-sm text-[#777] line-through">
//                   €{item.oldPrice}
//                 </span>
//               )}

//               <span className="text-3xl font-bold text-[var(--orange)]">
//                 €{item.price}.00
//               </span>
//             </div>

//             <p className="mt-6 max-w-xl text-sm leading-7 text-[#555]">
//               {item.description}
//             </p>

//             <div className="mt-8">
//               <h3 className="mb-3 font-semibold">Color Royal Brown</h3>

//               <div className="flex gap-3">
//                 {["#231713", "#d9d2c6", "#1d1d1d", "#4866ee"].map((color) => (
//                   <button
//                     key={color}
//                     style={{ backgroundColor: color }}
//                     className="h-8 w-8 rounded"
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="mt-8 flex gap-3">
//               <button className="h-12 rounded-[8px] bg-black px-10 text-sm font-semibold text-white">
//                 Add To Cart
//               </button>

//               <button className="h-12 rounded-[8px] bg-[var(--orange)] px-10 text-sm font-semibold text-white">
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="container-dar border-t py-10">
//         <h2 className="mb-6 text-2xl font-bold">4.8 Star</h2>

//         <div className="space-y-5">
//           {["Ronald Richards", "Emily R.", "Jenny Wilson"].map((name) => (
//             <div key={name} className="border-b pb-5">
//               <p className="font-semibold">{name}</p>
//               <p className="mt-1 text-yellow-400">★★★★★</p>
//               <p className="mt-2 text-sm text-[#555]">
//                 Great quality and smooth marketplace experience.
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="container-dar py-10">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Related Products</h2>
//           <span className="text-sm text-[var(--orange)]">View all</span>
//         </div>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {related.map((product) => (
//             <ProductCard key={product.id} item={product} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
import DetailPage from "@/components/ecommerce/DetailPage";
import { getProductBySlug, getProducts } from "@/lib/commerce-api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | DAR AI",
    };
  }

  return {
    title: `${product.title} | DAR AI Marketplace`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getProducts();

  return <DetailPage item={product} related={related} type="product" />;
}
