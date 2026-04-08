'use client';

import React from "react";
import { db } from "@/lib/db";
import { buildReviewerQuery } from "@/components/beerseeker/queries";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { ProfileForReview } from "@/types/instant";

export type ParticipantSearchResult = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    profiles: ProfileForReview[];
    isLoading: boolean;
    error?: Error;
};

export const useParticipantSearch = (): ParticipantSearchResult => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const debouncedSearch = useDebouncedValue(searchTerm, 400);

    const reviewerQuery = React.useMemo(() => buildReviewerQuery(debouncedSearch), [debouncedSearch]);
    const { data, isLoading, error } = db.useQuery(reviewerQuery);
    const profiles = (data?.profiles ?? []) as ProfileForReview[];

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

    return {
        searchTerm,
        setSearchTerm,
        profiles,
        isLoading,
        error: normalizedError,
    };
};
