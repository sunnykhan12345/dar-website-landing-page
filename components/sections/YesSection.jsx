"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

function FeatureBox({ children, align = "left" }) {
  return (
    <div
      className={cn(
        "flex h-[120px] w-full items-center rounded-[20px] bg-[#FA7335] px-6",
        "text-[15px] md:text-lg font-semibold leading-[1.2] text-white",
        "shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]",
        align === "right"
          ? "justify-start text-left"
          : "justify-start text-left",
      )}
    >
      {children}
    </div>
  );
}

export default function YesSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[#EB6223] py-[72px]">
      {/* thin grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      {/* soft center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
      />

      <div className="container-dar relative z-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[28px] font-semibold leading-[1.3] tracking-[-0.8px] sm:text-[34px] lg:text-[48px]">
            <span className="text-white">{t.yesSection.titleWhite}</span>
            <br />
            <span className="text-black">{t.yesSection.titleBlack}</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-[1040px] items-center gap-10 lg:grid-cols-[240px_1fr_240px] lg:gap-18">
          {/* left cards */}
          <div className="order-2 grid gap-8 lg:gap-14 sm:grid-cols-3 lg:order-1 lg:grid-cols-1">
            {t.yesSection.leftItems.map((item, index) => (
              <FeatureBox key={item + index}>{item}</FeatureBox>
            ))}
          </div>

          {/* center graphic */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[500px] lg:w-[500px]">
              {/* circular icons/ring */}
              <Image
                src="/images/yes-rounded.png"
                alt=""
                width={476}
                height={503}
                priority
                className="yes-round-spin absolute inset-0 h-full w-full object-contain"
              />

              {/* center man */}
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:h-[220px] sm:w-[220px] lg:h-[235px] lg:w-[235px]">
                <Image
                  src="/images/yes-man.png"
                  alt={t.yesSection.imageAlt}
                  width={300}
                  height={300}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* right cards */}
          <div className="order-3 grid gap-8 lg:gap-14 sm:grid-cols-3 lg:grid-cols-1">
            {t.yesSection.rightItems.map((item, index) => (
              <FeatureBox key={item + index} align="right">
                {item}
              </FeatureBox>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
