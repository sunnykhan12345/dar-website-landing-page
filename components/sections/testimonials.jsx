"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { LeftArrowIcon, RightArrowIcon } from "@/public/icons/icon";

const images = ["/images/customer-revew.png", "/images/customer-review-2.png"];

export default function Testimonials() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);

  const items = useMemo(
    () => t.testimonials.items || [],
    [t.testimonials.items],
  );

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const slides = useMemo(() => {
    const result = [];

    for (let i = 0; i < items.length; i += cardsPerSlide) {
      result.push(items.slice(i, i + cardsPerSlide));
    }

    return result;
  }, [items, cardsPerSlide]);

  const maxIndex = Math.max(slides.length - 1, 0);

  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [activeIndex, maxIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (!items.length) return null;

  return (
    <section className="bg-white pb-16 pt-8 md:pb-20 md:pt-12">
      <div className="container-dar">
        <div className="mb-7 flex items-center justify-between md:mb-12">
          <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.6px] text-black md:text-[32px] lg:text-[48px]">
            {t.testimonials.titleStart}{" "}
            <span className="text-[#f15a24]">{t.testimonials.accent}</span>{" "}
            {t.testimonials.titleEnd}
          </h2>

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#FDE7DB]  leading-none text-black transition hover:bg-[#ffe3d5] cursor-pointer"
            >
              <LeftArrowIcon />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#FDE7DB] text-[20px] font-bold leading-none text-black transition hover:bg-[#ffe3d5] cursor-pointer"
            >
              <RightArrowIcon />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="min-w-full shrink-0">
                <div className="grid gap-5 md:grid-cols-2 md:gap-8">
                  {slide.map((text, i) => {
                    const realIndex = slideIndex * cardsPerSlide + i;

                    return (
                      <article
                        key={`${slideIndex}-${i}`}
                        className="min-h-[170px] rounded-[20px] bg-[#F6F6F6]  md:min-h-[178px] p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 lg:gap-6">
                            <Image
                              src={images[realIndex % images.length]}
                              alt="Customer testimonial portrait"
                              width={120}
                              height={116}
                              className="h-[116px] w-[120px] rounded-[12px] object-cover"
                            />

                            <div>
                              <h3 className="text-[13px] font-semibold leading-none text-black md:text-[22px]">
                                {t.testimonials.name}
                              </h3>

                              <p className="mt-2.5 text-base leading-none text-[#6A6A6A]">
                                {t.testimonials.role}
                              </p>

                              <div className="mt-5 flex gap-[3px] text-[20px] leading-none text-yellow-400">
                                ★★★★★
                              </div>
                            </div>
                          </div>

                          <span className="text-[44px] font-bold leading-none text-[#f15a24]">
                            ”
                          </span>
                        </div>

                        <p className="mt-5 md:mt-8 max-w-[430px] text-[11px] font-medium leading-[1.65] text-black md:text-base">
                          {text}
                        </p>

                        <p className="mt-5 md:mt-8 text-sm font-medium text-black/55">
                          {t.testimonials.date}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-[6px]">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial slide ${i + 1}`}
              className={`h-[6px] rounded-full transition-all ${
                activeIndex === i
                  ? "w-[15px] bg-[#f15a24]"
                  : "w-[6px] bg-[#d9dde1]"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#FDE7DB]  leading-none text-black transition hover:bg-[#ffe3d5] cursor-pointer"
          >
            <LeftArrowIcon />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#FDE7DB] text-[20px] font-bold leading-none text-black transition hover:bg-[#ffe3d5] cursor-pointer"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
