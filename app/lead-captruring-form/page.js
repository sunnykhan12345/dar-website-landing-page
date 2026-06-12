"use client";

import React, { useMemo, useRef, useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

const initialForm = {
  firstName: "",
  lastName: "",
  businessName: "",
  contact: "",
  email: "",
  address: "",
  city: "",
  country: "",
};

export default function LeadcapturingPage() {
  const { t } = useI18n();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const fieldRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    businessName: useRef(null),
    contact: useRef(null),
    email: useRef(null),
    address: useRef(null),
    city: useRef(null),
    country: useRef(null),
  };

  const requiredFields = useMemo(
    () => ["firstName", "lastName", "businessName", "contact", "email"],
    [],
  );

  const showToast = (type, title, message) => {
    setToast({ type, title, message });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const validateForm = () => {
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = t.leadCapture.validation.required;
      }
    });

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t.leadCapture.validation.email;
    }

    if (form.contact.trim() && !/^[0-9+\-\s()]{7,20}$/.test(form.contact)) {
      nextErrors.contact = t.leadCapture.validation.contact;
    }

    return nextErrors;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];

      fieldRefs[firstErrorField]?.current?.focus();

      showToast(
        "error",
        t.leadCapture.toast.errorTitle,
        t.leadCapture.toast.errorMessage,
      );

      return;
    }

    console.log("Lead form submitted:", form);

    showToast(
      "success",
      t.leadCapture.toast.successTitle,
      t.leadCapture.toast.successMessage,
    );

    setForm(initialForm);
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] ">
      {toast && (
        <div className="fixed right-5 top-5 z-[100] w-[340px] max-w-[calc(100vw-40px)]">
          <div
            className={`flex gap-3 rounded-2xl border bg-white px-4 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.14)] ${
              toast.type === "success" ? "border-emerald-200" : "border-red-200"
            }`}
          >
            <div
              className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-[#151515]">
                {toast.title}
              </h4>
              <p className="mt-1 text-xs leading-5 text-[#6b6b6b]">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#777] transition hover:bg-black/5 hover:text-black"
              aria-label={t.leadCapture.toast.close}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <section
        id="home"
        className="relative mx-auto min-h-[835px] overflow-hidden px-6 "
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage:
              "url('/images/leads-capturing-form-bg-pattern.png')",
          }}
        />

        <div className="absolute right-[70px] top-[95px] z-[1] h-[570px] w-[570px] rounded-full bg-[#F15A24]/20 blur-[115px]" />
        <div className="absolute bottom-[110px] right-[210px] z-[1] h-[330px] w-[330px] rounded-full bg-[#9747FF]/20 blur-[100px]" />

        <div className="container-dar relative z-10 grid min-h-[835px]  grid-cols-1 items-center gap-12 px-0 py-16 lg:grid-cols-[1fr_540px]">
          <div className="max-w-[612px]">
            <h1 className="text-[42px]  font-normal leading-[1.5] tracking-[-1.8px] text-black md:text-[54px] md:tracking-[-2.5px]">
              {t.leadCapture.hero.titleStart}
              <br />
              {t.leadCapture.hero.titleMiddle}{" "}
              <span className="font-bold text-[#EB6223]">
                {t.leadCapture.hero.titleAccent}
              </span>
              <br />
              <span className="font-bold text-[#EB6223]">
                {t.leadCapture.hero.titleEnd}
              </span>
            </h1>

            <p className="mt-8 max-w-[612px] w-full text-base font-medium leading-6 text-black md:mt-12">
              {t.leadCapture.hero.subtitle}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full rounded-[24px] bg-white p-5 shadow-[0_28px_80px_rgba(171,89,58,0.16)] md:p-6"
          >
            <h2 className="mb-7 md:mb-8 text-[22px] font-semibold text-black">
              {t.leadCapture.form.title}
            </h2>

            <div className="grid grid-cols-1 gap-x-2.5 gap-y-4 sm:grid-cols-2">
              <InputField
                refProp={fieldRefs.firstName}
                label={t.leadCapture.form.firstName}
                required
                placeholder={t.leadCapture.form.placeholder}
                value={form.firstName}
                error={errors.firstName}
                onChange={(value) => handleChange("firstName", value)}
              />

              <InputField
                refProp={fieldRefs.lastName}
                label={t.leadCapture.form.lastName}
                required
                placeholder={t.leadCapture.form.placeholder}
                value={form.lastName}
                error={errors.lastName}
                onChange={(value) => handleChange("lastName", value)}
              />

              <InputField
                refProp={fieldRefs.businessName}
                wrapperClassName="sm:col-span-2"
                label={t.leadCapture.form.businessName}
                required
                placeholder={t.leadCapture.form.placeholder}
                value={form.businessName}
                error={errors.businessName}
                onChange={(value) => handleChange("businessName", value)}
              />

              <InputField
                refProp={fieldRefs.contact}
                label={t.leadCapture.form.contact}
                required
                placeholder={t.leadCapture.form.contactPlaceholder}
                value={form.contact}
                error={errors.contact}
                onChange={(value) => handleChange("contact", value)}
              />

              <InputField
                refProp={fieldRefs.email}
                label={t.leadCapture.form.email}
                required
                type="email"
                placeholder={t.leadCapture.form.placeholder}
                value={form.email}
                error={errors.email}
                onChange={(value) => handleChange("email", value)}
              />

              <InputField
                refProp={fieldRefs.address}
                wrapperClassName="sm:col-span-2"
                label={t.leadCapture.form.address}
                placeholder={t.leadCapture.form.placeholder}
                value={form.address}
                error={errors.address}
                onChange={(value) => handleChange("address", value)}
              />

              <InputField
                refProp={fieldRefs.city}
                label={t.leadCapture.form.city}
                placeholder={t.leadCapture.form.placeholder}
                value={form.city}
                error={errors.city}
                onChange={(value) => handleChange("city", value)}
              />

              <InputField
                refProp={fieldRefs.country}
                label={t.leadCapture.form.country}
                placeholder={t.leadCapture.form.placeholder}
                value={form.country}
                error={errors.country}
                onChange={(value) => handleChange("country", value)}
              />
            </div>

            <button
              type="submit"
              className="mt-8 h-[48px] w-full rounded-[12px] bg-[#EB6223] text-base font-medium text-white transition hover:bg-[#de4f1d] active:scale-[0.99] cursor-pointer"
            >
              {t.leadCapture.form.cta}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function InputField({
  refProp,
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  wrapperClassName = "",
}) {
  return (
    <div className={wrapperClassName}>
      <label className="mb-2.5 block text-sm font-normal text-black">
        {label} {required && <span className="text-[#E7000B]">*</span>}
      </label>

      <input
        ref={refProp}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[56px] w-full rounded-[12px] bg-[#F9F9F9] px-4 text-base text-black outline-none transition placeholder:text-[#7A7C81] focus:bg-white focus:ring-2 ${
          error ? "ring-2 ring-red-400" : "focus:ring-[#F15A24]/40"
        }`}
      />

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
