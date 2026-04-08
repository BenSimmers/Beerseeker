'use client';

import React from "react";
import type { UploadWithFile } from "@/types/instant";

export type ReviewNotesResult = {
  notes: Record<string, string>;
  updateNote: (uploadId: string, value: string) => void;
  clearNote: (uploadId: string) => void;
};

export const useReviewNotes = (uploads: UploadWithFile[] = []): ReviewNotesResult => {
  const [notes, setNotes] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setNotes((prev) => {
      const next = { ...prev };
      let changed = false;
      Object.keys(next).forEach((id) => {
        if (!uploads.some((upload) => upload.id === id && upload.reviewStatus === "pending")) {
          delete next[id];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [uploads]);

  const updateNote = React.useCallback((uploadId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [uploadId]: value }));
  }, []);

  const clearNote = React.useCallback((uploadId: string) => {
    setNotes((prev) => {
      if (!(uploadId in prev)) {
        return prev;
      }
      const next = { ...prev };
      delete next[uploadId];
      return next;
    });
  }, []);

  return { notes, updateNote, clearNote };
};
