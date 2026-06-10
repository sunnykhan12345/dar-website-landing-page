"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import Image from "next/image";
import Logo from "../../public/images/logo.png";

import {
  HomeIcon,
  MarketPlaceIcon,
  UserIcon,
  CartIcon,
  GlobeIcon,
} from "@/public/icons/icon";

const iconMap = {
  home: HomeIcon,
  marketplace: MarketPlaceIcon,
  features: UserIcon,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t, locale, toggleLocale } = useI18n();

  const links = useMemo(
    () => [
      { id: "home", label: t.nav.home, href: "#home", icon: "home" },
      {
        id: "marketplace",
        label: t.nav.marketplace,
        href: "#marketplace",
        icon: "marketplace",
      },
      {
        id: "features",
        label: t.nav.becomeMember,
        href: "#features",
        icon: "features",
      },
    ],
    [t],
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.22, 0.35, 0.5, 0.65],
        rootMargin: "-90px 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [links]);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();

    const section = document.querySelector(href);

    if (!section) return;

    setActiveSection(id);
    setOpen(false);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={cn(
        "z-50 h-[82px] w-full border-b border-[#E5E7EB] transition-all duration-500",
        scrolled
          ? "fixed left-0 top-0 bg-white/86 shadow-[0_8px_30px_rgba(0,0,0,.08)] backdrop-blur-xl"
          : "relative bg-white",
      )}
    >
      <div className="container-dar flex h-[86px] items-center justify-between transition-all duration-500 md:h-[74px]">
        <Link href="#home" onClick={(e) => handleNavClick(e, "#home", "home")}>
          <Image
            src={Logo}
            width={89}
            height={28}
            alt="Logo"
            className="h-7 w-[89px] object-cover"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((item) => {
            const NavIcon = iconMap[item.icon];
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={cn(
                  "group flex items-center gap-2 text-base font-medium transition-all duration-300 ease-out",
                  isActive
                    ? "text-[#f15a24]"
                    : "text-[#151515] hover:text-[#f15a24]",
                )}
              >
                <NavIcon
                  className={cn(
                    "transition-all duration-300 ease-out group-hover:scale-110",
                    isActive && "scale-110",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:gap-8 lg:flex">
          <Link
            href="#marketplace"
            onClick={(e) => handleNavClick(e, "#marketplace", "marketplace")}
            className={cn(
              "group flex items-center gap-2.5 text-base font-medium transition-all duration-300 ease-out",
              activeSection === "marketplace"
                ? "text-[#f15a24]"
                : "text-[#151515] hover:text-[#f15a24]",
            )}
          >
            <CartIcon className="transition-all duration-300 ease-out group-hover:scale-110" />
            {t.nav.myCart}
          </Link>

          <button
            onClick={toggleLocale}
            className="group relative flex h-[38px] w-[92px] items-center rounded-full border border-[#E5E7EB] bg-[#F8F8F8] p-1 text-[11px] font-bold uppercase text-[#151515] transition-all duration-300 hover:border-[#f15a24]/40 hover:bg-[#fff3ee]"
            aria-label={t.common.language}
          >
            <span
              className={cn(
                "absolute top-1 h-[28px] w-[40px] rounded-full bg-[#f15a24] shadow-[0_6px_18px_rgba(241,90,36,.25)] transition-all duration-300 ease-out",
                locale === "fr" ? "left-[47px]" : "left-1",
              )}
            />

            <span
              className={cn(
                "relative z-10 flex h-[28px] w-[40px] items-center justify-center rounded-full transition-colors duration-300",
                locale === "en" ? "text-white" : "text-[#151515]/60",
              )}
            >
              EN
            </span>

            <span
              className={cn(
                "relative z-10 flex h-[28px] w-[40px] items-center justify-center rounded-full transition-colors duration-300",
                locale === "fr" ? "text-white" : "text-[#151515]/60",
              )}
            >
              FR
            </span>
          </button>

          <Button variant="outline" size="sm">
            {t.nav.signIn}
          </Button>
        </div>

        <button
          className="relative grid h-10 w-10 place-items-center rounded-full border border-black/10 transition-all duration-300 hover:border-[#f15a24]/40 hover:bg-[#fff3ee] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "absolute h-0.5 w-5 rounded-full bg-black transition-all duration-300",
              open
                ? "translate-y-0 rotate-45 bg-[#f15a24]"
                : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 rounded-full bg-black transition-all duration-300",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 rounded-full bg-black transition-all duration-300",
              open
                ? "translate-y-0 -rotate-45 bg-[#f15a24]"
                : "translate-y-1.5",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "container-dar grid overflow-hidden transition-all duration-500 ease-out lg:hidden",
          open
            ? "max-h-[520px] translate-y-0 pb-5 opacity-100"
            : "max-h-0 -translate-y-3 opacity-0",
        )}
      >
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,.12)]">
          {links.map((item) => {
            const NavIcon = iconMap[item.icon];
            const isActive = activeSection === item.id;

            return (
              <Link
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300 ease-out",
                  isActive
                    ? "bg-[#fff3ee] text-[#f15a24]"
                    : "text-[#151515] hover:bg-[#fff3ee] hover:text-[#f15a24]",
                )}
              >
                <span className="flex items-center gap-3">
                  <NavIcon
                    className={cn(
                      "transition-all duration-300 ease-out group-hover:scale-110",
                      isActive && "scale-110",
                    )}
                  />
                  {item.label}
                </span>

                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-[#f15a24]" />
                )}
              </Link>
            );
          })}

          <button
            onClick={toggleLocale}
            className="mt-3 flex h-[44px] w-full items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F8F8] text-xs font-bold uppercase transition-all duration-300 hover:border-[#f15a24]/40 hover:bg-[#fff3ee] hover:text-[#f15a24]"
          >
            <GlobeIcon className="h-[17px] w-[17px]" />
            <span>{locale === "en" ? "English" : "French"}</span>
            <span className="rounded-full bg-white px-2 py-1 text-[10px] shadow-sm">
              {locale === "en" ? "EN" : "FR"}
            </span>
          </button>

          <Button className="mt-3 w-full">{t.nav.signIn}</Button>
        </div>
      </div>
    </header>
  );
}
