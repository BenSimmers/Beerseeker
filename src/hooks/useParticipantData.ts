'use client';

import React from 'react';
import { db } from '@/lib/db';
import { buildDashboardQuery } from '@/components/beerseeker/queries';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';
import type { InstantUser, Profile, UploadWithFile } from '@/types/instant';

export type ParticipantDataResult = {
  profile?: Profile;
  uploads: UploadWithFile[];
  isLoading: boolean;
  error?: Error;
};

export const useParticipantData = (user: InstantUser): ParticipantDataResult => {
  const query = React.useMemo(() => buildDashboardQuery(user.id), [user.id]);
  const { data, isLoading, error } = db.useQuery(query);
  const profile = data?.profiles?.[0] as Profile | undefined;
  const uploads = (data?.uploads ?? []) as UploadWithFile[];
  const normalizedError = React.useMemo(() => {
    if (!error) {
      return undefined;
    }
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "object" && error && "message" in error) {
      return new Error(String((error as { message?: unknown }).message));
    }
    return new Error("Query failed");
  }, [error]);

  useEnsureProfile({ user, profile, isLoading });

  return {
    profile,
    uploads,
    isLoading: isLoading || !profile,
    error: normalizedError,
  };
};
