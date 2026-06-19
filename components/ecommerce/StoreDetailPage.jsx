import ProductCard from "./ProductCard";

export default function StoreDetailPage({ store, products, services }) {
  return (
    <main className="bg-[#f6f6f6] pb-20">
      <section className="container-dar pt-8">
        <div className="overflow-hidden rounded-t-[16px] bg-white">
          <div className="h-[220px] overflow-hidden rounded-t-[16px]">
            <img
              src={store.cover}
              alt={store.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex flex-col gap-4 border-b bg-white px-6 pb-5 pt-7 md:flex-row md:items-end">
            <img
              src={store.logo}
              alt={store.title}
              className="absolute -top-16 left-6 h-[120px] w-[120px] rounded-[14px] border-4 border-white object-cover shadow"
            />

            <div className="md:ml-[145px]">
              <h1 className="text-2xl font-bold">{store.title}</h1>

              <div className="mt-4 flex gap-8 text-sm">
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

      <section className="container-dar mt-6">
        <h2 className="mb-4 text-lg font-bold">Discounts</h2>

        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["90%", "Off On Shoes"],
            ["90%", "Off On T-Shirts"],
            ["70%", "Off On Shoes"],
            ["Free", "Smart Watch"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`rounded-[10px] p-5 text-white ${
                index === 3 ? "bg-black" : "bg-[#6416d6]"
              }`}
            >
              <p className="text-xs">Discount</p>
              <h3 className="mt-3 text-2xl font-bold text-yellow-300">
                {value}
              </h3>
              <p className="mt-1 font-bold">{label}</p>
              <p className="mt-4 text-[10px] leading-5 text-white/70">
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
    <section className="container-dar mt-9">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-[var(--orange)]">View All</span>
      </div>

      <div className="grid gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
        {items.slice(0, 5).map((item) => (
          <ProductCard key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
