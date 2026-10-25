'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Compass, X } from 'lucide-react';
import { AndroidBetaForm } from './AndroidBetaForm';
import { SITE_CONFIG, type Feature } from './siteConfig';

const FeatureItem = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <li className="feature-item">
      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      <div>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </div>
    </li>
  );
};

const CompassIllustration = () => (
  <figure
    className="compass-plate"
    aria-label="Illustration of a compass pointing towards the pub"
  >
    <div className="plate-caption">
      <span>A little less scrolling.</span>
      <span>A little more wandering.</span>
    </div>
    <div className="compass-dial" aria-hidden="true">
      <span className="direction north">N</span>
      <span className="direction east">E</span>
      <span className="direction south">S</span>
      <span className="direction west">W</span>
      <div className="dial-inner" />
      <div className="dial-cross horizontal" />
      <div className="dial-cross vertical" />
      <div className="needle">
        <div />
        <div />
      </div>
      <div className="needle-pin" />
      <span className="dial-wordmark">BEER SEEKER</span>
    </div>
    <figcaption>
      <span className="small-label">Your next stop</span>
      <span className="pub-caption">
        Your next pub.
        <br />
        <em>This way.</em>
      </span>
      <span className="plate-footnote">
        Pubs · Bars · Breweries · Good company
      </span>
    </figcaption>
  </figure>
);

export const PromotionalLanding = () => {
  const [showAndroidDialog, setShowAndroidDialog] = useState(false);
  const sections = SITE_CONFIG.sections.filter(
    (section) => !['about', 'hello'].includes(section.id),
  );
  return (
    <div className="beer-site">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Beer Seeker home">
          beer<span>seeker</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#explore">The app</a>
          <a href="#groups">Pub crawls</a>
          <a href="#hello">Our story</a>
        </nav>
        <a className="header-download" href="#download">
          Get the app <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>
      <main id="main-content">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              For the pub. For the people. For the wander.
            </p>
            <h1 id="hero-title">
              There’s a good
              <br />
              pub <em>that way.</em>
            </h1>
            <p className="hero-description">
              In a new city or just around the corner. Find a pub, round up your
              mates, and let the compass take you there.
            </p>
            <a className="button" href={SITE_CONFIG.download.buttons[0].href}>
              Get Beer Seeker for iOS{' '}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <button
              className="text-link android-link"
              onClick={() => setShowAndroidDialog(true)}
            >
              On Android? Join the beta list.
            </button>
          </div>
          <CompassIllustration />
          <a className="hero-scroll small-label" href="#explore">
            A look around <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>
        <div className="venue-strip" aria-hidden="true">
          <span>A local you haven’t met yet.</span>
          <span className="venue-separator">✳</span>
          <span>The next round’s out there.</span>
          <span className="venue-separator">✳</span>
          <span>Follow your thirst.</span>
          <span className="venue-separator">✳</span>
        </div>
        <div className="wrap chapters">
          {sections.map((section, index) => (
            <section
              className={`chapter chapter-${section.id}`}
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <div className="chapter-label small-label">
                <span>0{index + 1}</span>
                <span>
                  {
                    (
                      {
                        explore: 'Find your local',
                        compass: 'Take a bearing',
                        friends: 'Bring your mates',
                        groups: 'Make a night of it',
                      } as Record<string, string>
                    )[section.id]
                  }
                </span>
              </div>
              <div className="chapter-content">
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                <div className="chapter-body">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {section.highlights && (
                  <ul className="feature-list">
                    {section.highlights.map((item) => (
                      <FeatureItem key={item.title} feature={item} />
                    ))}
                  </ul>
                )}
                {section.id === 'compass' && (
                  <p className="margin-note">
                    <Compass size={24} strokeWidth={1} aria-hidden="true" />
                    Pick a place. Follow the needle. See where you end up.
                  </p>
                )}
              </div>
            </section>
          ))}
          <section
            id="features"
            className="essentials"
            aria-labelledby="features-heading"
          >
            <div>
              <p className="small-label">A few things for the road</p>
              <h2 id="features-heading">
                Packed for
                <br />
                <em>the journey.</em>
              </h2>
            </div>
            <ul className="feature-list">
              {SITE_CONFIG.features.items.map((item) => (
                <FeatureItem key={item.title} feature={item} />
              ))}
            </ul>
          </section>
          <section id="hello" className="story" aria-labelledby="story-heading">
            <p className="small-label">A note from the makers</p>
            <h2 id="story-heading">
              It started with
              <br />a pub sign.
            </h2>
            <div>
              <p>
                We’re Ben, Josh and Sam. We’re massive history buffs, and we’ve
                always loved the way travellers found an inn before street names
                and smartphones: look for the sign.
              </p>
              <p>
                The White Hart. The Blue Boar. The King’s Head. A landmark you
                could recognise, even if you couldn’t read.
              </p>
              <p>
                Beer Seeker is our take on that idea. A small app to help you
                find a place, take a walk, and meet your company.
              </p>
            </div>
          </section>
        </div>
        <section
          id="download"
          className="download-section"
          aria-labelledby="download-heading"
        >
          <div className="wrap download-inner">
            <div>
              <p className="small-label">Your next local is waiting</p>
              <h2 id="download-heading">Shall we?</h2>
            </div>
            <div>
              <a
                className="button button-paper"
                href={SITE_CONFIG.download.buttons[0].href}
              >
                Download for iOS <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <button
                className="text-link"
                onClick={() => setShowAndroidDialog(true)}
              >
                Android beta signup{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <Link className="wordmark" href="/">
          beer<span>seeker</span>
        </Link>
        <p>{SITE_CONFIG.footer.copyright}</p>
        <nav aria-label="Footer">
          {SITE_CONFIG.footer.links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
      {/* Android Development Dialog */}
      {showAndroidDialog && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="presentation"
        >
          <div
            className="bg-gray-900 border border-amber-500/30 rounded-lg max-w-md w-full p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="android-dialog-title"
            aria-describedby="android-dialog-description"
          >
            <div className="flex justify-between items-start mb-4">
              <h3
                id="android-dialog-title"
                className="text-xl font-bold text-amber-400"
              >
                Android Coming Soon
              </h3>
              <button
                onClick={() => setShowAndroidDialog(false)}
                className="text-gray-400 hover:text-amber-400 transition focus-visible:outline-2 focus-visible:outline-amber-400"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4" id="android-dialog-description">
              <p className="text-gray-300">
                We&apos;re actively developing Beerseeker for Android and would
                love your help with testing!
              </p>

              <p className="text-gray-400">
                If you&apos;re interested in becoming a beta tester, leave your
                email below and we&apos;ll get in touch:
              </p>

              <AndroidBetaForm />

              <p className="text-sm text-gray-400">
                In the meantime, grab the iOS version on the App Store to start
                exploring!
              </p>
            </div>

            <button
              onClick={() => setShowAndroidDialog(false)}
              className="w-full mt-6 bg-amber-400 text-black px-6 py-2 rounded font-semibold hover:bg-amber-300 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
