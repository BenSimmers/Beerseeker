import React from "react";
import type { Profile, UploadWithFile } from "@/types/instant";
import { StatCard } from "@/components/beerseeker/ui/StatCard";

export type EntitlementPanelProps = {
  profile: Profile;
  uploads: UploadWithFile[];
};

export const EntitlementPanel = ({ profile, uploads }: EntitlementPanelProps) => {
  const progress = Math.min(1, profile.rewardTotal / profile.rewardGoal);
  const latestSubmission = uploads[0];
  const latestReward = latestSubmission?.rewardValue ?? 0;
  const latestStatus = latestSubmission?.reviewStatus ?? "pending";
  const formatStatus = (status: string) => {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending review";
  };
  const delta = Math.max(profile.rewardGoal - profile.rewardTotal, 0);
  const baseSegment = Math.ceil((profile.rewardTotal || 0) / 25) * 25;
  const upcoming = baseSegment <= profile.rewardTotal ? baseSegment + 25 : baseSegment;
  const milestoneDisplay =
    profile.rewardTotal >= profile.rewardGoal
      ? profile.rewardTotal + 25
      : Math.min(Math.max(upcoming, 25), profile.rewardGoal);
  const pendingReward = uploads
    .filter((upload) => !upload.reviewStatus || upload.reviewStatus === "pending")
    .reduce((total, upload) => total + upload.rewardValue, 0);

  return (
    <section className="gov-panel entitlement-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-eyebrow">Benefit status</p>
          <h2 className="panel-title">Entitlement summary</h2>
        </div>
        <span className="status-pill">Verified identity</span>
      </div>

      <div className="progress-block">
        <div className="progress-header">
          <div>
            <p className="progress-label">Current allocation</p>
            <p className="progress-value">{profile.rewardTotal.toLocaleString()} pts</p>
          </div>
          <div className="progress-percentage">{Math.round(progress * 100)}%</div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(progress * 100, 100)}%` }} />
        </div>
        <p className="progress-copy">
          {delta === 0
            ? 'Threshold met. Submit documentation to maintain eligibility.'
            : `${delta} pts remaining before the next refreshment allowance is released.`}
          <br />
          Approved submissions update this meter once manual review is finalised.
        </p>
      </div>

      <div className="entitlement-grid">
        <StatCard label="Next release" value={`${milestoneDisplay} pts`} detail="Target for next disbursement" />
        <StatCard
          label="Pending review"
          value={`+${pendingReward} pts`}
          detail="Will be credited after manual approval"
        />
        <StatCard
          label="Latest submission"
          value={latestSubmission ? `+${latestReward} pts` : "No uploads"}
          detail={latestSubmission ? `Status: ${formatStatus(latestStatus)}` : "Awaiting your first document"}
        />
        <StatCard label="Compliance streak" value={`${Math.min(profile.uploadsCount, 7)} / 7 days`} detail="Keep data flowing daily" />
        <StatCard label="Annual ceiling" value={`${profile.rewardGoal} pts`} detail="Adjust in program preferences" />
      </div>

      <MilestoneRail progress={progress} />
    </section>
  );
};

type MilestoneRailProps = {
  progress: number;
};

const milestones = [
  { label: 'Lodgement received', threshold: 0.25 },
  { label: 'Assessment underway', threshold: 0.5 },
  { label: 'Ready to issue', threshold: 0.75 },
  { label: 'Disbursed', threshold: 1 },
];

const MilestoneRail = ({ progress }: MilestoneRailProps) => (
  <ol className="milestone-rail">
    {milestones.map((item) => {
      const isActive = progress >= item.threshold;
      return (
        <li key={item.label} className={isActive ? 'milestone is-active' : 'milestone'}>
          <span className="milestone-dot" />
          <span>{item.label}</span>
        </li>
      );
    })}
  </ol>
);
