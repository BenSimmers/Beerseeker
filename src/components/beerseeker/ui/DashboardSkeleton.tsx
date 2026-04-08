import React from "react";

export const DashboardSkeleton = () => (
  <main className="gov-surface">
    <div className="gov-surface__gradient" />
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="gov-panel h-48" />
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="gov-panel h-96" />
        <div className="gov-panel h-96" />
      </div>
      <div className="gov-panel h-72" />
    </div>
  </main>
);
