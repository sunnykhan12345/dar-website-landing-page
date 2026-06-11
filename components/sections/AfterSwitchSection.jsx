"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

import {
  ResponseTimeIcon,
  CartRecoveredIcon,
  Support247Icon,
  StopMissingIcon,
} from "@/public/icons/icon";

const icons = [
  ResponseTimeIcon,
  CartRecoveredIcon,
  Support247Icon,
  StopMissingIcon,
];

export default function AfterSwitchSection() {
  const { t } = useI18n();

  return (
    <section className="section-pad bg-white">
      <div className="container-dar">
        <div className="mx-auto max-w-[805px] text-center">
          <h2 className="text-center text-[34px] font-semibold leading-[1.25] tracking-[-1px] text-black md:text-[48px]">
            {t.afterSwitch.titleStart}
            <br />
            <span className="orange">{t.afterSwitch.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[805px] w-full text-[15px] font-medium leading-6 text-black/80 md:text-xl">
            {t.afterSwitch.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.afterSwitch.items.map((item, i) => {
            const CardIcon = icons[i];

            return (
              <article
                key={item.title + i}
                className={cn(
                  "group flex min-h-[330px] flex-col justify-between rounded-[20px] bg-[#F6F6F6] p-5",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-2 hover:bg-[#FFF5F0] hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]",
                )}
              >
                <div>
                  <div
                    className={cn(
                      "mb-8 grid h-16 w-16 place-items-center rounded-[16px]",
                      "bg-[#E5E7EB] text-black transition-all duration-500 ease-out",
                      "group-hover:bg-[#FEE4D8] group-hover:text-[#EB6223]",
                      "group-hover:shadow-[0_12px_28px_rgba(235,98,35,0.18)]",
                    )}
                  >
                    <CardIcon className="h-6 w-6 transition-all duration-500 ease-out group-hover:scale-110" />
                  </div>

                  <h3 className="max-w-[210px] text-[17px] md:text-xl font-normal leading-[1.35] tracking-[-0.02em] text-black transition-colors duration-300 group-hover:text-[#EB6223]">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-8 overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={242}
                    height={140}
                    className="h-[140px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
