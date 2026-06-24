"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { useCart } from "@/lib/cart-store";
import { DownlaodIcon, HeartIcon } from "@/public/icons/icon";

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#D1D5DB" },
  { name: "Royal Blue", value: "#4054F4" },
];

const sizes = [6, 8, 10, 14, 18, 20];

const reviews = [
  {
    name: "Ricardo B.",
    date: "Nov 13, 2023",
    text: "Sam.AI is not just a workplace; it's a community of passionate individuals driven by a common goal of helping others succeed.",
  },
  {
    name: "Emily R.",
    date: "Nov 13, 2023",
    text: "Sam.AI is not just a workplace; it's a community of passionate individuals driven by a common goal of helping others succeed.",
  },
  {
    name: "Jamison E.",
    date: "Nov 13, 2023",
    text: "I recently purchased this item and I’m extremely satisfied. The material is soft, durable, and the fit is perfect.",
  },
  {
    name: "Olivia S.",
    date: "Nov 13, 2023",
    text: "I recently purchased this item and I’m extremely satisfied. It’s a versatile piece that can be dressed up or down.",
  },
];

export default function DetailPage({ item, related = [], type = "product" }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(8);
  const [selectedImage, setSelectedImage] = useState(item.image);

  const gallery = useMemo(() => {
    const images = [
      item.image,
      ...(item.gallery || []),
      ...related.map((relatedItem) => relatedItem.image),
    ].filter(Boolean);

    return [...new Set(images)].slice(0, 5);
  }, [item, related]);

  useEffect(() => {
    setSelectedImage(item.image);
  }, [item.image]);

  const handleAddToCart = () => {
    addItem({
      ...item,
      type,
      image: selectedImage || item.image,
      color: selectedColor.name,
      size: selectedSize,
    });
  };

  const handleCheckout = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <main className="bg-[#f6f6f6] pb-16">
      <section className="container-dar py-8">
        <div className="rounded-[12px] bg-white p-4 lg:p-5">
          <div className="grid gap-8 lg:grid-cols-[560px_1fr]">
            <div>
              <div className="relative overflow-hidden rounded-[12px] bg-[#f5f5f5] ">
                <img
                  src={selectedImage}
                  alt={item.title}
                  className="h-[320px] w-full object-contain object-center md:h-[470px] lg:h-[610px]"
                />
              </div>

              <div className="mt-5 flex gap-2.5 overflow-x-auto hide-scrollbar">
                {gallery.map((img, index) => {
                  const active = selectedImage === img;

                  return (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`h-[101px] w-[92px] shrink-0 overflow-hidden rounded-[12px] bg-[#f6f6f6] transition
                    
                      `}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full! w-full! object-cover!
                         object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/store-logo.png"
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <p className="text-sm font-semibold">
                    {type === "service"
                      ? "Booking Service"
                      : "The Hamzito Store"}
                  </p>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="w-9 h-9 bg-[#F2F2F2] rounded-[6px] flex items-center justify-center hover:opacity-55 duration-300 ease-in-out">
                    <DownlaodIcon />
                  </div>
                  <div className="w-9 h-9 bg-[#F2F2F2] rounded-[6px] flex items-center hover:opacity-55 duration-300 ease-in-out">
                    <HeartIcon />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl mt-3 font-semibold leading-tight text-[#19191A] lg:text-[28px]">
                {item.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-dashed border-[#A3A3A3] pb-6">
                {item.oldPrice ? (
                  <span className="text-base text-[#8A8A8A] line-through">
                    ${item.oldPrice}.00
                  </span>
                ) : null}

                <span className="lg:text-[28px] text-lg font-semibold text-[var(--orange)]">
                  ${item.price}.00
                </span>

                <span className="ml-auto text-sm lg:text-base font-medium">
                  1,238 Sold
                </span>

                <span className="text-base font-medium">
                  <span className="text-yellow-400 text-2xl">★</span>{" "}
                  {item.rating || 4.9} ({item.reviews || 23})
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-base lg:text-lg font-semibold">
                  Description:
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#666666]">
                  {item.description ||
                    "Premium quality marketplace item available with reliable checkout and delivery."}{" "}
                  <span className="text-[var(--orange)]">See More...</span>
                </p>
              </div>

              <div className="mt-8">
                <p className="text-base lg:text-lg text-[#50565D]">
                  Color:{" "}
                  <span className="font-semibold text-[#19191A]">
                    {selectedColor.name}
                  </span>
                </p>

                <div className="mt-2 flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-[64px] rounded-[8px] border p-1 ${
                        selectedColor.name === color.name
                          ? "border-[var(--orange)]"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className="block h-full w-full rounded-[4px]"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-base lg:text-lg text-[#50565D]">
                    Size:{" "}
                    <span className="font-semibold text-[#19191A]">
                      {selectedSize}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="text-sm lg:text-base font-medium text-[#1A68ED] underline"
                  >
                    View Size Chart
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 rounded-[8px] border text-sm lg:text-lg font-semibold cursor-pointer ${
                        selectedSize === size
                          ? "border-[var(--orange)] text-[var(--orange)]"
                          : "border-[#D9DBDF] text-[#19191A]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid lg:gap-6 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-12 rounded-[12px] bg-black text-sm lg:text-base font-medium cursor-pointer text-white transition hover:opacity-90"
                >
                  Add To Cart
                </button>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="h-12 rounded-[8px] bg-[var(--orange)] text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Checkout
                </button>
              </div>

              <p className="mt-5 text-xs lg:text-sm font-medium">
                Delivery T&C
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-dar">
        <div className="rounded-[12px] bg-white p-5">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div>
              <h2 className="text-[32px] font-semibold">4.8 Star</h2>
              <p className="mt-1 text-base font-medium">out of 5 star</p>
              <p className="mt-3 text-3xl text-yellow-400">★★★★★</p>
              <p className="mt-1 text-sm">based on 1,25,983 reviews</p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div
                  key={star}
                  className="grid grid-cols-[35px_18px_1fr_45px] items-center gap-3 text-sm"
                >
                  <span>{star}.0</span>
                  <span className="text-[#FEC403] text-lg">★</span>
                  <div className="h-[8px] overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-full rounded-full bg-[#FEC403]"
                      style={{
                        width:
                          index === 0
                            ? "75%"
                            : index === 1
                              ? "43%"
                              : index === 2
                                ? "14%"
                                : "0%",
                      }}
                    />
                  </div>
                  <span className="text-right font-medium">
                    {index === 0
                      ? "2823"
                      : index === 1
                        ? "38"
                        : index === 2
                          ? "4"
                          : "0"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <h3 className="mt-10 text-base lg:text-lg font-semibold">
            Product Reviews
          </h3>
          <div className="mt-3 divide-y divide-[#E5E7EB]">
            {reviews.map((review) => (
              <div key={review.name} className="py-5">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F2F2F2] text-xs font-semibold text-[var(--orange)]">
                      ER
                    </span>
                    <p className="font-medium">{review.name}</p>
                  </div>
                  <span className="rounded-[8px] bg-[#F6F6F6] px-3 py-2 text-xs lg:text-sm text-[#50565D]">
                    {review.date}
                  </span>
                </div>

                <p className="mt-3 text-2xl text-[#FEC403]">★★★★★</p>
                <p className="mt-2 text-sm leading-6 text-[#50565D]">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button className="h-9 w-9 rounded-[6px] bg-[var(--orange)] text-white">
              1
            </button>
            <button className="h-9 w-9 rounded-[6px] bg-[#F6F6F6]">2</button>
            <button className="h-9 px-3 text-[#B9B9B9]">••••••</button>
            <button className="h-9 w-9 rounded-[6px] bg-[#F6F6F6]">18</button>
          </div>
        </div>
      </section>

      <section className="container-dar mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {type === "service" ? "Related Services" : "Related Products"}
          </h2>
          <span className="text-sm lg:text-base font-medium text-[var(--orange)] cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-5 pb-1">
            {related.slice(0, 8).map((product, index) => (
              <div
                key={`${product.type}-${product.id}-${index}`}
                className="w-[215px] shrink-0 sm:w-[225px] lg:w-[255px]"
              >
                <ProductCard item={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
