"use client";

import React from "react";
import Link from "next/link";
import type { InstantUser, Profile } from "@/types/instant";
import { db } from "@/lib/db";

export type PortalHeaderProps = {
  profile: Profile;
  user: InstantUser;
};

const QUICK_TILES = [
  { id: "inbox", label: "Inbox", detail: "Read important messages", badge: 2 },
  { id: "security", label: "Security review", detail: "Check outstanding actions", badge: 3 },
  { id: "claims", label: "Payments & claims", detail: "Track allowance progress", badge: null },
] as const;

const LINKED_SERVICES = ["Australian Taxation Office", "Centrelink", "Medicare", "Beerseeker Rewards"] as const;

export const PortalHeader = ({ profile, user }: PortalHeaderProps) => {
  const isAdmin = profile.owner?.type === "admin";
  const displayName = profile.displayName || user.email || "Registered citizen";

  return (
    <>
      <GovAppBar isAdmin={isAdmin} />
      <header className="gov-panel hero-panel hero-shell">
        <HeroWelcome displayName={displayName} isAdmin={isAdmin} profile={profile} />
        <HeroTiles tiles={QUICK_TILES} />
        <LinkedServices count={LINKED_SERVICES.length} services={LINKED_SERVICES} />
      </header>
    </>
  );
};

const GovAppBar = ({ isAdmin }: { isAdmin: boolean }) => (
  <div className="gov-appbar">
    <div className="gov-appbar__brand">
      <div>
        <p className="gov-appbar__agency">Australian Government</p>
      </div>
    </div>
    <nav className="gov-appbar__nav" aria-label="Primary">
      <Link href="/">Home</Link>
      <a href="#benefits">Browse</a>
      <a href="#search">Search</a>
      {isAdmin ? <Link href="/review">Review</Link> : null}
    </nav>
    <div className="gov-appbar__actions">
      <button className="ghost-btn" onClick={() => db.auth.signOut()} type="button">
        Sign out
      </button>
    </div>
  </div>
);

type HeroWelcomeProps = {
  displayName: string;
  isAdmin: boolean;
  profile: Profile;
};

const HeroWelcome = ({ displayName, isAdmin, profile }: HeroWelcomeProps) => (
  <section className="hero-shell__welcome">
    <p className="panel-eyebrow">Welcome</p>
    <h1 className="hero-title">{displayName}</h1>
    <p className="hero-meta-text">
      Last sync: {new Date(profile.createdAt ?? Date.now()).toLocaleString("en-AU", { dateStyle: "long", timeStyle: "short" })}
    </p>
    <div className="hero-tag-row">
      <span className="status-pill status-pill--outline">Program ID {profile.id.slice(0, 6).toUpperCase()}</span>
      <span className="status-pill status-pill--soft">
        {profile.rewardTotal >= profile.rewardGoal ? "Ready to collect" : "Progressing"}
      </span>
    </div>
    <div className="hero-actions">
      <a className="gov-link" href="#activity">
        View activity log
      </a>
      {isAdmin ? (
        <Link className="ghost-btn" href="/review">
          Open review console
        </Link>
      ) : null}
    </div>
  </section>
);

type HeroTilesProps = {
  tiles: typeof QUICK_TILES;
};

const HeroTiles = ({ tiles }: HeroTilesProps) => (
  <section className="hero-shell__tiles" aria-label="Quick access">
    {tiles.map((tile) => (
      <article key={tile.id} className="hero-tile">
        <div>
          <p className="hero-tile__label">{tile.label}</p>
          <p className="hero-tile__detail">{tile.detail}</p>
        </div>
        <div className="hero-tile__meta">
          {tile.badge ? <span className="hero-tile__badge">{tile.badge}</span> : null}
          <span aria-hidden="true">›</span>
        </div>
      </article>
    ))}
  </section>
);

type LinkedServicesProps = {
  count: number;
  services: readonly string[];
};

const LinkedServices = ({ count, services }: LinkedServicesProps) => (
  <section className="linked-services" aria-label="Linked services">
    <div className="linked-services__header">
      <p className="panel-eyebrow">Linked services ({count})</p>
      <a className="gov-link" href="#services">
        View & link services
      </a>
    </div>
    <div className="linked-grid">
      {services.map((service) => (
        <article key={service} className="linked-card">
          <p className="linked-card__label">Go to</p>
          <p className="linked-card__title">{service}</p>
          <span className="linked-card__chevron" aria-hidden="true">
            ↗
          </span>
        </article>
      ))}
    </div>
  </section>
);
