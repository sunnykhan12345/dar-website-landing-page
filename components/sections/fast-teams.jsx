"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

import {
  StoreIcon,
  MessageIcon,
  AgencyIcon,
  BusinessIcon,
} from "@/public/icons/icon";

const icons = [StoreIcon, MessageIcon, AgencyIcon, BusinessIcon];

export default function FastTeams() {
  const { t } = useI18n();

  return (
    <section className="section-pad bg-white">
      <div className="container-dar grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="max-w-[560px] text-[36px] font-semibold leading-[1.25] tracking-[-1.3px] md:text-[48px]">
            {t.fastTeams.titleStart}{" "}
            <span className="orange">{t.fastTeams.accent}</span>{" "}
            {t.fastTeams.titleEnd}
          </h2>

          <div className="mt-12 grid max-w-[520px] grid-cols-2 gap-5">
            {t.fastTeams.cards.map((text, i) => {
              const IconComponent = icons[i];

              return (
                <div
                  key={text}
                  className={cn(
                    "group rounded-[20px] bg-[#F6F6F6] p-5",
                    "transition-all duration-500 ease-out",
                    "hover:-translate-y-2 hover:bg-[#FFF5F0] hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-[16px]",
                      "bg-[#E5E7EB] text-black transition-all duration-500 ease-out",
                      "group-hover:bg-[#FEE4D8] group-hover:text-[#EB6223]",
                      "group-hover:shadow-[0_12px_28px_rgba(235,98,35,0.18)]",
                    )}
                  >
                    <IconComponent className="transition-all duration-500 ease-out group-hover:scale-110" />
                  </div>

                  <p className="mt-8 text-[15px] leading-6 text-black transition-colors duration-300 group-hover:text-[#EB6223] lg:text-lg">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <Image
          src="/images/for-past-team-pic.png"
          alt={t.fastTeams.imageAlt}
          width={1728}
          height={2034}
          sizes="(max-width: 1024px) 100vw, 687px"
          className="rounded-[18px] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>
    </section>
  );
}
