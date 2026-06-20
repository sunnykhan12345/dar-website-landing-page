"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import StoreCard from "./StoreCard";
import FiltersSidebar from "./FiltersSidebar";
import {
  SearchIcon,
  GridIcon,
  ProductIcon,
  ServiceIcon,
} from "@/public/icons/icon";

export default function MarketplaceShell({ t, products, services, stores }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const setTab = (nextTab) => {
    if (nextTab === "all") router.push("/marketplace");
    else router.push(`/marketplace?tab=${nextTab}`);
  };
  const productRows = useMemo(
    () => Array.from({ length: 6 }).flatMap(() => products),
    [products],
  );

  const serviceRows = useMemo(
    () => Array.from({ length: 6 }).flatMap(() => services),
    [services],
  );

  const categories =
    tab === "stores" ? t.marketplace.storeCategories : t.marketplace.categories;

  return (
    <main className="bg-[#f6f6f6] pb-20">
      <section className="pt-6 pb-8">
        <div className="container-dar">
          <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
            <div className="relative flex-1">
              <input
                placeholder={t.marketplace.searchPlaceholder}
                className="h-14 w-full rounded-[12px] bg-white px-12 text-sm outline-none text-[#50565D]"
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              <div className="flex h-14 shrink-0 items-center gap-3 rounded-[12px] bg-white p-1 cursor-pointer">
                {[
                  ["all", t.marketplace.tabs.all, GridIcon],
                  ["products", t.marketplace.tabs.products, ProductIcon],
                  ["services", t.marketplace.tabs.services, ServiceIcon],
                ].map(([key, label, Icon]) => {
                  const active = tab === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`flex h-12 shrink-0 items-center gap-2 rounded-[8px] px-5 text-base font-normal transition-all ${
                        active
                          ? "bg-[#171717] text-white font-semibold"
                          : "bg-white text-[#19191A]"
                      }`}
                    >
                      <Icon active={active} />
                      {label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setTab("stores")}
                className={`flex h-14 shrink-0 items-center gap-2 rounded-[10px] px-5 text-base font-normal transition-all ${
                  tab === "stores"
                    ? "bg-[#171717] text-white font-semibold"
                    : "bg-[linear-gradient(90deg,#E4E4E4_0%,#FADBCD_100%)] text-black"
                }`}
              >
                <ProductIcon active={tab === "stores"} />
                {t.marketplace.tabs.storesNearYou}
              </button>
            </div>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto hide-scrollbar">
            <span className="shrink-0 py-2.5 text-base font-medium text-[var(--orange)]">
              {t.marketplace.browseCategories}
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                className="shrink-0 rounded-[10px] bg-white px-4 py-2.5 text-base text-[#50565D]"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      {tab === "all" && (
        <section className="container-dar space-y-9">
          <HomeRow
            title={t.marketplace.bestSellingProducts}
            items={products}
            href="/marketplace?tab=products"
          />
          <HomeRow
            title={t.marketplace.topBookingServices}
            items={services}
            href="/marketplace?tab=services"
          />
          <div>
            <SectionTitle
              title={t.marketplace.topStores}
              href="/marketplace?tab=stores"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "products" && (
        <ListingLayout
          title={t.marketplace.bestSellingProducts}
          countText={t.marketplace.results.replace("{{count}}", "345")}
          mode="products"
          items={productRows}
        />
      )}

      {tab === "services" && (
        <ListingLayout
          title={t.marketplace.topBookingServices}
          countText={t.marketplace.results.replace("{{count}}", "345")}
          mode="services"
          items={serviceRows}
        />
      )}

      {tab === "stores" && (
        <section className="container-dar">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">{t.marketplace.topStores}</h2>
            <p className="text-sm">
              {t.marketplace.itemsFound.replace("{{count}}", "493")}
            </p>
          </div>

          <div className="flex gap-[44px] overflow-x-auto px-12 py-10">
            {Array.from({ length: 4 })
              .flatMap(() => stores)
              .map((store, index) => (
                <StoreCard key={`${store.id}-${index}`} store={store} />
              ))}
          </div>
        </section>
      )}
    </main>
  );
}

function SectionTitle({ title, href }) {
  return (
    <div className="mb-5 lg:mb-6 flex items-center justify-between">
      <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
      <a
        href={href}
        className="text-sm lg:text-base font-semibold text-[var(--orange)]"
      >
        View All
      </a>
    </div>
  );
}

function HomeRow({ title, items, href}) {
  return (
    <div>
      <SectionTitle title={title} href={href} />
      <div className="grid gap-5 overflow-hidden grid-cols-2 lg:grid-cols-5">
        {items.slice(0, 5).map((item) => (
          <ProductCard key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function ListingLayout({ title, countText, mode, items }) {
  return (
    <section className="container-dar">
      <div className="flex gap-8">
        <FiltersSidebar mode={mode} />
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm">{countText}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => (
              <ProductCard
                key={`${item.type}-${item.id}-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
