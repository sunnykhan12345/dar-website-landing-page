"use client";

import { useI18n } from "@/components/i18n-provider";

export default function Steps() {
  const { t } = useI18n();

  return (
    <section className="bg-white pb-20 pt-12 md:pt-16">
      <div className="container-dar">
        <h2 className="text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.8px] text-black md:text-[36px] lg:text-[42px]">
          {t.steps.titleTop}
          <br />
          <span className="text-[#f15a24]">{t.steps.developer}</span>. Or{" "}
          <span className="text-[#f15a24]">{t.steps.patience}</span>.
        </h2>

        <div className="relative mt-8 md:mt-9">
          {/* Top line */}
          <div className="absolute left-2 right-0 -top-1.5 h-px bg-[#d8d8d8]" />

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-9 md:grid-cols-4 md:gap-x-10 md:pt-8">
            {t.steps.items.map((s, i) => (
              <div key={s} className="relative">
                {/* Figma-style dot on line */}
                <span className="absolute left-0 top-[-44px] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#f15a24] bg-white md:left-[6px]">
                  <span className="h-[3px] w-[3px] rounded-full bg-[#f15a24]" />
                </span>

                <div className="text-[54px] font-semibold leading-none tracking-[-2px] text-transparent [-webkit-text-stroke:1px_#f15a24] md:text-[76px] lg:text-[86px]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <p className="mt-5 max-w-[170px] text-[13px] font-semibold leading-[1.25] tracking-[-0.2px] text-black md:mt-6 md:text-[14px]">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
