import Link from "next/link";

export default function CartPage() {
  return (
    <main className="bg-[#f6f6f6] py-12">
      <section className="container-dar grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[16px] bg-white p-6">
          <h1 className="mb-6 text-2xl font-bold">My Cart</h1>

          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex gap-4 border-b py-5 last:border-b-0"
            >
              <img
                src="/images/products/watch.png"
                alt=""
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">Long Sleeve Overshirt</h3>
                <p className="mt-1 text-sm text-[#777]">Color: Khaki</p>
                <p className="mt-3 font-bold text-[var(--orange)]">$45</p>
              </div>

              <div className="flex h-10 items-center rounded-lg border">
                <button className="px-3">-</button>
                <span className="px-3">1</span>
                <button className="px-3">+</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[16px] bg-white p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$90</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>$100</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block rounded-[10px] bg-[var(--orange)] py-4 text-center text-sm font-bold text-white"
          >
            Proceed To Checkout
          </Link>
        </aside>
      </section>
    </main>
  );
}
