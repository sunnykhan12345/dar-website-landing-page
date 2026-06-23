// export default function CheckoutPage() {
//   return (
//     <main className="bg-[#f6f6f6] py-12">
//       <section className="container-dar grid gap-8 lg:grid-cols-[1fr_360px]">
//         <form className="rounded-[16px] bg-white p-6">
//           <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

//           <div className="grid gap-4 md:grid-cols-2">
//             {[
//               "First Name",
//               "Last Name",
//               "Email Address",
//               "Phone Number",
//               "City",
//               "Postal Code",
//             ].map((label) => (
//               <label key={label} className="text-sm font-medium">
//                 {label}
//                 <input
//                   className="mt-2 h-12 w-full rounded-[10px] bg-[#f6f6f6] px-4 outline-none focus:ring-1 focus:ring-[var(--orange)]"
//                   placeholder={label}
//                 />
//               </label>
//             ))}

//             <label className="text-sm font-medium md:col-span-2">
//               Address
//               <textarea
//                 className="mt-2 min-h-28 w-full rounded-[10px] bg-[#f6f6f6] px-4 py-3 outline-none focus:ring-1 focus:ring-[var(--orange)]"
//                 placeholder="Complete address"
//               />
//             </label>
//           </div>

//           <div className="mt-6 rounded-[12px] bg-[#f6f6f6] p-4">
//             <h2 className="mb-4 font-bold">Payment Method</h2>

//             <label className="mb-3 flex items-center gap-3 text-sm">
//               <input type="radio" name="payment" defaultChecked />
//               Cash On Delivery
//             </label>

//             <label className="flex items-center gap-3 text-sm">
//               <input type="radio" name="payment" />
//               Pay Online
//             </label>
//           </div>
//         </form>

//         <aside className="rounded-[16px] bg-white p-6">
//           <h2 className="text-xl font-bold">Order Summary</h2>

//           <div className="mt-6 space-y-4 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>$90</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Delivery</span>
//               <span>$10</span>
//             </div>

//             <div className="flex justify-between border-t pt-4 text-lg font-bold">
//               <span>Total</span>
//               <span>$100</span>
//             </div>
//           </div>

