import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { getReleases } from '@/components/beerseeker/releases';
import { SITE_CONFIG } from '@/components/beerseeker/siteConfig';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    "What's new in Beer Seeker, plus the latest Android preview build to try.",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

const ChangelogPage = async () => {
  const releases = await getReleases();
  const latestApk = releases.find((release) => release.apkUrl);

  return (
    <div className="beer-site">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Beer Seeker home">
          beer<span>seeker</span>
        </Link>
        <Link className="header-download" href="/#download">
          Get the app <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </header>
      <main id="main-content" className="wrap changelog">
        <section className="changelog-intro" aria-labelledby="changelog-title">
          <p className="eyebrow">Notes from the road</p>
          <h1 id="changelog-title">
            What’s <em>new.</em>
          </h1>
          <p className="hero-description">
            Every build of Beer Seeker, newest first. Android preview builds can
            be installed straight onto your phone.
          </p>
          {latestApk && (
            <div className="preview-download">
              <a className="button" href={latestApk.apkUrl!}>
                Download Android preview {latestApk.name}
                <ArrowDown size={19} aria-hidden="true" />
              </a>
              <p className="preview-note">
                {latestApk.apkSize !== null &&
                  `${formatSize(latestApk.apkSize)} APK. `}
                Open the file on your Android phone and allow installs from your
                browser when asked. Preview builds are for testing and may be
                rough around the edges.
              </p>
            </div>
          )}
        </section>

        {releases.length === 0 ? (
          <p className="changelog-empty">
            No builds published yet. Check back soon.
          </p>
        ) : (
          <ol className="release-list">
            {releases.map((release) => (
              <li className="release" key={release.id}>
                <div className="release-meta small-label">
                  <span>{formatDate(release.publishedAt)}</span>
                  {release.prerelease && <span>Preview</span>}
                </div>
                <div>
                  <h2>{release.name}</h2>
                  {release.notesHtml ? (
                    <div
                      className="release-notes"
                      dangerouslySetInnerHTML={{ __html: release.notesHtml }}
                    />
                  ) : (
                    <p className="release-notes">Bug fixes and improvements.</p>
                  )}
                  {release.apkUrl && (
                    <a className="text-link" href={release.apkUrl}>
                      Download APK <ArrowDown size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
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
    </div>
  );
};

export default ChangelogPage;
