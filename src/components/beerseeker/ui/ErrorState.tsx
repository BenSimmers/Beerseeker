import React from "react";

type ErrorStateProps = {
  headline: string;
  message: string;
};

export const ErrorState = ({ headline, message }: ErrorStateProps) => (
  <div className="error-state">
    <div className="gov-panel">
      <p className="panel-eyebrow">{headline}</p>
      <p className="error-state__message">{message}</p>
    </div>
  </div>
);
