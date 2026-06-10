"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n-provider";
import { HeroButton } from "../ui/HeroButton";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pb-12 pt-12 md:pb-20 md:pt-20"
    >
      <Image
        src="/images/hero-patterns.png"
        alt="Soft geometric orange pattern"
        fill
        priority
        className="pointer-events-none object-cover"
      />

      <div className="container-dar relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-[900px] text-balance text-[40px] font-semibold leading-[1.22] tracking-[-1.6px] md:text-[60px] md:tracking-[-3px]"
        >
          {t.hero.titleStart}{" "}
          <span className="orange">{t.hero.titleAccent}</span>
        </motion.h1>

        <p className="mx-auto mt-8 max-w-[720px] text-[14px] font-medium leading-7 text-black/80 md:text-[18px]">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <HeroButton variant="outline">{t.hero.start}</HeroButton>
          <HeroButton>{t.hero.watch}</HeroButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative mt-16 container-dar"
        >
          {/* Figma shadow image - behind dashboard */}
          <div className="pointer-events-none absolute -inset-x-16 -bottom-20 -top-10 z-0 md:-inset-x-24 md:-bottom-28 md:-top-14">
            <Image
              src="/images/hero-dashbaord-shadow.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 120vw, 1220px"
              className="object-fill"
            />
          </div>

          {/* Dashboard image */}
          <div className="relative z-10 rounded-[36px] border-2 border-white/35 bg-white/60 p-3 shadow-[0_24px_70px_rgba(241,90,36,.15)] backdrop-blur-xl">
            <Image
              src="/images/hero-dashbaord.png"
              alt={t.hero.imageAlt}
              width={2048}
              height={1324}
              priority
              sizes="(max-width: 768px) 95vw, 1030px"
              className="rounded-[20px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
