import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-data";

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

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
      if (image.dataUrl.length > 7_500_000) {
        return "An attached image is too large";
      }
    }
  }

  return null;
}

function buildEmailHtml(data: FormPayload) {
  const isQuote = data.formType === "quote";
  const rows: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Address", data.address],
    ["Project Type", data.projectType],
    ["Timeline", data.timeline],
    ["Message", data.message],
    ["Description", data.description],
    ["Images", data.images?.length ? `${data.images.length} attached` : "None"],
  ];

  const body = rows
    .filter(([, value]) => Boolean(value?.trim()))
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #ece7dc;color:#8a8478;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #ece7dc;color:#0e0e0e;font-size:15px;white-space:pre-wrap;">${escapeHtml(value || "")}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="background:#faf7f0;padding:32px 16px;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e1d4;">
        <div style="background:#0e0e0e;padding:20px 24px;">
          <p style="margin:0;color:#d4af37;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;font-weight:700;">Raichev Electric</p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;letter-spacing:-0.02em;">
            ${isQuote ? "New Quote Request" : "New Contact Message"}
          </h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">${body}</table>
        <div style="padding:16px 24px;background:#faf7f0;color:#8a8478;font-size:12px;">
          Submitted ${escapeHtml(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))} PT
        </div>
      </div>
    </div>
  `;
}

function toResendAttachments(images: ImageAttachment[] = []) {
  return images.map((image) => {
    const base64 = image.dataUrl.includes(",")
      ? image.dataUrl.split(",")[1]
      : image.dataUrl;

    return {
      filename: image.name,
      content: base64,
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: FormPayload = await request.json();
    const error = validatePayload(data);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "Raichev Electric <onboarding@resend.dev>";
    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const isQuote = data.formType === "quote";

      const { error: sendError } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: data.email,
        subject: isQuote
          ? `Quote request from ${data.name}`
          : `Contact message from ${data.name}`,
        html: buildEmailHtml(data),
        attachments: toResendAttachments(data.images),
      });

      if (sendError) {
        console.error("[Resend]", sendError);
        return NextResponse.json(
          { error: "Failed to send email. Please try again or call us." },
          { status: 502 }
        );
      }
    } else if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imageCount: data.images?.length ?? 0,
          submittedAt: new Date().toISOString(),
          source: "raichev-electric-website",
        }),
      });
    } else {
      console.log("[Form Submission]", {
        formType: data.formType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageCount: data.images?.length ?? 0,
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("[Contact API]", error);
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
