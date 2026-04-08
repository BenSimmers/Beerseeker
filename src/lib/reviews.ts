"use server";

import { adminDb } from "@/lib/adminDb";

const fetchUploadWithProfile = async (uploadId: string) => {
  const { uploads } = await adminDb.query({
    uploads: {
      $: { where: { id: uploadId }, limit: 1 },
      profile: {},
    },
  });

  return uploads?.[0];
};

export const approveUpload = async ({ uploadId, reviewerId }: { uploadId: string; reviewerId: string }) => {
  const upload = await fetchUploadWithProfile(uploadId);
  if (!upload || upload.reviewStatus === "approved" || !upload.profile) {
    return;
  }

  await adminDb.transact([
    adminDb.tx.uploads[upload.id].update({
      reviewStatus: "approved",
      reviewedAt: Date.now(),
      reviewedBy: reviewerId,
      awardedAt: Date.now(),
    }),
    adminDb.tx.profiles[upload.profile.id].update({
      rewardTotal: upload.profile.rewardTotal + upload.rewardValue,
    }),
  ]);
};

export const rejectUpload = async ({
  uploadId,
  reviewerId,
  reason,
}: {
  uploadId: string;
  reviewerId: string;
  reason?: string;
}) => {
  const upload = await fetchUploadWithProfile(uploadId);
  if (!upload || upload.reviewStatus === "rejected") {
    return;
  }

  const wasApproved = upload.reviewStatus === "approved" && upload.profile;
  const uploadTx = adminDb.tx.uploads[upload.id].update({
    reviewStatus: "rejected",
    reviewedAt: Date.now(),
    reviewedBy: reviewerId,
    reviewNotes: reason,
  });

  const profileTx = wasApproved
    ? [
        adminDb.tx.profiles[upload.profile!.id].update({
          rewardTotal: Math.max(0, upload.profile!.rewardTotal - upload.rewardValue),
        }),
      ]
    : [];

  await adminDb.transact([uploadTx, ...profileTx]);
};
