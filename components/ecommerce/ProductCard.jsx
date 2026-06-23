
"use client";

import { AddToCartIcon, FavIcon } from "@/public/icons/icon";
import { useCart } from "@/lib/cart-store";
import Link from "next/link";

export default function ProductCard({ item }) {
  const { addItem } = useCart();

  const href =
    item.type === "service" ? `/service/${item.slug}` : `/product/${item.slug}`;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    addItem({
      ...item,
      color: item.color || "Black",
      size: item.size || "Small",
    });
  };

  return (
    <div className="group overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.03] transition-all duration-500 ease-out hover:-translate-y-[3px] hover:ring-black/[0.06] hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
      <Link href={href} className="block">
        <div className="relative h-[136px] overflow-hidden bg-[#F6F6F6]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute left-1 flex bottom-2 h-6 w-14 items-center justify-between rounded-[6px] bg-[#9D9D9D66] px-2 text-white backdrop-blur-sm">
            <span className="text-base text-yellow-400">★</span>
            <span className="text-xs font-normal">{item.rating || 4.9}</span>
          </div>

          <div className="absolute right-1 flex bottom-2 h-6 w-16  rounded-[6px] bg-[#9D9D9D66]  text-white backdrop-blur-sm text-xs flex items-center justify-center">
            In stock
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.10] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="px-2 pt-2 lg:pt-4 transition-colors duration-500 lg:px-4">
          <h3 className="line-clamp-1 text-[14px] font-medium text-[#0F172B] transition-colors duration-300 group-hover:text-[var(--orange)] lg:text-base">
            {item.title}
          </h3>
        </div>
      </Link>

      <div className="px-2 pb-2 pt-4">
        {item.description ? (
          <p className=" min-w-0 text-xs font-medium text-[#50565D] mb-3.5">
            {item.description}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-2">
          <p className="shrink-0 text-[17px] font-semibold text-[var(--orange)] lg:text-lg">
            ${item.price}
          </p>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#F6F6F6] text-[#50565D] transition-all duration-300 hover:bg-[var(--orange)] hover:text-white hover:shadow-[0_8px_20px_rgba(241,90,36,0.28)] active:scale-95"
            >
              <AddToCartIcon />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#F6F6F6] text-[#50565D] transition-all duration-300 hover:bg-[var(--orange)] hover:text-white hover:shadow-[0_8px_20px_rgba(241,90,36,0.28)] active:scale-95"
            >
              <FavIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}