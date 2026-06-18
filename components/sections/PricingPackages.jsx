"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n-provider";

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M4.1665 11.6665L7.08317 14.5832L15.8332 5.4165"
        stroke="#007F5B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-[3px] shrink-0"
    >
      <path
        d="M12.6667 1L1 12.6667M1 1L12.6667 12.6667"
        stroke="#E7000B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPackages() {
  const { t } = useI18n();
  const plans = t.packages.plans;

  return (
    <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
      <div className="container-dar">
        <div className="mx-auto max-w-[760px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="text-[30px] font-semibold leading-[1.2] tracking-[-1.2px] text-black sm:text-[38px] md:text-[48px]"
          >
            {t.packages.title}
            <span className="block text-[#F15A24]">{t.packages.accent}</span>
          </motion.h2>

          <div className="mt-10 lg:mt-16 inline-flex items-center rounded-full bg-[#F6F6F6] p-1 cursor-pointer">
            <button
              type="button"
              className="h-10 rounded-full bg-[#EB6223] px-8 text-base font-medium text-white shadow-sm transition hover:bg-[#df4f1d] cursor-pointer"
            >
              {t.packages.monthly}
            </button>

            <button
              type="button"
              className="h-10 rounded-full px-7 text-sm font-semibold text-black transition hover:bg-white cursor-pointer"
            >
              {t.packages.annual}
              <span className="text-[#F15A24]"> -30%</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 lg:mt-20 grid max-w-[1200px] w-full grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group relative flex min-h-[565px] flex-col overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] ${
                  isPopular
                    ? "bg-[#FFF8F3] md:-mt-6 md:min-h-[610px]"
                    : "bg-[#F6F6F6]"
                }`}
              >
                {isPopular && (
                  <div className="absolute right-[-42px] top-[24px] rotate-45 bg-[#EB6223] px-10 py-2 text-sm font-medium text-white">
                    {t.packages.popular}
                  </div>
                )}

                <h3 className="text-base lg:text-xl font-medium text-black">
                  {plan.name}
                </h3>

                <div className="mt-10 flex items-end gap-1">
                  <span className="text-[36px] font-semibold leading-none tracking-[-1.4px] text-[#F15A24] sm:text-[46px]">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-base lg:text-[22px] font-semibold text-[#EB6223]">
                    /{t.packages.monthShort}
                  </span>
                </div>
                <p className="mt-6 min-h-[48px] text-base font-medium leading-6 text-black">
                  {plan.description}
                </p>
                <div className="mt-8 mb-6 h-px w-full bg-[#D9DBDF]" />
                <ul className="space-y-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-center gap-5 text-sm font-medium leading-5 text-black"
                    >
                      {feature.included ? <CheckIcon /> : <CrossIcon />}
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 h-px w-full bg-[#E5E7EB]" />

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    className={`h-12 rounded-[48px] px-8 text-lg font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-[#EB6223] text-white hover:bg-[#EB6223] hover:shadow-[0_12px_28px_rgba(241,90,36,0.28)]"
                        : "border border-[#EB6223] bg-transparent text-[#EB6223] hover:bg-[#EB6223] hover:text-white hover:shadow-[0_12px_28px_rgba(241,90,36,0.18)]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