//           <button className="mt-6 w-full rounded-[10px] bg-[var(--orange)] py-4 text-sm font-bold text-white">
//             Place Order
//           </button>
//         </aside>
//       </section>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, useCart } from "@/lib/cart-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, increaseItem, decreaseItem, clearCart } = useCart();

  const [paymentType, setPaymentType] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
    billingPostalCode: "",
    billingCountry: "United States",
    rememberPayment: false,
  });

  const updateField = (name, value) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!items.length) return;

    setSubmitting(true);
    setError("");

    const payload = {
      customer: {
        fullName: formData.fullName,
        contact: formData.contact,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentType,
      items,
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total,
    };

    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Order request failed.");
        }
      }

      clearCart();
      router.push("/cart");
    } catch (err) {
      setError("Order could not be placed. Please check API endpoint.");
    } finally {
      setSubmitting(false);
    }
  };

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

            <button
              type="button"
              onClick={() => router.push("/marketplace")}
              className="mt-8 rounded-[10px] bg-[var(--orange)] px-8 py-4 text-base font-semibold text-white"
            >
              Start Shopping Now
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f6f6] py-8 lg:py-10">
      <form
        onSubmit={handleSubmit}
        className="container-dar grid gap-6 lg:grid-cols-[1fr_420px]"
      >
        <div className="space-y-6">
          <section className="rounded-[14px] bg-white p-5 lg:p-6">
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
          </section>

          <section className="rounded-[14px] bg-white p-5 lg:p-6">
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
          </section>

          <section className="rounded-[14px] bg-white p-5 lg:p-6">
            <h2 className="mb-5 text-xl font-semibold">Payment Type</h2>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["cod", "Cash On Delivery"],
                ["whatsapp", "Whatsapp Payment"],
                ["online", "Online"],
              ].map(([value, label]) => {
                const active = paymentType === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentType(value)}
                    className={`flex h-14 items-center gap-4 rounded-[10px] px-5 text-sm font-semibold ${
                      active ? "bg-[#FFF3EE]" : "bg-[#F6F6F6]"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-[4px] border ${
                        active
                          ? "border-[var(--orange)] bg-[var(--orange)] text-white"
                          : "border-[#E5E7EB] bg-white"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[14px] bg-white p-5 lg:p-6">
            <h2 className="mb-6 text-xl font-semibold">Cancellation Policy</h2>
            <p className="text-base leading-7 text-[#50565D]">
              Free cancellation before 14:00 on 17 Aug. Cancel before 24 Aug for
              a partial refund.
            </p>
            <button
              type="button"
              className="mt-3 text-base font-semibold text-[var(--orange)] underline"
            >
              Learn more
            </button>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[14px] bg-white p-5 lg:p-6">
            <h2 className="mb-6 text-xl font-semibold">Delivery Location</h2>

            <div className="space-y-5">
              <InputField
                label="Full Name"
                required
                value={formData.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="write here"
              />

              <InputField
                label="Contact"
                required
                value={formData.contact}
                onChange={(value) => updateField("contact", value)}
                placeholder="0000000000"
                prefix="+92"
              />

              <InputField
                label="Enter Full Address"
                required
                value={formData.address}
                onChange={(value) => updateField("address", value)}
                placeholder="write here"
              />

              <div className="grid grid-cols-2 gap-5">
                <SelectField
                  label="City"
                  required
                  value={formData.city}
                  onChange={(value) => updateField("city", value)}
                  options={["Rawalpindi", "Islamabad", "Lahore", "Karachi"]}
                />

                <InputField
                  label="Postal Code"
                  required
                  value={formData.postalCode}
                  onChange={(value) => updateField("postalCode", value)}
                  placeholder="000000"
                />
              </div>

              <SelectField
                label="Country/Region"
                required
                value={formData.country}
                onChange={(value) => updateField("country", value)}
                options={["Pakistan", "United Arab Emirates", "United States"]}
              />
            </div>
          </section>

          {paymentType === "online" ? (
            <section className="rounded-[14px] bg-white p-5 lg:p-6">
              <h2 className="mb-6 text-xl font-semibold">Checkout</h2>

              <div className="space-y-5">
                <InputField
                  label="Card Number"
                  required
                  value={formData.cardNumber}
                  onChange={(value) => updateField("cardNumber", value)}
                  placeholder="1234 1234 1234 1234"
                />

                <div className="grid grid-cols-2 gap-5">
                  <InputField
                    label="Expiration"
                    required
                    value={formData.expiration}
                    onChange={(value) => updateField("expiration", value)}
                    placeholder="MM/DD/YYYY"
                  />

                  <InputField
                    label="CVC"
                    required
                    value={formData.cvc}
                    onChange={(value) => updateField("cvc", value)}
                    placeholder="123"
                  />
                </div>

                <InputField
                  label="Postal Code"
                  required
                  value={formData.billingPostalCode}
                  onChange={(value) => updateField("billingPostalCode", value)}
                  placeholder="000000"
                />

                <InputField
                  label="Country/Region"
                  required
                  value={formData.billingCountry}
                  onChange={(value) => updateField("billingCountry", value)}
                  placeholder="United States"
                />

                <label className="flex items-start gap-3 text-sm text-[#50565D]">
                  <input
                    type="checkbox"
                    checked={formData.rememberPayment}
                    onChange={(event) =>
                      updateField("rememberPayment", event.target.checked)
                    }
                    className="mt-1 h-5 w-5 rounded accent-[var(--orange)]"
                  />
                  <span>
                    <span className="block font-semibold text-[#344054]">
                      Remember Payment Method
                    </span>
                    Save my card details for next time.
                  </span>
                </label>
              </div>
            </section>
          ) : null}

          {error ? (
            <p className="rounded-[10px] bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <div className="grid grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="h-12 rounded-[8px] border border-black text-sm font-semibold"
            >
              Discard
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="h-12 rounded-[8px] bg-[var(--orange)] text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Checkout"}
            </button>
          </div>
        </aside>
      </form>
    </main>
  );
}

function InputField({ label, required, value, onChange, placeholder, prefix }) {
  return (
    <label className="block text-sm font-medium">
      {label}{" "}
      {required ? <span className="text-[var(--orange)]">*</span> : null}
      <div className="mt-2 flex h-14 items-center rounded-[10px] bg-[#F6F6F6] px-4">
        {prefix ? (
          <span className="mr-3 border-r border-[#D9D9D9] pr-3 text-[#8A8A8A]">
            {prefix}
          </span>
        ) : null}

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8A8A8A]"
        />
      </div>
    </label>
  );
}

function SelectField({ label, required, value, onChange, options }) {
  return (
    <label className="block text-sm font-medium">
      {label}{" "}
      {required ? <span className="text-[var(--orange)]">*</span> : null}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-14 w-full rounded-[10px] bg-[#F6F6F6] px-4 text-sm text-[#8A8A8A] outline-none"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
