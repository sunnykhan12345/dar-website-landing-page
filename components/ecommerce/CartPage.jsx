"use client";

import Link from "next/link";
import { formatPrice, useCart } from "@/lib/cart-store";

export default function CartPage() {
  const { items, totals, increaseItem, decreaseItem, clearCart } = useCart();

  if (!items.length) {
    return (
      <main className="bg-[#f6f6f6] py-8">
        <section className="container-dar">
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[12px] bg-white px-6 py-16 text-center">
            <img
              src="/images/empty-cart.png"
              alt=""
              className="mb-8 h-[230px] w-[294px] object-contain opacity-70"
            />

            <h1 className="text-xl font-medium">Your Shopping Cart Is Empty</h1>

            <Link
              href="/marketplace"
              className="mt-8 rounded-[12px] bg-[var(--orange)] px-8 py-4 text-base font-medium text-white cursor-pointer hover:opacity-70 ease-in-out duration-300"
            >
              Start Shopping Now
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f6f6] py-8 lg:py-10">
      <section className="container-dar grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[12px] bg-white p-5">
          <h1 className="mb-6 text-lg font-semibold">Order Summary</h1>

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.cartKey}
                className="grid gap-4 rounded-[12px] bg-[#F6F6F6] p-3 md:grid-cols-[118px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[131px]! w-[131px]! rounded-xl object-cover"
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm text-[#50565D]">
                    Colour: {item.color}
                  </p>
                  <p className="mt-2 text-sm text-[#50565D]">
                    Size: {item.size}
                  </p>
                  <p className="mt-2 text-sm text-[#50565D]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between gap-5">
                  <div className="flex h-9 items-center overflow-hidden rounded-[6px] border border-[#E5E7EB] p-1">
                    <button
                      type="button"
                      onClick={() => decreaseItem(item.cartKey)}
                      className="grid h-full w-10 place-items-center text-xl bg-[#F2F2F2] w-6 h-6 rounded-[6px] cursor-pointer"
                    >
                      −
                    </button>

                    <span className="grid h-full w-12 place-items-center font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseItem(item.cartKey)}
                      className="grid h-full w-10 place-items-center text-xl bg-[#F2F2F2] w-6 h-6 rounded-[6px] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-[var(--orange)]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[12px] bg-white p-5">
            <h2 className="mb-6 text-lg font-semibold">Price Details</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex justify-between gap-4 text-base"
                >
                  <span className="line-clamp-1">{item.title}</span>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between gap-4 text-base">
                <span>Delivery Charges</span>
                <span className="font-medium">
                  {formatPrice(totals.delivery)}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#E5E7EB] pt-5 text-base font-medium">
                <span>Total (USD)</span>
                <span className="text-[var(--orange)] font-semibold">
                  {formatPrice(totals.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] bg-white p-5">
            <h2 className="mb-6 text-lg font-semibold">Cancellation Policy</h2>
            <p className="text-base leading-7 text-[#50565D]">
              Free cancellation before 14:00 on 17 Aug. Cancel before 24 Aug for
              a partial refund.
            </p>
            <button className="mt-3 text-base font-semibold text-[var(--orange)] underline">
              Learn more
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:gap-6">
            <button
              type="button"
              onClick={clearCart}
              className="h-12 rounded-[12px] border border-black text-sm lg:text-base font-medium cursor-pointer hover:opacity-70 duration-300 ease-in-out"
            >
              Empty Cart
            </button>

            <Link
              href="/checkout"
              className="grid h-12 place-items-center rounded-[8px] bg-[var(--orange)] text-sm lg:text-base font-medium cursor-pointer hover:opacity-70 duration-300 ease-in-out text-white"
            >
              Checkout
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
