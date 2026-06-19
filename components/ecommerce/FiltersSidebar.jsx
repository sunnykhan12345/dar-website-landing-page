export default function FiltersSidebar({ mode = "products" }) {
  const options =
    mode === "services"
      ? ["Car Wash", "House Cleaning", "Oil Change", "Laundry", "AC Repair"]
      : ["Apple", "Samsung", "Nokia", "Xiaomi", "Realme", "Redmi"];

  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <h3 className="mb-4 text-[15px] font-bold">Filters & Sort</h3>

      <div className="space-y-4">
        <div className="rounded-[14px] bg-white p-5">
          <h4 className="mb-4 text-sm font-bold">Price Range</h4>
          <div className="rounded-full bg-[#f1f1f1] px-4 py-3 text-sm">
            $550
          </div>
          <input className="mt-4 w-full accent-[var(--orange)]" type="range" />
          <div className="flex justify-between text-[10px] text-[#777]">
            <span>$0</span>
            <span>$2000</span>
          </div>
        </div>

        <div className="rounded-[14px] bg-white p-5">
          <h4 className="mb-4 text-sm font-bold">Sort By Price</h4>
          {["High to Low", "Low to High"].map((item, index) => (
            <label key={item} className="mb-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="accent-[var(--orange)]"
              />
              {item}
            </label>
          ))}
        </div>

        <div className="rounded-[14px] bg-white p-5">
          <h4 className="mb-4 text-sm font-bold">
            {mode === "services" ? "Service" : "Brands"}
          </h4>

          {options.map((item, index) => (
            <label key={item} className="mb-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="accent-[var(--orange)]"
              />
              {item}
            </label>
          ))}
        </div>

        <div className="rounded-[14px] bg-white p-5">
          <h4 className="mb-4 text-sm font-bold">Ratings</h4>
          {[5, 4, 3, 2, 1].map((rate) => (
            <label key={rate} className="mb-3 flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[var(--orange)]" />
              <span className="text-yellow-400">★★★★★</span>
              <span>{rate} Star</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
