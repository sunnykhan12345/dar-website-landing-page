"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { HeroButton } from "../ui/HeroButton";
export default function SellOnline() {
  const { t } = useI18n();
  return (
    <section id="marketplace" className="bg-[#1b1b1b] py-18 text-white">
      <div className="container-dar grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2 className="max-w-[520px] text-[38px] font-semibold leading-[1.2] tracking-[-1.2px] md:text-[48px]">
            {t.sellOnline.title}
            <br />
            {t.sellOnline.titleSecond}{" "}
            <span className="orange">{t.sellOnline.accent}</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-[15px] md:text-lg leading-8 text-[#CAD5E2]">
            {t.sellOnline.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <HeroButton>{t.sellOnline.start}</HeroButton>
            <HeroButton variant="white">{t.sellOnline.browse}</HeroButton>
          </div>
          <div className="mt-10 grid max-w-[460px] grid-cols-3 gap-6">
            {t.sellOnline.stats.map((s) => (
              <Stat key={s[1]} n={s[0]} t={s[1]} />
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/sell-online-pic.png"
            alt={t.sellOnline.imageAlt}
            width={1854}
            height={1458}
            sizes="(max-width: 1024px) 100vw, 560px"
            className="rounded-[12px]"
          />
        </div>
      </div>
    </section>
  );
}
function Stat({ n, t }) {
  return (
    <div>
      <strong className="block text-[30px] font-bold">{n}</strong>
      <span className="text-sm text-[#90A1B9]">{t}</span>
    </div>
  );
}
