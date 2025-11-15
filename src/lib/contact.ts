import fs from "fs";
import path from "path";
import { z } from "zod";

const STORE_DIR =
  process.env.CONTACT_STORAGE_PATH?.trim() ||
  path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "contact-submissions.json");
const MAX_STORED_ENTRIES = 500;

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z
    .string()
    .trim()
    .max(140)
    .transform((value) => (value.length ? value : undefined))
    .optional(),
  message: z.string().trim().min(20).max(2000),
  website: z.string().max(0).optional(),
});

export type ContactSubmission = Omit<z.infer<typeof submissionSchema>, "website">;

export type StoredSubmission = ContactSubmission & {
  submittedAt: string;
  ip: string;
  userAgent?: string;
};

export function validateSubmission(payload: unknown) {
  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const { website: _website, ...data } = parsed.data;
  void _website;
  return {
    success: true as const,
    data,
  };
}

export async function persistSubmission(data: StoredSubmission) {
  await fs.promises.mkdir(STORE_DIR, { recursive: true });
  let existing: StoredSubmission[] = [];
  try {
    const file = await fs.promises.readFile(STORE_FILE, "utf8");
    existing = JSON.parse(file) as StoredSubmission[];
  } catch {
    existing = [];
  }
  existing.unshift(data);
  const trimmed = existing.slice(0, MAX_STORED_ENTRIES);
  await fs.promises.writeFile(STORE_FILE, JSON.stringify(trimmed, null, 2), "utf8");
}

type DeliveryMeta = {
  ip: string;
  userAgent?: string | null;
};

type DeliveryResult = {
  webhook?: boolean;
  email?: boolean;
};

export async function forwardSubmission(submission: StoredSubmission, meta: DeliveryMeta): Promise<DeliveryResult> {
  const result: DeliveryResult = {};
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const webhookSecret = process.env.CONTACT_WEBHOOK_SECRET;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookSecret ? { Authorization: `Bearer ${webhookSecret}` } : {}),
        },
        body: JSON.stringify({ submission, meta }),
      });
      result.webhook = true;
    } catch (error) {
      console.error("Contact webhook delivery failed", error);
    }
  }

  const emailTo = process.env.CONTACT_EMAIL_TO;
  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.CONTACT_EMAIL_FROM ?? "notifications@acdev.local";

  if (emailTo && resendKey) {
    try {
      const message = [
        `New inquiry from ${submission.name}`,
        "",
        `Email: ${submission.email}`,
        `Company: ${submission.company ?? "-"}`,
        `IP: ${meta.ip}`,
        `User Agent: ${meta.userAgent ?? "-"}`,
        "",
        submission.message,
      ].join("\n");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: emailTo,
          subject: `New ACDev contact from ${submission.name}`,
          text: message,
        }),
      });
      result.email = true;
    } catch (error) {
      console.error("Contact email delivery failed", error);
    }
  }

  return result;
}
