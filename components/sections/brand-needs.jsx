"use client";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import {
  CommercialOffersIcon,
  LandingPageIcon,
  SocialMediaIcon,
  MadCouponIcon,
  MarketPlaceAccessIcon,
  FullPresentationIcon,
  ProductVisualsIcon,
  LandingWebsiteIcon,
  AiLogoGenerationIcon,
} from "@/public/icons/icon";
const icons = [
  CommercialOffersIcon,
  LandingPageIcon,
  SocialMediaIcon,
  MadCouponIcon,
  MarketPlaceAccessIcon,
  FullPresentationIcon,
  ProductVisualsIcon,
  LandingWebsiteIcon,
  AiLogoGenerationIcon,
];
export default function BrandNeeds() {
  const { t } = useI18n();
  return (
    <section id="features" className="section-pad bg-white">
      <div className="container-dar">
        <h2 className="text-center text-[34px] font-semibold leading-[1.25] tracking-[-1px] md:text-[48px]">
          {t.brandNeeds.title}
          <br />
          <span className="orange">{t.brandNeeds.accent}</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          {t.brandNeeds.items.map((it, i) => {
            const CardIcon = icons[i];
            const isActiveCard = i === 1;
            return (
              <div
                key={it[0] + i}
                className={cn(
                  "group rounded-[20px] bg-[#F6F6F6] p-5 transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:bg-[#FFF5F0] hover:shadow-xl",
                )}
              >
                <div
                  className={cn(
                    "mb-6 grid h-16 w-16 place-items-center rounded-[16px] transition-all duration-300 ease-out",
                    "bg-[#E5E7EB] text-black group-hover:bg-[#FEE4D8] group-hover:text-[#EB6223]",
                  )}
                >
                  <CardIcon className="h-8 w-8 transition-all duration-300 ease-out group-hover:scale-110" />
                </div>
                <h3
                  className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    "text-black group-hover:text-[#EB6223]",
               
                  )}
                >
                  {it[0]}
                </h3>
                <p className="mt-6 text-lg font-normal leading-5 text-black/80">
                  {it[1]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
