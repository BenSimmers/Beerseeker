'use client';

import React from "react";
import { id } from "@instantdb/react";
import { db } from "@/lib/db";
import { DEFAULT_REWARD_GOAL } from "@/components/beerseeker/queries";
import type { InstantUser, Profile } from "@/types/instant";

type Params = {
  user: InstantUser;
  profile?: Profile;
  isLoading: boolean;
};

export const useEnsureProfile = ({ user, profile, isLoading }: Params) => {
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    if (isLoading || profile || hasStarted.current) {
      return;
    }
    hasStarted.current = true;
    const profileId = id();

    db.transact(
      db.tx.profiles[profileId]
        .update({
          displayName: user.email?.split("@")[0] ?? "Collector",
          rewardGoal: DEFAULT_REWARD_GOAL,
          rewardTotal: 0,
          uploadsCount: 0,
          createdAt: Date.now(),
        })
        .link({ owner: user.id }),
    ).catch(() => {
      hasStarted.current = false;
    });
  }, [user.id, user.email, profile?.id, isLoading]);
};
