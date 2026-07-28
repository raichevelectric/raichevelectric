"use client";

import { useState } from "react";
import {
  FormField,
  FormMessage,
  FormSuccess,
  ImageAttachField,
  SubmitButton,
  filesToPayload,
  useFormSubmit,
} from "@/components/forms/FormFields";
import { projectTypes, siteConfig } from "@/lib/site-data";

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  timeline: string;
  description: string;
}

type LocalImage = {
  id: string;
  file: File;
  preview: string;
};

function validateQuote(data: QuoteFormData): Partial<QuoteFormData> {
  const errors: Partial<QuoteFormData> = {};

  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.phone.trim()) errors.phone = "Phone is required";
  if (!data.projectType) errors.projectType = "Please select a project type";
  if (!data.description.trim())
    errors.description = "Please describe your project";

  return errors;
}

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectType: "",
    timeline: "",
    description: "",
  });
  const [images, setImages] = useState<LocalImage[]>([]);
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});
  const { status, submit, reset } = useFormSubmit("/api/contact");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const clearImages = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuote(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const imagePayload = await filesToPayload(images);

    const success = await submit({
      ...formData,
      formType: "quote",
      images: imagePayload.map(({ name, type, size, dataUrl }) => ({
        name,
        type,
        size,
        dataUrl,
      })),
    });

    if (success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        projectType: "",
        timeline: "",
        description: "",
      });
      clearImages();
      setErrors({});
    }
  };

  if (status.type === "success") {
    return (
      <FormSuccess
        message="Quote request received"
        detail="We typically respond within one business day."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric">
          Project Details
        </p>
        <div className="mt-1 h-px w-12 bg-brand-electric" />
      </div>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          required
          placeholder={siteConfig.phone}
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormField
          label="Project Address"
          name="address"
          placeholder="City or full address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Project Type"
          name="projectType"
          as="select"
          required
          value={formData.projectType}
          onChange={handleChange}
          error={errors.projectType}
          options={[
            { value: "", label: "Select a type..." },
            ...projectTypes.map((type) => ({ value: type, label: type })),
          ]}
        />
        <FormField
          label="Timeline"
          name="timeline"
          as="select"
          value={formData.timeline}
          onChange={handleChange}
          options={[
            { value: "", label: "Select timeline..." },
            { value: "asap", label: "Immediate / ASAP" },
            { value: "1-2-weeks", label: "Within 1–2 Weeks" },
            { value: "1-month", label: "Within One Month" },
            { value: "flexible", label: "Flexible Scheduling" },
          ]}
        />
      </div>

      <FormField
        label="Project Description"
        name="description"
        as="textarea"
        required
        rows={5}
        placeholder="Scope, goals, site conditions, and anything else we should know..."
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <ImageAttachField images={images} onChange={setImages} />

      <FormMessage status={status} />

      <div className="flex flex-col gap-4 border-t border-brand-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-brand-slate">
          Fields marked <span className="text-brand-electric">*</span> are
          required.
        </p>
        <SubmitButton loading={status.type === "loading"}>
          Submit Quote Request
        </SubmitButton>
      </div>
    </form>
  );
}
