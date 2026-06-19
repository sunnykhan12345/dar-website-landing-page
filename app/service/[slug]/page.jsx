import DetailPage from "@/components/ecommerce/DetailPage";
import { getServiceBySlug, getServices } from "@/lib/commerce-api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | DAR AI",
    };
  }

  return {
    title: `${service.title} | DAR AI Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailsPage({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = await getServices();

  return <DetailPage item={service} related={related} type="service" />;
}
