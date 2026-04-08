"use client";

import React from "react";
import type { InstantUser, Profile } from "@/types/instant";
import { formatBytes } from "@/lib/rewards";
import { useUploadSubmission, type KeywordState } from "@/hooks/useUploadSubmission";

export type UploadPanelProps = {
  profile: Profile;
  user: InstantUser;
};

export const UploadPanel = ({ profile, user }: UploadPanelProps) => (
  <aside className="gov-panel upload-panel">
    <div className="panel-heading">
      <div>
        <p className="panel-eyebrow">Evidence submission</p>
        <h2 className="panel-title">Provide supporting documents</h2>
      </div>
      <span className="status-pill status-pill--soft">Secure upload</span>
    </div>
    <p className="panel-copy">
      Attach a resume, offer letter, or proof of job progress. Files are kept in encrypted Instant Storage and
      assessed under Beerseeker guidelines. Points are only released once a compliance officer completes manual review.
    </p>
    <UploadZone profile={profile} user={user} />
  </aside>
);

type UploadZoneProps = {
  profile: Profile;
  user: InstantUser;
};

const UploadZone = ({ profile, user }: UploadZoneProps) => {
  const {
    fileInputRef,
    selectedFile,
    isUploading,
    status,
    details,
    keywordState,
    rewardPreview,
    handleFileChange,
    handleDrop,
    handleDetailChange,
    handleUpload,
    resetSelection,
  } = useUploadSubmission({ profile, user });

  return (
    <div className="upload-zone">
      <div className="submission-details">
        <div className="submission-details__header">
          <p className="panel-eyebrow">Submission details</p>
          <span className="status-pill status-pill--outline">Used for verification</span>
        </div>
        <div className="submission-details__grid">
          <label className="form-field">
            <span>Employer name</span>
            <input
              className="form-input"
              type="text"
              value={details.employerName}
              onChange={handleDetailChange("employerName")}
              placeholder="eg. Department of Refreshment"
            />
          </label>
          <label className="form-field">
            <span>Role title</span>
            <input
              className="form-input"
              type="text"
              value={details.positionTitle}
              onChange={handleDetailChange("positionTitle")}
              placeholder="eg. Senior Analyst"
            />
          </label>
          <label className="form-field">
            <span>Job reference / URL</span>
            <input
              className="form-input"
              type="text"
              value={details.jobReference}
              onChange={handleDetailChange("jobReference")}
              placeholder="Application ID or link"
            />
          </label>
        </div>
      </div>
      <label
        htmlFor="file-input"
        className="upload-drop"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="upload-icon" />
        <p className="upload-title">Drag & drop your file</p>
        <p className="upload-subtitle">PDF or DOCX evidence up to 25MB</p>
        {selectedFile ? (
          <div className="upload-meta">
            <p>{selectedFile.name}</p>
            <p>
              {formatBytes(selectedFile.size)} • {rewardPreview} pts projected
            </p>
          </div>
        ) : (
          <p className="upload-meta">or browse from device</p>
        )}
        <input ref={fileInputRef} id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      </label>
      <KeywordBanner state={keywordState} />
      {keywordState.status === "success" && keywordState.result.hits.length ? (
        <ul className="keyword-hit-list">
          {keywordState.result.hits.map((hit) => (
            <li key={hit}>{hit}</li>
          ))}
        </ul>
      ) : null}
      <div className="upload-actions">
        <button
          className="gov-btn"
          disabled={!selectedFile || isUploading || keywordState.status === "running"}
          onClick={handleUpload}
        >
          {isUploading ? "Transmitting" : "Submit document"}
        </button>
        {selectedFile ? (
          <button className="gov-link" onClick={resetSelection} type="button">
            Clear selection
          </button>
        ) : null}
      </div>
      {status ? <p className="upload-status">{status}</p> : null}
    </div>
  );
};

const KeywordBanner = ({ state }: { state: KeywordState }) => {
  if (state.status === "idle") {
    return <div className="keyword-banner">Select a document to run automatic checks.</div>;
  }
  if (state.status === "running") {
    return <div className="keyword-banner keyword-banner--pending">Scanning document for expected phrases…</div>;
  }
  if (state.status === "error") {
    return <div className="keyword-banner keyword-banner--error">{state.message}</div>;
  }
  if (state.status === "success") {
    if (state.result.keywordMatch === null) {
      return (
        <div className="keyword-banner keyword-banner--warn">
          Unable to inspect this file type. Please double-check manually.
        </div>
      );
    }
    if (state.result.keywordMatch) {
      return (
        <div className="keyword-banner keyword-banner--success">
          Detected job-application language. {state.result.hits.length} signals captured.
        </div>
      );
    }
    return (
      <div className="keyword-banner keyword-banner--warn">
        Couldn’t find expected phrases. Ensure this is a genuine submission proof.
      </div>
    );
  }
  return null;
};
