'use client';

import { RewardDashboard } from "@/components/beerseeker/dashboard/RewardDashboard";
import { SignedOutView } from "@/components/beerseeker/auth/SignedOutView";
import { PageLoader } from "@/components/beerseeker/ui/PageLoader";
import { ErrorState } from "@/components/beerseeker/ui/ErrorState";
import { useSessionGate } from "@/hooks/useSessionGate";

export const BeerseekerApp = () => {
  const gate = useSessionGate();

  if (gate.status === "loading") {
    return <PageLoader />;
  }

  if (gate.status === "error") {
    return <ErrorState headline="Service unavailable" message={gate.error.message} />;
  }

  if (gate.status === "signed-out") {
    return <SignedOutView />;
  }

  return <RewardDashboard user={gate.user} />;
};

export default BeerseekerApp;
