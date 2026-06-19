export default function CheckoutPage() {
  return (
    <main className="bg-[#f6f6f6] py-12">
      <section className="container-dar grid gap-8 lg:grid-cols-[1fr_360px]">
        <form className="rounded-[16px] bg-white p-6">
          <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "First Name",
              "Last Name",
              "Email Address",
              "Phone Number",
              "City",
              "Postal Code",
            ].map((label) => (
              <label key={label} className="text-sm font-medium">
                {label}
                <input
                  className="mt-2 h-12 w-full rounded-[10px] bg-[#f6f6f6] px-4 outline-none focus:ring-1 focus:ring-[var(--orange)]"
                  placeholder={label}
                />
              </label>
            ))}

            <label className="text-sm font-medium md:col-span-2">
              Address
              <textarea
                className="mt-2 min-h-28 w-full rounded-[10px] bg-[#f6f6f6] px-4 py-3 outline-none focus:ring-1 focus:ring-[var(--orange)]"
                placeholder="Complete address"
              />
            </label>
          </div>

          <div className="mt-6 rounded-[12px] bg-[#f6f6f6] p-4">
            <h2 className="mb-4 font-bold">Payment Method</h2>

            <label className="mb-3 flex items-center gap-3 text-sm">
              <input type="radio" name="payment" defaultChecked />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input type="radio" name="payment" />
              Pay Online
            </label>
          </div>
        </form>

        <aside className="rounded-[16px] bg-white p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$90</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>$10</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>$100</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-[10px] bg-[var(--orange)] py-4 text-sm font-bold text-white">
            Place Order
          </button>
        </aside>
      </section>
    </main>
  );
}
