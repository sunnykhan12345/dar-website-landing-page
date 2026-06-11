"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { t, locale, toggleLocale } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (selectedLocale) => {
    if (selectedLocale !== locale) {
      toggleLocale();
    }

    setLangOpen(false);
  };

  return (
    <footer className="relative overflow-hidden bg-[#1b1b1b] pt-20 pb-8 text-white">
      <div className="container-dar relative z-10">
        <div className="grid gap-10 md:grid-cols-[1fr_.8fr_1.4fr] md:items-start">
          {/* Column 1 */}
          <div>
            <div className="flex h-[52px] items-start">
              <h2 className="text-[40px] font-bold leading-none tracking-[-2px]">
                {t.common.brand}
                <span className="orange">.</span>
              </h2>
            </div>

            <p className="mt-6 max-w-[260px] text-sm leading-6 text-[#D9DBDF]">
              {t.footer.description}
            </p>

            <div className="mt-7 flex gap-4 text-white/70">
              {["Instagram", "Facebook", "Music2", "Linkedin"].map((name) => (
                <button
                  key={name}
                  type="button"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#202022] transition-all duration-300 ease-out hover:scale-110 hover:bg-[#EB6223] hover:text-white hover:shadow-lg hover:shadow-orange-500/30"
                  aria-label={name}
                >
                  <Icon name={name} size={19} />
                </button>
              ))}
            </div>

            {/* Language Selector */}
            <div ref={langRef} className="relative mt-8 inline-block">
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[14px] border border-white/10 bg-[#202022] px-4 py-3",
                  "text-sm font-medium text-white/80 transition-all duration-300 ease-out",
                  "hover:border-[#EB6223]/45 hover:bg-[#252527] hover:text-white",
                  langOpen &&
                    "border-[#EB6223]/50 bg-[#252527] text-white shadow-[0_18px_45px_rgba(235,98,35,0.12)]",
                )}
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <Icon name="Globe2" size={18} />

                <span>{t.footer.changeLanguage}</span>

                <span className="rounded-md bg-[#2B2B2D] px-2 py-1 text-[11px] font-bold uppercase text-white">
                  {locale}
                </span>

                <span
                  className={cn(
                    "transition-transform duration-300 ease-out",
                    langOpen && "rotate-180",
                  )}
                >
                  <Icon name="ChevronDown" size={14} />
                </span>
              </button>

              <div
                className={cn(
                  "absolute left-0 top-full z-20 mt-3 w-[176px] overflow-hidden rounded-[14px] border border-white/10",
                  "bg-[#202022] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl",
                  "transition-all duration-300 ease-out",
                  langOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <button
                  type="button"
                  onClick={() => handleLanguageSelect("en")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-sm transition-all duration-300",
                    locale === "en"
                      ? "bg-[#2A2A2C] text-white"
                      : "text-white/65 hover:bg-[#2A2A2C] hover:text-white",
                  )}
                >
                  <span>English</span>

                  {locale === "en" && (
                    <span className="h-2 w-2 rounded-full bg-[#EB6223]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleLanguageSelect("fr")}
                  className={cn(
                    "mt-1 flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-sm transition-all duration-300",
                    locale === "fr"
                      ? "bg-[#2A2A2C] text-white"
                      : "text-white/65 hover:bg-[#2A2A2C] hover:text-white",
                  )}
                >
                  <span>Français</span>

                  {locale === "fr" && (
                    <span className="h-2 w-2 rounded-full bg-[#EB6223]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="flex h-[52px] items-start pt-[9px]">
              <h3 className="text-lg font-bold leading-none">
                {t.footer.pages}
              </h3>
            </div>

            <div className="mt-6 grid gap-4">
              {t.footer.links.map((p, i) => (
                <Link
                  key={p + i}
                  href="#"
                  className="text-base text-white transition-colors hover:text-[#EB6223]"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <div className="flex h-[52px] items-start pt-[9px]">
              <h3 className="text-lg font-semibold leading-none">
                {t.footer.newsletter}
              </h3>
            </div>

            <form className="mt-6 flex h-15 max-w-[416px] overflow-hidden rounded-[12px] bg-[#272727]">
              <input
                className="min-w-0 flex-1 bg-transparent px-6 text-base text-white outline-none placeholder:text-[#636D78]"
                placeholder={t.footer.email}
              />

              <Button className="rounded-l-none rounded-r-xl px-8" size="sm">
                {t.footer.signup}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-[#252526] pt-6 text-center">
          <p className="text-base font-normal leading-none text-white/80">
            © copyright 2026 dar.com | All Rights Reserved
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-28px] right-8 z-0 text-[150px] font-bold leading-none text-white/[.035] md:text-[230px]">
        {t.common.brand}
        <span className="orange">.</span>
      </div>
    </footer>
  );
}
