import React from "react";
import type { UploadWithFile } from "@/types/instant";
import { formatBytes, formatRelativeTime } from "@/lib/rewards";

export type UploadHistoryProps = {
  uploads: UploadWithFile[];
};

export const UploadHistory = ({ uploads }: UploadHistoryProps) => (
  <section className="gov-panel history-panel">
    <div className="panel-heading">
      <div>
        <p className="panel-eyebrow">Recent activity</p>
        <h2 className="panel-title">Lodgement history</h2>
      </div>
      <span className="status-pill status-pill--outline">Audit ready</span>
    </div>
    {uploads.length === 0 ? (
      <div className="history-empty">
        <p>No documents on file yet.</p>
        <p>Submit evidence to begin your Beerseeker record.</p>
      </div>
    ) : (
      <ol className="history-list">
        {uploads.map((upload) => (
          <li key={upload.id} className="history-row">
            <div>
              <p className="history-row__title">{upload.filename}</p>
              <p className="history-row__meta">
                {formatBytes(upload.fileSize)} • {formatRelativeTime(upload.uploadedAt)}
              </p>
              {upload.positionTitle || upload.employerName ? (
                <p className="history-row__meta">
                  {[upload.positionTitle, upload.employerName].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>
            <div className="history-row__actions">
              <span className="history-chip">+{upload.rewardValue} pts</span>
              {upload.reviewStatus === "approved" ? (
                <span className="history-chip history-chip--success">Approved</span>
              ) : upload.reviewStatus === "rejected" ? (
                <span className="history-chip history-chip--error">Rejected</span>
              ) : (
                <span className="history-chip history-chip--pending">Pending review</span>
              )}
              {upload.keywordMatch === true ? (
                <span className="history-chip history-chip--ghost">Keywords found</span>
              ) : upload.keywordMatch === false ? (
                <span className="history-chip history-chip--warn">Manual flag</span>
              ) : null}
              {upload.file?.url ? (
                <a className="gov-link" href={upload.file.url} target="_blank" rel="noreferrer">
                  View file
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    )}
  </section>
);
