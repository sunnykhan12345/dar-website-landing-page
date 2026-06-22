export default function FiltersSidebar({ mode = "products" }) {
  const options =
    mode === "services"
      ? ["Car Wash", "House Cleaning", "Oil Change", "Laundry", "AC Repair"]
      : ["Apple", "Samsung", "Nokia", "Xiaomi", "Realme", "Redmi"];

  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <h3 className="mb-4 text-[15px] lg:text-lg font-semibold">
        Filters & Sort
      </h3>
      <div className="space-y-5">
        <div className="rounded-[12px] bg-white p-5">
          <h4 className="mb-4 lg:mb-5 text-sm lg:text-lg font-semibold">
            Price Range
          </h4>
          <div className="rounded-[66px] bg-[#F2F2F2] px-4 py-3 text-sm font-medium">
            $550
          </div>
          <input
            className="mt-4 lg:mt-5 w-full accent-[var(--orange)]"
            type="range"
          />
          <div className="flex justify-between text-[12px] text-[#50565D]">
            <span>$0</span>
            <span>$2000</span>
          </div>
        </div>
        <div className="rounded-[12px] bg-white p-5">
          <h4 className="mb-4 text-[15px] lg:text-lg font-semibold">
            Sort By Price
          </h4>
          {["High to Low", "Low to High"].map((item, index) => (
            <label
              key={item}
              className="mb-4 flex items-center gap-2.5 text-base"
            >
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="accent-[var(--orange)]"
              />
              {item}
            </label>
          ))}
        </div>
        <div className="rounded-[12px] bg-white p-5">
          <h4 className="mb-4 text-[15px] lg:text-lg font-semibold">
            {mode === "services" ? "Service" : "Brands"}
          </h4>
          {options.map((item, index) => (
            <label
              key={item}
              className="mb-4 flex items-center gap-2.5 text-base"
            >
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="accent-[var(--orange)]"
              />
              {item}
            </label>
          ))}
        </div>
        <div className="rounded-[12px] bg-white p-5">
          <h4 className="mb-4 lg:mb-5 text-sm lg:text-base font-semibold">
            Ratings
          </h4>
          {[5, 4, 3, 2, 1].map((rate) => (
            <label
              key={rate}
              className="mb-3 flex items-center gap-2 text-sm lg:text-base"
            >
              <input type="checkbox" className="accent-[var(--orange)]" />
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-[#50565D]">{rate} Star</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
