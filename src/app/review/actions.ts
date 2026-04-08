'use server';

import { approveUpload, rejectUpload } from '@/lib/reviews';

type ActionPayload = {
  uploadId: string;
  reviewerId: string;
  reason?: string | null;
};

const resolvePayload = (formData: FormData): ActionPayload | null => {
  const uploadId = formData.get('uploadId');
  const reviewerId = formData.get('reviewerId');
  if (!uploadId || !reviewerId) {
    return null;
  }

  const reasonValue = formData.get('reason');

  return {
    uploadId: String(uploadId),
    reviewerId: String(reviewerId),
    reason: typeof reasonValue === 'string' ? reasonValue.trim() : undefined,
  };
};

export async function approveUploadAction(formData: FormData) {
  const payload = resolvePayload(formData);
  if (!payload) {
    return;
  }
  await approveUpload({ uploadId: payload.uploadId, reviewerId: payload.reviewerId });
}

export async function rejectUploadAction(formData: FormData) {
  const payload = resolvePayload(formData);
  if (!payload) {
    return;
  }
  await rejectUpload({ uploadId: payload.uploadId, reviewerId: payload.reviewerId, reason: payload.reason ?? "" });
}
