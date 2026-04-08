import { Resend } from "resend";
import { adminDb } from "@/lib/adminDb";

type AdminRecipientRecord = {
  email?: string | null;
};

type UploadNotificationRecord = {
  id: string;
  filename: string;
  mimeType?: string | null;
  rewardValue: number;
  uploadedAt?: number | Date | null;
  employerName?: string | null;
  positionTitle?: string | null;
  jobReference?: string | null;
  profile?: {
    displayName?: string | null;
    owner?: {
      email?: string | null;
    };
  } | null;
};

export type AdminUploadNotificationResult = {
  notified: boolean;
  recipients: string[];
  skippedReason?: string;
};

const parseEmailList = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const getMailConfig = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFICATION_FROM_EMAIL;

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, from };
};

const getAdminRecipients = async () => {
  const { $users } = await adminDb.query({
    $users: {
      $: {
        where: { type: "admin" },
      },
    },
  });

  const queriedEmails = ($users ?? [])
    .map((user) => (user as AdminRecipientRecord).email)
    .filter((email): email is string => typeof email === "string" && email.length > 0);
  const fallbackEmails = parseEmailList(process.env.ADMIN_NOTIFICATION_EMAILS);

  return Array.from(new Set([...queriedEmails, ...fallbackEmails]));
};

const getUploadRecord = async (uploadId: string) => {
  const { uploads } = await adminDb.query({
    uploads: {
      $: {
        where: { id: uploadId },
        limit: 1,
      },
      profile: {
        owner: {},
      },
    },
  });

  return (uploads?.[0] as UploadNotificationRecord | undefined) ?? undefined;
};

const formatTimestamp = (value: number | Date | null | undefined) => {
  if (!value) {
    return "Unknown";
  }

  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleString("en-AU", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderOptionalLine = (label: string, value?: string | null) => {
  if (!value) {
    return null;
  }

  return `${label}: ${value}`;
};

export const sendAdminUploadNotification = async ({
  uploadId,
  appBaseUrl,
}: {
  uploadId: string;
  appBaseUrl?: string;
}): Promise<AdminUploadNotificationResult> => {
  const config = getMailConfig();
  if (!config) {
    return {
      notified: false,
      recipients: [],
      skippedReason: "Missing RESEND_API_KEY or NOTIFICATION_FROM_EMAIL",
    };
  }

  const upload = await getUploadRecord(uploadId);
  if (!upload) {
    return {
      notified: false,
      recipients: [],
      skippedReason: "Upload not found",
    };
  }

  const recipients = await getAdminRecipients();
  if (recipients.length === 0) {
    return {
      notified: false,
      recipients: [],
      skippedReason: "No admin recipients configured",
    };
  }

  const resend = new Resend(config.apiKey);
  const participantName = upload.profile?.displayName || upload.profile?.owner?.email || "Unknown participant";
  const submittedAt = formatTimestamp(upload.uploadedAt);
  const reviewUrl = appBaseUrl ? `${appBaseUrl}/review` : null;
  const textLines = [
    `A new upload is ready for review in Job Track.`,
    "",
    `Participant: ${participantName}`,
    `File: ${upload.filename}`,
    `Reward value: ${upload.rewardValue} pts`,
    `Submitted: ${submittedAt}`,
    renderOptionalLine("Employer", upload.employerName),
    renderOptionalLine("Role", upload.positionTitle),
    renderOptionalLine("Reference", upload.jobReference),
    reviewUrl ? `Review console: ${reviewUrl}` : null,
  ].filter((line): line is string => Boolean(line));

  const detailItems = [
    `<li><strong>Participant:</strong> ${escapeHtml(participantName)}</li>`,
    `<li><strong>File:</strong> ${escapeHtml(upload.filename)}</li>`,
    `<li><strong>Reward value:</strong> ${upload.rewardValue} pts</li>`,
    `<li><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</li>`,
    upload.employerName ? `<li><strong>Employer:</strong> ${escapeHtml(upload.employerName)}</li>` : null,
    upload.positionTitle ? `<li><strong>Role:</strong> ${escapeHtml(upload.positionTitle)}</li>` : null,
    upload.jobReference ? `<li><strong>Reference:</strong> ${escapeHtml(upload.jobReference)}</li>` : null,
  ].filter((item): item is string => Boolean(item));

  const html = [
    "<div>",
    "<p>A new upload is ready for review in Job Track.</p>",
    `<ul>${detailItems.join("")}</ul>`,
    reviewUrl ? `<p><a href="${escapeHtml(reviewUrl)}">Open the review console</a></p>` : "",
    "</div>",
  ].join("");

  await resend.emails.send({
    from: config.from,
    to: recipients,
    subject: `New upload submitted: ${upload.filename}`,
    text: textLines.join("\n"),
    html,
  });

  return {
    notified: true,
    recipients,
  };
};