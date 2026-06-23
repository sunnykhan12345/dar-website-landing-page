import ProductCard from "./ProductCard";

export default function StoreDetailPage({ store, products, services }) {
  return (
    <main className="bg-[#f6f6f6] rounded-tl-[12px] pb-20">
      <section className="container-dar pt-8">
        <div className="overflow-hidden">
          <div className="h-[220px] overflow-hidden rounded-tl-[12px]">
            <img
              src={store.cover}
              alt={store.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative  rounded-bl-[12px] rounded-br-[12px] bg-white flex flex-col gap-4   px-6 pb-5 pt-7 md:flex-row md:items-end">
            <img
              src={store.logo}
              alt={store.title}
              className="absolute -top-6 left-6 h-[120px] w-[120px] rounded-[19px] border-4 border-white/80 object-cover shadow"
            />
            <div className="md:ml-[145px] -mt-4">
              <h1 className="text-2xl lg:text-4xl font-semibold">
                {store.title}
              </h1>
              <div className="mt-3 flex gap-8 text-sm">
                {["Explore", "Items", "Concierge", "About"].map(
                  (item, index) => (
                    <button
                      key={item}
                      className={`pb-3 ${
                        index === 0
                          ? "border-b-2 border-[var(--orange)] text-[var(--orange)]"
                          : "text-[#555]"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* nelwo sections */}
      <section className="container-dar mt-6 lg:mt-8">
        <h2 className="mb-4 text-lg font-semibold">Discounts</h2>
        <div className="grid gap-5 lg:gap-6 md:grid-cols-4">
          {[
            ["90%", "Off On Shoes"],
            ["90%", "Off On T-Shirts"],
            ["70%", "Off On Shoes new"],
            ["Free", "Smart Watch"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`rounded-[12px] p-4 text-white ${
                index === 3 ? "bg-black" : "bg-[#6416d6]"
              }`}
            >
              <p className="text-xs">Discount</p>
              <h3 className="mt-3 text-2xl font-extrabold text-yellow-300">
                {value}
              </h3>
              <p className="mt-1 font-medium text-yellow-200">{label}</p>
              <p className="mt-1 text-[10px] leading- text-white/70">
                Limited time marketplace offer available for selected customers.
              </p>
            </div>
          ))}
        </div>
      </section>
      <StoreRow title="Best Selling Products" items={products} />
      <StoreRow title="50% Off On Products" items={products} />
      <StoreRow title="Top Booking Services" items={services} />
    </main>
  );
}

function StoreRow({ title, items }) {
  return (
    <section className="container-dar mt-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm lg:text-base font-medium text-[var(--orange)]">View All</span>
      </div>

      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-5 pb-1">
          {items.slice(0, 8).map((item, index) => (
            <div
              key={`${item.type}-${item.id}-${index}`}
              className="w-[215px] shrink-0 sm:w-[225px] lg:w-[255px]"
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
