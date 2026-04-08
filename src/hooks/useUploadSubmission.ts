'use client';

import React from "react";
import type { InstantUser, Profile } from "@/types/instant";
import { calculateReward } from "@/lib/rewards";
import { uploadWithReward } from "@/lib/uploads";
import {
  scanDocumentForKeywords,
  type KeywordScanResult,
  type SubmissionDetails,
} from "@/lib/documentScan";

export type KeywordState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "error"; message: string }
  | { status: "success"; result: KeywordScanResult & { checkedAt: number } };

export const useUploadSubmission = ({
  profile,
  user,
}: {
  profile: Profile;
  user: InstantUser;
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);
  const [details, setDetails] = React.useState<SubmissionDetails>({
    employerName: "",
    positionTitle: "",
    jobReference: "",
  });
  const [keywordState, setKeywordState] = React.useState<KeywordState>({ status: "idle" });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const rewardPreview = React.useMemo(
    () => (selectedFile ? calculateReward(selectedFile) : null),
    [selectedFile],
  );

  const detailSignature = React.useMemo(
    () => `${details.employerName}|${details.positionTitle}|${details.jobReference}`,
    [details.employerName, details.positionTitle, details.jobReference],
  );

  const keywordInsight = React.useMemo(() => {
    if (keywordState.status === "success") {
      const { keywordMatch, hits, checkedAt } = keywordState.result;
      if (keywordMatch === null) {
        return { keywordMatch: null, keywordHits: null, keywordCheckedAt: null };
      }
      return {
        keywordMatch,
        keywordHits: hits.length,
        keywordCheckedAt: checkedAt,
      };
    }
    return { keywordMatch: null, keywordHits: null, keywordCheckedAt: null };
  }, [keywordState]);

  const resetSelection = React.useCallback(() => {
    setSelectedFile(null);
    setKeywordState({ status: "idle" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleFileSelection = React.useCallback((file: File | null) => {
    setSelectedFile(file);
    setStatus(null);
  }, []);

  const handleFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFileSelection(file);
  }, [handleFileSelection]);

  const handleDrop = React.useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] ?? null;
    handleFileSelection(file);
  }, [handleFileSelection]);

  React.useEffect(() => {
    if (!selectedFile) {
      setKeywordState({ status: "idle" });
      return;
    }
    let cancelled = false;
    setKeywordState({ status: "running" });
    const timeout = window.setTimeout(() => {
      scanDocumentForKeywords({ file: selectedFile, details })
        .then((result) => {
          if (!cancelled) {
            setKeywordState({ status: "success", result: { ...result, checkedAt: Date.now() } });
          }
        })
        .catch((err) => {
          if (!cancelled) {
            const message = err instanceof Error ? err.message : "Unable to scan document";
            setKeywordState({ status: "error", message });
          }
        });
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [selectedFile, detailSignature, details]);

  const handleDetailChange = React.useCallback(
    (field: keyof SubmissionDetails) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setDetails((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleUpload = React.useCallback(async () => {
    if (!selectedFile) {
      return;
    }
    setIsUploading(true);
    setStatus(null);
    try {
      const rewardValue = await uploadWithReward({
        file: selectedFile,
        profile,
        user,
        submissionDetails: details,
        keywordInsight,
      });
      setStatus(`Received ${selectedFile.name}. +${rewardValue} pts applied to your record.`);
      resetSelection();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setStatus(message);
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, profile, user, details, keywordInsight, resetSelection]);

  return {
    fileInputRef,
    selectedFile,
    isUploading,
    status,
    details,
    keywordState,
    rewardPreview,
    handleFileChange,
    handleDrop,
    handleDetailChange,
    handleUpload,
    resetSelection,
  };
};
