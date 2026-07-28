"use client";

import { useState } from "react";
import {
  FormField,
  FormMessage,
  FormSuccess,
  SubmitButton,
  useFormSubmit,
} from "@/components/forms/FormFields";
import { siteConfig } from "@/lib/site-data";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function validateContact(data: ContactFormData): Partial<ContactFormData> {
  const errors: Partial<ContactFormData> = {};

  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.message.trim()) errors.message = "Message is required";

  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { status, submit, reset } = useFormSubmit("/api/contact");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContact(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const success = await submit({
      ...formData,
      formType: "contact",
    });

    if (success) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  };

  if (status.type === "success") {
    return (
      <FormSuccess
        message="Message sent"
        detail="We’ll get back to you within one business day."
        onReset={reset}
        resetLabel="Send another message"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        placeholder={siteConfig.phone}
        value={formData.phone}
        onChange={handleChange}
      />
      <FormField
        label="Message"
        name="message"
        as="textarea"
        required
        placeholder="How can we help you?"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />
      <FormMessage status={status} />
      <div className="flex flex-col gap-4 border-t border-brand-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-brand-slate">
          Prefer a call?{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-brand-electric hover:text-brand-electric-dark"
          >
            {siteConfig.phone}
          </a>
        </p>
        <SubmitButton loading={status.type === "loading"} />
      </div>
    </form>
  );
}
