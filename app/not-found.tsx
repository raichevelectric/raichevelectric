import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Raichev Electric",
  description: "Licensed electrical contractors serving Orange County and San Diego.",
};

export default function RootNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-electric">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-brand-navy">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-brand-slate">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center font-semibold text-brand-electric hover:text-brand-electric-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
