"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useI18n } from "@/components/i18n-provider";

export default function Footer() {
  const { t, toggleLocale } = useI18n();

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

            <button
              type="button"
              onClick={toggleLocale}
              className="mt-8 flex cursor-pointer items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Icon name="Globe2" size={18} />
              {t.footer.changeLanguage}
            </button>
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
