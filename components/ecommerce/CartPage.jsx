// import Link from "next/link";

// export default function CartPage() {
//   return (
//     <main className="bg-[#f6f6f6] py-12">
//       <section className="container-dar grid gap-8 lg:grid-cols-[1fr_360px]">
//         <div className="rounded-[16px] bg-white p-6">
//           <h1 className="mb-6 text-2xl font-bold">My Cart</h1>

//           {[1, 2].map((item) => (
//             <div
//               key={item}
//               className="flex gap-4 border-b py-5 last:border-b-0"
//             >
//               <img
//                 src="/images/products/watch.png"
//                 alt=""
//                 className="h-24 w-24 rounded-xl object-cover"
//               />

//               <div className="flex-1">
//                 <h3 className="font-semibold">Long Sleeve Overshirt</h3>
//                 <p className="mt-1 text-sm text-[#777]">Color: Khaki</p>
//                 <p className="mt-3 font-bold text-[var(--orange)]">$45</p>
//               </div>

//               <div className="flex h-10 items-center rounded-lg border">
//                 <button className="px-3">-</button>
//                 <span className="px-3">1</span>
//                 <button className="px-3">+</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <aside className="rounded-[16px] bg-white p-6">
//           <h2 className="text-xl font-bold">Order Summary</h2>

//           <div className="mt-6 space-y-4 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>$90</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>$10</span>
//             </div>

//             <div className="flex justify-between border-t pt-4 text-lg font-bold">
//               <span>Total</span>
//               <span>$100</span>
//             </div>
//           </div>

//           <Link
//             href="/checkout"
//             className="mt-6 block rounded-[10px] bg-[var(--orange)] py-4 text-center text-sm font-bold text-white"
//           >
//             Proceed To Checkout
//           </Link>
//         </aside>
//       </section>
//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { formatPrice, useCart } from "@/lib/cart-store";

export default function CartPage() {
  const { items, totals, increaseItem, decreaseItem, clearCart } = useCart();

  if (!items.length) {
    return (
      <main className="bg-[#f6f6f6] py-8 lg:py-10">
        <section className="container-dar">
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[14px] bg-white px-6 py-16 text-center">
            <img
              src="/images/empty-cart.png"
              alt=""
              className="mb-8 h-[210px] w-[260px] object-contain opacity-70"
            />

            <h1 className="text-2xl font-semibold">
              Your Shopping Cart Is Empty
            </h1>

            <Link
              href="/marketplace"
              className="mt-8 rounded-[10px] bg-[var(--orange)] px-8 py-4 text-base font-semibold text-white"
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
        <div className="rounded-[14px] bg-white p-5 lg:p-6">
          <h1 className="mb-6 text-xl font-semibold">Order Summary</h1>

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.cartKey}
                className="grid gap-4 rounded-[12px] bg-[#F6F6F6] p-4 md:grid-cols-[118px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[118px] w-[118px] rounded-[10px] object-cover"
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
                  <div className="flex h-9 items-center overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white">
                    <button
                      type="button"
                      onClick={() => decreaseItem(item.cartKey)}
                      className="grid h-full w-10 place-items-center text-xl"
                    >
                      −
                    </button>

                    <span className="grid h-full w-12 place-items-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseItem(item.cartKey)}
                      className="grid h-full w-10 place-items-center text-xl"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-xl font-semibold text-[var(--orange)]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[14px] bg-white p-5 lg:p-6">
            <h2 className="mb-6 text-xl font-semibold">Price Details</h2>

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

              <div className="flex justify-between border-t border-[#E5E7EB] pt-5 text-base font-semibold">
                <span>Total (USD)</span>
                <span className="text-[var(--orange)]">
                  {formatPrice(totals.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] bg-white p-5 lg:p-6">
            <h2 className="mb-6 text-xl font-semibold">Cancellation Policy</h2>
            <p className="text-base leading-7 text-[#50565D]">
              Free cancellation before 14:00 on 17 Aug. Cancel before 24 Aug for
              a partial refund.
            </p>
            <button className="mt-3 text-base font-semibold text-[var(--orange)] underline">
              Learn more
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <button
              type="button"
              onClick={clearCart}
              className="h-12 rounded-[8px] border border-black text-sm font-semibold"
            >
              Empty Cart
            </button>

            <Link
              href="/checkout"
              className="grid h-12 place-items-center rounded-[8px] bg-[var(--orange)] text-sm font-semibold text-white"
            >
              Checkout
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}