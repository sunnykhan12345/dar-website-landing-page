"use client";

import Image from "next/image";
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
                <div key={text} className="rounded-[20px] bg-[#F6F6F6] p-5">
                  <div className="w-16 h-16 rounded-[16px] bg-[#F2F2F2] flex items-center justify-center">
                    <IconComponent />
                  </div>

                  <p className="mt-8 text-[15px] lg:text-lg leading-6">
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
          className="rounded-[18px] object-cover"
        />
      </div>
    </section>
  );
}
