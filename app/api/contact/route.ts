import { NextRequest, NextResponse } from "next/server";

interface ImageAttachment {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

interface FormPayload {
  formType: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  address?: string;
  projectType?: string;
  timeline?: string;
  description?: string;
  images?: ImageAttachment[];
}

const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function validatePayload(data: FormPayload): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Invalid email address";

  if (data.formType === "contact" && !data.message?.trim()) {
    return "Message is required";
  }

  if (data.formType === "quote") {
    if (!data.phone?.trim()) return "Phone is required";
    if (!data.projectType) return "Project type is required";
    if (!data.description?.trim()) return "Project description is required";
  }

  if (data.images) {
    if (data.images.length > MAX_IMAGES) {
      return `You can attach up to ${MAX_IMAGES} images`;
    }
    for (const image of data.images) {
      if (!image?.name || !image?.dataUrl) return "Invalid image attachment";
      if (!image.type?.startsWith("image/")) return "Only image files are allowed";
      if (typeof image.size === "number" && image.size > MAX_IMAGE_BYTES) {
        return "Each image must be under 4MB";
      }
      // Rough base64 payload guard (~5.5MB encoded)
      if (image.dataUrl.length > 7_500_000) {
        return "An attached image is too large";
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const data: FormPayload = await request.json();
    const error = validatePayload(data);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

    const payload = {
      ...data,
      imageCount: data.images?.length ?? 0,
      submittedAt: new Date().toISOString(),
      source: "raichev-electric-website",
    };

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      console.log("[Form Submission]", {
        ...payload,
        images: data.images?.map(({ name, type, size }) => ({
          name,
          type,
          size,
        })),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
