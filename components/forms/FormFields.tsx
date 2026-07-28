"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  rows?: number;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  hint?: string;
}

const inputClasses = (error?: string) =>
  cn(
    "w-full rounded-none border bg-brand-cream/40 px-4 py-3.5 text-brand-navy transition-all",
    "placeholder:text-brand-slate/45",
    "focus:border-brand-electric focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-electric/30",
    error ? "border-red-400" : "border-brand-navy/15 hover:border-brand-navy/30"
  );

function emitSelectChange(
  name: string,
  value: string,
  onChange?: FormFieldProps["onChange"]
) {
  if (!onChange) return;
  const event = {
    target: { name, value },
    currentTarget: { name, value },
  } as React.ChangeEvent<HTMLSelectElement>;
  onChange(event);
}

export function PremiumSelect({
  name,
  value = "",
  options = [],
  onChange,
  error,
  placeholder = "Select an option",
}: {
  name: string;
  value?: string;
  options?: { value: string; label: string }[];
  onChange?: FormFieldProps["onChange"];
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectable = options.filter((opt) => opt.value !== "");
  const selected = options.find((opt) => opt.value === value && opt.value !== "");

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const idx = options
      .filter((opt) => opt.value !== "")
      .findIndex((opt) => opt.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  const choose = (next: string) => {
    emitSelectChange(name, next, onChange);
    setOpen(false);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, selectable.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = selectable[activeIndex];
      if (opt) choose(opt.value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} readOnly />
      <button
        type="button"
        id={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          inputClasses(error),
          "flex items-center justify-between gap-3 text-left",
          open && "border-brand-electric bg-white ring-1 ring-brand-electric/30"
        )}
      >
        <span
          className={cn(
            "truncate",
            selected ? "text-brand-navy" : "text-brand-slate/45"
          )}
        >
          {selected?.label ?? placeholder}
        </span>
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center border border-brand-navy/15 text-brand-electric transition-transform duration-300",
            open && "rotate-180 border-brand-electric bg-brand-electric text-brand-navy"
          )}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden border border-brand-navy bg-brand-navy shadow-[0_24px_60px_-20px_rgba(14,14,14,0.65)]">
          <div className="h-px w-full bg-gradient-to-r from-brand-electric via-brand-amber to-transparent" />
          <ul
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={
              selectable[activeIndex]
                ? `${name}-opt-${selectable[activeIndex].value}`
                : undefined
            }
            onKeyDown={onListKeyDown}
            className="max-h-64 overflow-y-auto py-1 focus:outline-none"
          >
            {selectable.map((opt, index) => {
              const isSelected = opt.value === value;
              const isActive = index === activeIndex;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    id={`${name}-opt-${opt.value}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => choose(opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors",
                      isActive || isSelected
                        ? "bg-white/[0.06] text-brand-electric"
                        : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0",
                          isSelected ? "bg-brand-electric" : "bg-white/25"
                        )}
                      />
                      <span className="font-medium tracking-wide">{opt.label}</span>
                    </span>
                    {isSelected && (
                      <svg
                        className="h-4 w-4 shrink-0 text-brand-electric"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  error,
  placeholder,
  rows = 4,
  as = "input",
  options,
  value,
  onChange,
  hint,
}: FormFieldProps) {
  const selectPlaceholder =
    options?.find((opt) => opt.value === "")?.label || placeholder || "Select an option";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-navy/70"
      >
        {label}
        {required && <span className="text-brand-electric"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className={cn(inputClasses(error), "resize-y min-h-[120px]")}
          value={value}
          onChange={onChange}
        />
      ) : as === "select" ? (
        <PremiumSelect
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          error={error}
          required={required}
          placeholder={selectPlaceholder}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClasses(error)}
          value={value}
          onChange={onChange}
        />
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-brand-slate/70">{hint}</p>
      )}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export type AttachedImagePayload = {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
};

type LocalImage = {
  id: string;
  file: File;
  preview: string;
};

const MAX_IMAGES = 5;
const MAX_BYTES = 4 * 1024 * 1024;

export function ImageAttachField({
  images,
  onChange,
  error,
}: {
  images: LocalImage[];
  onChange: (images: LocalImage[]) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>();

  const addFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setLocalError(undefined);

    const incoming = Array.from(fileList);
    const next = [...images];

    for (const file of incoming) {
      if (next.length >= MAX_IMAGES) {
        setLocalError(`You can attach up to ${MAX_IMAGES} images.`);
        break;
      }
      if (!file.type.startsWith("image/")) {
        setLocalError("Only image files are accepted.");
        continue;
      }
      if (file.size > MAX_BYTES) {
        setLocalError("Each image must be under 4MB.");
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }

    onChange(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target) URL.revokeObjectURL(target.preview);
    onChange(images.filter((img) => img.id !== id));
    setLocalError(undefined);
  };

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-navy/70">
          Attach Images
          <span className="ml-2 font-sans text-[0.6rem] tracking-normal text-brand-slate/60">
            Optional
          </span>
        </label>
        <span className="text-[0.65rem] uppercase tracking-[0.16em] text-brand-slate/55">
          {images.length}/{MAX_IMAGES}
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative border border-dashed px-5 py-8 text-center transition-all",
          dragOver
            ? "border-brand-electric bg-brand-electric/10"
            : "border-brand-navy/20 bg-brand-cream/30 hover:border-brand-electric/50 hover:bg-brand-cream/60",
          (error || localError) && "border-red-400"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />

        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-brand-electric/35 bg-brand-electric/10 text-brand-electric">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16l5-5 3 3 6-6 4 4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        </div>
        <p className="font-display text-sm font-bold uppercase tracking-tight text-brand-navy">
          Drop project photos here
        </p>
        <p className="mt-1.5 text-xs text-brand-slate">
          Panels, site conditions, drawings — JPG, PNG, or WEBP up to 4MB each.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 inline-flex items-center gap-2 border border-brand-navy/20 bg-white px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-navy transition-colors hover:border-brand-electric hover:text-brand-electric"
        >
          Browse Files
        </button>
      </div>

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {images.map((img) => (
            <li
              key={img.id}
              className="group relative aspect-square overflow-hidden border border-brand-navy/10 bg-brand-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.preview}
                alt={img.file.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center bg-brand-navy/85 text-white opacity-90 transition hover:bg-brand-electric hover:text-brand-navy"
                aria-label={`Remove ${img.file.name}`}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="absolute inset-x-0 bottom-0 truncate bg-brand-navy/80 px-1.5 py-1 text-[0.55rem] text-white/80">
                {img.file.name}
              </p>
            </li>
          ))}
        </ul>
      )}

      {(error || localError) && (
        <p className="mt-1.5 text-xs text-red-500">{error || localError}</p>
      )}
    </div>
  );
}

export async function filesToPayload(
  images: LocalImage[]
): Promise<AttachedImagePayload[]> {
  const readFile = (file: File) =>
    new Promise<AttachedImagePayload>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: String(reader.result),
        });
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.readAsDataURL(file);
    });

  return Promise.all(images.map((img) => readFile(img.file)));
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const submit = async (data: Record<string, unknown>) => {
    setStatus({ type: "loading" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus({
        type: "success",
        message:
          "Thank you. Your request has been received — we’ll be in touch shortly.",
      });
      return true;
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send. Please try again or call us directly.",
      });
      return false;
    }
  };

  const reset = () => setStatus({ type: "idle" });

  return { status, submit, reset };
}

export function FormMessage({ status }: { status: FormStatus }) {
  if (status.type === "idle" || status.type === "loading") return null;

  return (
    <div
      className={cn(
        "border px-4 py-3 text-sm",
        status.type === "success"
          ? "border-brand-electric/30 bg-brand-electric/10 text-brand-navy"
          : "border-red-300 bg-red-50 text-red-800"
      )}
    >
      {status.message}
    </div>
  );
}

export function FormSuccess({
  message,
  detail,
  onReset,
  resetLabel = "Submit another request",
}: {
  message: string;
  detail?: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="border border-brand-navy/10 bg-brand-cream/50 px-6 py-10 text-center sm:px-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center border border-brand-electric bg-brand-electric text-brand-navy">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-brand-navy">
        {message}
      </p>
      {detail && (
        <p className="mt-2 text-sm text-brand-slate">{detail}</p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-electric hover:text-brand-electric-dark"
      >
        {resetLabel}
      </button>
    </div>
  );
}

export function SubmitButton({
  loading,
  children = "Send Message",
}: {
  loading?: boolean;
  children?: string;
}) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={loading}
      className="w-full sm:w-auto"
    >
      {loading ? "Sending..." : children}
    </Button>
  );
}
