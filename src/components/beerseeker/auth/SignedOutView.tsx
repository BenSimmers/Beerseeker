import React from "react";
import { MagicCodeLogin } from "@/components/beerseeker/auth/MagicCodeLogin";
import { StatCard } from "@/components/beerseeker/ui/StatCard";

export const SignedOutView = () => (
  <main className="gov-surface">
    <div className="gov-surface__gradient" />
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
      <section className="gov-panel hero-panel flex-1">
        <div className="crest-badge">
          <span className="crest-mark" />
          <div>
            <p className="crest-label">Australian Government</p>
            <p className="crest-division">Beerseeker Initiative</p>
          </div>
        </div>
        <h1 className="hero-title">Welcome to Beerseeker</h1>
        <div className="signedout-grid">
          <StatCard label="Secure storage" value="Instant" detail="Files encrypted at rest" />
          <StatCard label="Live points" value="Realtime" detail="Track approvals instantly" />
        </div>
      </section>
      <section className="gov-panel auth-panel flex-1">
        <MagicCodeLogin />
      </section>
    </div>
  </main>
);
