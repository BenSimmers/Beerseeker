'use client';

import type { InstantUser } from '@/types/instant';
import { db } from '@/lib/db';

export type SessionGateState =
  | { status: 'loading'; user: null }
  | { status: 'error'; user: null; error: Error }
  | { status: 'signed-out'; user: null }
  | { status: 'ready'; user: InstantUser };

export const useSessionGate = (): SessionGateState => {
  const { isLoading, user, error } = db.useAuth();
  const normalizedError =
    error instanceof Error
      ? error
      : error
        ? new Error(typeof error === 'object' && 'message' in error ? String(error.message) : 'Authentication failed')
        : undefined;

  if (isLoading) {
    return { status: 'loading', user: null };
  }

  if (normalizedError) {
    return { status: 'error', user: null, error: normalizedError };
  }

  if (!user) {
    return { status: 'signed-out', user: null };
  }

  return { status: 'ready', user };
};
