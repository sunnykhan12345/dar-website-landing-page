import StoreDetailPage from "@/components/ecommerce/StoreDetailPage";
import { getMarketplaceData } from "@/lib/commerce-api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const data = await getMarketplaceData();
  const store = data.stores.find((item) => item.slug === params.slug);

  if (!store) return { title: "Store Not Found | DAR AI" };

  return {
    title: `${store.title} | DAR AI Marketplace`,
    description: store.description,
  };
}

export default async function Page({ params }) {
  const data = await getMarketplaceData();
  const store = data.stores.find((item) => item.slug === params.slug);

  if (!store) notFound();

  return (
    <StoreDetailPage
      store={store}
      products={data.products}
      services={data.services}
    />
  );
}
