'use client';

import React from "react";
import { db } from "@/lib/db";
import { useSessionGate } from "@/hooks/useSessionGate";
import type { InstantUser, UserRecord } from "@/types/instant";

export type ReviewerAuthState =
    | { status: "loading" }
    | { status: "error"; error: Error }
    | { status: "signed-out" }
    | { status: "unauthorized"; user: InstantUser }
    | { status: "ready"; user: InstantUser; record: UserRecord };

export const useReviewerAuth = (): ReviewerAuthState => {
    const session = useSessionGate();
    const currentUserId = session.status === "ready" ? session.user.id : "__no_user__";

    const userQuery = React.useMemo(
        () => ({
            $users: {
                $: {
                    where: { id: currentUserId },
                    limit: 1,
                },
            },
        }),
        [currentUserId],
    );

    const { data, isLoading, error } = db.useQuery(userQuery);

    if (session.status === "loading") {
        return { status: "loading" };
    }

    if (session.status === "error") {
        return { status: "error", error: session.error };
    }

    if (session.status === "signed-out") {
        return { status: "signed-out" };
    }

    if (error) {
        return { status: "error", error: error instanceof Error ? error : new Error("Failed to fetch user data") };
    }

    const record = (data?.$users ?? [])[0] as UserRecord | undefined;

    if (isLoading && !record) {
        return { status: "loading" };
    }

    if (!record || record.type !== "admin") {
        return { status: "unauthorized", user: session.user };
    }

    return { status: "ready", user: session.user, record };
};
