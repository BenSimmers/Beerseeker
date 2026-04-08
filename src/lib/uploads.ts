import { id } from "@instantdb/react";
import { db } from "@/lib/db";
import { calculateReward } from "@/lib/rewards";
import type { SubmissionDetails } from "@/lib/documentScan";
import type { InstantUser, Profile } from "@/types/instant";

export type UploadArgs = {
  file: File;
  profile: Profile;
  user: InstantUser;
  submissionDetails: SubmissionDetails;
  keywordInsight: {
    keywordMatch: boolean | null;
    keywordHits: number | null;
    keywordCheckedAt: number | null;
  };
};

const notifyAdminsOfUpload = async (uploadId: string) => {
  try {
    const response = await fetch("/api/upload-notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uploadId }),
    });

    if (!response.ok) {
      console.error("Upload saved but admin notification failed", await response.text());
    }
  } catch (error) {
    console.error("Upload saved but admin notification request failed", error);
  }
};

export const uploadWithReward = async ({ file, profile, user, submissionDetails, keywordInsight }: UploadArgs) => {
  const rewardValue = calculateReward(file);
  const uniquePath = `${user.id}/${Date.now()}-${file.name}`;
  const uploadResult = await db.storage.uploadFile(uniquePath, file, {
    contentType: file.type || "application/octet-stream",
    contentDisposition: `attachment; filename="${file.name}"`,
  });

  const fileId = uploadResult.data.id;
  const uploadId = id();

  const employerName = submissionDetails.employerName?.trim();
  const positionTitle = submissionDetails.positionTitle?.trim();
  const jobReference = submissionDetails.jobReference?.trim();

  const uploadPayload: Record<string, unknown> = {
    filename: file.name,
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
    rewardValue,
    uploadedAt: Date.now(),
    reviewStatus: "pending",
  };

  if (employerName) {
    uploadPayload.employerName = employerName;
  }
  if (positionTitle) {
    uploadPayload.positionTitle = positionTitle;
  }
  if (jobReference) {
    uploadPayload.jobReference = jobReference;
  }

  if (keywordInsight.keywordMatch !== null) {
    uploadPayload.keywordMatch = keywordInsight.keywordMatch;
  }
  if (keywordInsight.keywordHits !== null) {
    uploadPayload.keywordHits = keywordInsight.keywordHits;
  }
  if (keywordInsight.keywordCheckedAt !== null) {
    uploadPayload.keywordCheckedAt = keywordInsight.keywordCheckedAt;
  }

  await db.transact([
    db.tx.uploads[uploadId]
      .update(uploadPayload)
      .link({ profile: profile.id, file: fileId }),
    db.tx.profiles[profile.id].update({
      uploadsCount: profile.uploadsCount + 1,
    }),
  ]);

  await notifyAdminsOfUpload(uploadId);

  return rewardValue;
};
