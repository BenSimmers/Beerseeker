'use client';

import React from "react";
import Link from "next/link";
import type { InstantUser, ProfileForReview, UploadWithFile } from "@/types/instant";
import { PageLoader } from "@/components/beerseeker/ui/PageLoader";
import { ErrorState } from "@/components/beerseeker/ui/ErrorState";
import { approveUploadAction, rejectUploadAction } from "@/app/review/actions";
import { useReviewerAuth } from "@/hooks/useReviewerAuth";
import { useParticipantSearch } from "@/hooks/useParticipantSearch";
import { useReviewNotes } from "@/hooks/useReviewNotes";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_CLASS: Record<string, string> = {
  pending: "history-chip--pending",
  approved: "history-chip--success",
  rejected: "history-chip--error",
};

const formatDate = (timestamp?: number | null) => {
  if (!timestamp) {
    return "";
  }
  return new Date(timestamp).toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getReviewStats = (uploads: UploadWithFile[] = []) => {
  return uploads.reduce(
    (acc, upload) => {
      const key = upload.reviewStatus as keyof typeof acc;
      if (key in acc) {
        acc[key] += 1;
      }
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 },
  );
};

export const ReviewerDashboard = () => {
  const auth = useReviewerAuth();

  if (auth.status === "error") {
    return <ErrorState headline="Auth error" message={auth.error.message} />;
  }

  if (auth.status === "loading" || auth.status === "signed-out") {
    return <PageLoader />;
  }

  if (auth.status === "unauthorized") {
    return <ReviewerRestricted />;
  }

  return <ReviewerWorkspace user={auth.user} />;
};

const ReviewerWorkspace = ({ user }: { user: InstantUser }) => {
  const { searchTerm, setSearchTerm, profiles, error: queryError } = useParticipantSearch();
  const [selectedProfileId, setSelectedProfileId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!profiles.length) {
      setSelectedProfileId(null);
      return;
    }
    if (!selectedProfileId || !profiles.some((profile) => profile.id === selectedProfileId)) {
      setSelectedProfileId(profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  const selectedProfile = profiles.find((profile) => profile.id === selectedProfileId) ?? null;
  const selectedUploads = (selectedProfile?.uploads ?? []) as UploadWithFile[];
  const reviewStats = getReviewStats(selectedUploads);
  const { notes, updateNote } = useReviewNotes(selectedUploads);

  if (queryError) {
    return <ErrorState headline="Query failed" message={queryError.message} />;
  }

  return (
    <main className="gov-surface">
      <div className="gov-surface__gradient" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <ReviewHero user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="review-grid">
          <ParticipantSidebar
            profiles={profiles}
            selectedProfileId={selectedProfileId}
            onSelect={setSelectedProfileId}
          />
          <ParticipantDetail
            profile={selectedProfile}
            uploads={selectedUploads}
            stats={reviewStats}
            notes={notes}
            updateNote={updateNote}
            reviewerId={user.id}
          />
        </section>
      </div>
    </main>
  );
};

const ReviewerRestricted = () => (
  <main className="gov-surface">
    <div className="gov-surface__gradient" />
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
      <section className="gov-panel">
        <p className="panel-eyebrow">Restricted</p>
        <h1 className="panel-title">Reviewer access only</h1>
        <p className="panel-copy">
          The Beerseeker review workspace is available to designated administrators. If you believe this is an error,
          contact the program lead.
        </p>
        <Link className="gov-btn" href="/">
          Return to dashboard
        </Link>
      </section>
    </div>
  </main>
);

type ReviewHeroProps = {
  user: InstantUser;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const ReviewHero = ({ user, searchTerm, setSearchTerm }: ReviewHeroProps) => (
  <section className="gov-panel review-hero">
    <div className="panel-heading">
      <div>
        <p className="panel-eyebrow">Internal operations</p>
        <h1 className="panel-title">Manual review console</h1>
        <p className="panel-copy">
          Search by participant email, scan their recent submissions, and approve or reject each upload once it has been
          verified against the Beerseeker eligibility checklist.
        </p>
      </div>
      <div className="review-hero__badge">
        <span className="status-pill status-pill--soft">Signed in as {user.email ?? user.id}</span>
      </div>
    </div>
    <div className="review-search">
      <label className="form-field" htmlFor="review-search">
        <span>Participant email</span>
        <input
          id="review-search"
          type="search"
          className="form-input"
          placeholder="e.g. citizen@govmail.au"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <p className="review-search__hint">Indexed search leverages the Instant schema, so email fragments are supported.</p>
    </div>
  </section>
);

type ParticipantSidebarProps = {
  profiles: ProfileForReview[];
  selectedProfileId: string | null;
  onSelect: (id: string) => void;
};

const ParticipantSidebar = ({ profiles, selectedProfileId, onSelect }: ParticipantSidebarProps) => (
  <aside className="gov-panel review-sidebar">
    <p className="panel-eyebrow">Matching participants</p>
    <div className="review-results">
      {profiles.length === 0 ? (
        <p className="review-empty">No participants match that query yet.</p>
      ) : (
        profiles.map((profile) => {
          const pendingUploads = (profile.uploads ?? []).filter((upload) => upload.reviewStatus === "pending").length;
          return (
            <button
              type="button"
              key={profile.id}
              onClick={() => onSelect(profile.id)}
              className={`review-card${selectedProfileId === profile.id ? " review-card--active" : ""}`}
            >
              <p className="review-card__email">{profile.owner?.email ?? "No email on file"}</p>
              <p className="review-card__meta">
                Rewards: {profile.rewardTotal.toLocaleString()} / {profile.rewardGoal.toLocaleString()} pts
              </p>
              <span
                className={`history-chip review-card__chip ${
                  pendingUploads ? "history-chip--warn" : "history-chip--success"
                }`}
              >
                {pendingUploads ? `${pendingUploads} pending` : "Up to date"}
              </span>
            </button>
          );
        })
      )}
    </div>
  </aside>
);

type ParticipantDetailProps = {
  profile: ProfileForReview | null;
  uploads: UploadWithFile[];
  stats: ReturnType<typeof getReviewStats>;
  notes: Record<string, string>;
  updateNote: (id: string, value: string) => void;
  reviewerId: string;
};

const ParticipantDetail = ({ profile, uploads, stats, notes, updateNote, reviewerId }: ParticipantDetailProps) => (
  <section className="gov-panel review-detail">
    {!profile ? (
      <div className="review-empty">
        <p>Select a participant from the list to inspect their uploads.</p>
      </div>
    ) : (
      <div className="review-detail__scroll">
        <header className="review-detail__header">
          <div>
            <p className="panel-eyebrow">Participant</p>
            <h2 className="panel-title">{profile.owner?.email ?? "Unspecified email"}</h2>
            <p className="panel-copy">Profile created {formatDate(profile.createdAt)}</p>
          </div>
          <div className="review-detail__stats">
            <div className="review-stat">
              <p className="review-stat__label">Confirmed points</p>
              <p className="review-stat__value">{profile.rewardTotal.toLocaleString()} pts</p>
              <p className="review-stat__hint">Goal {profile.rewardGoal.toLocaleString()} pts</p>
            </div>
            <div className="review-stat">
              <p className="review-stat__label">Uploads</p>
              <p className="review-stat__value">{profile.uploadsCount}</p>
              <p className="review-stat__hint">Pending {stats.pending}</p>
            </div>
            <div className="review-stat">
              <p className="review-stat__label">Approvals</p>
              <p className="review-stat__value">{stats.approved}</p>
              <p className="review-stat__hint">Rejects {stats.rejected}</p>
            </div>
          </div>
        </header>

        <div className="review-upload-list">
          {uploads.length === 0 ? (
            <div className="review-empty">
              <p>No uploads yet.</p>
            </div>
          ) : (
            uploads.map((upload) => (
              <ReviewUploadCard
                key={upload.id}
                upload={upload}
                note={notes[upload.id]}
                updateNote={updateNote}
                reviewerId={reviewerId}
              />
            ))
          )}
        </div>
      </div>
    )}
  </section>
);

type ReviewUploadCardProps = {
  upload: UploadWithFile;
  note?: string;
  updateNote: (id: string, value: string) => void;
  reviewerId: string;
};

const ReviewUploadCard = ({ upload, note, updateNote, reviewerId }: ReviewUploadCardProps) => {
  const chipClass = STATUS_CLASS[upload.reviewStatus] ?? "history-chip";
  return (
    <article className="review-upload-card">
      <div className="review-upload-card__header">
        <div>
          <h3 className="review-upload-card__title">{upload.filename}</h3>
          <p className="review-upload-card__meta">
            Filed {formatDate(upload.uploadedAt)}
            {upload.employerName ? ` • ${upload.employerName}` : ""}
            {upload.positionTitle ? ` • ${upload.positionTitle}` : ""}
          </p>
        </div>
        <span className={`history-chip ${chipClass}`}>
          {STATUS_LABEL[upload.reviewStatus] ?? upload.reviewStatus}
        </span>
      </div>
      <dl className="review-upload-card__grid">
        <div>
          <dt>Keyword scan</dt>
          <dd>
            {upload.keywordMatch ? `Likely employment (${upload.keywordHits ?? 0} hits)` : "No positive matches"}
          </dd>
        </div>
        <div>
          <dt>Reward value</dt>
          <dd>{upload.rewardValue.toLocaleString()} pts</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>{upload.jobReference || "Not provided"}</dd>
        </div>
        <div>
          <dt>Review notes</dt>
          <dd>{upload.reviewNotes || "—"}</dd>
        </div>
      </dl>
      <div className="review-upload-card__footer">
        {upload.file?.url ? (
          <a className="gov-link" href={upload.file.url} target="_blank" rel="noreferrer">
            View document
          </a>
        ) : (
          <span className="review-upload-card__meta">File still processing</span>
        )}
        {upload.reviewStatus === "pending" ? (
          <form className="review-action">
            <input type="hidden" name="uploadId" value={upload.id} />
            <input type="hidden" name="reviewerId" value={reviewerId} />
            <input
              className="form-input review-action__notes"
              name="reason"
              placeholder="Rejection note (optional)"
              value={note ?? ""}
              onChange={(event) => updateNote(upload.id, event.target.value)}
            />
            <div className="review-action__buttons">
              <button className="gov-btn gov-btn--success" formAction={approveUploadAction}>
                Approve & award
              </button>
              <button className="ghost-btn ghost-btn--danger" formAction={rejectUploadAction}>
                Reject upload
              </button>
            </div>
          </form>
        ) : (
          <p className="review-upload-card__meta">
            Reviewed {formatDate(upload.reviewedAt)} by {upload.reviewedBy || "admin"}
          </p>
        )}
      </div>
    </article>
  );
};
