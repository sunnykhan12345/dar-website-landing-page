import MarketplaceShell from "@/components/ecommerce/MarketplaceShell";
import { getDictionary } from "@/lib/i18n";
import { getMarketplaceData } from "@/lib/commerce-api";

export const metadata = {
  title: "Marketplace | DAR AI",
  description:
    "Browse products, services and stores on the DAR AI marketplace.",
};

export default async function MarketplacePage() {
  const data = await getMarketplaceData();
  const t = getDictionary("en");

  return (
    <MarketplaceShell
      t={t}
      products={data.products}
      services={data.services}
      stores={data.stores}
    />
  );
}
