"use client";

import type { InstantUser } from "@/types/instant";
import { EntitlementPanel } from "@/components/beerseeker/dashboard/entitlements/EntitlementPanel";
import { UploadPanel } from "@/components/beerseeker/dashboard/uploads/UploadPanel";
import { UploadHistory } from "@/components/beerseeker/dashboard/uploads/UploadHistory";
import { DashboardSkeleton } from "@/components/beerseeker/ui/DashboardSkeleton";
import { ErrorState } from "@/components/beerseeker/ui/ErrorState";
import { useParticipantData } from "@/hooks/useParticipantData";
import { PortalHeader } from "./PortalHeader";

export type RewardDashboardProps = {
  user: InstantUser;
};

export const RewardDashboard = ({ user }: RewardDashboardProps) => {
  const { profile, uploads, isLoading, error } = useParticipantData(user);

  if (error) {
    return <ErrorState headline="Unable to sync" message={error.message} />;
  }

  if (isLoading || !profile) {
    return <DashboardSkeleton />;
  }

  return (
    <main className="gov-surface">
      <div className="gov-surface__gradient" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <PortalHeader profile={profile} user={user} />
        <section className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <EntitlementPanel profile={profile} uploads={uploads} />
          <UploadPanel profile={profile} user={user} />
        </section>
        <UploadHistory uploads={uploads} />
      </div>
    </main>
  );
};
