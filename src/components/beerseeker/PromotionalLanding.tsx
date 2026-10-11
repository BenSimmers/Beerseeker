'use client';

import React, { useState } from 'react';
import { Compass, Download, X } from 'lucide-react';
import { AndroidBetaForm } from './AndroidBetaForm';
import { SITE_CONFIG, type Feature } from './siteConfig';

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const IconComponent = feature.icon;
  return (
    <li className="rounded-lg border border-amber-500/20 bg-gray-900/50 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-3">
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="text-base sm:text-lg font-semibold">{feature.title}</h3>
      </div>
      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.text}</p>
    </li>
  );
};

export const PromotionalLanding = () => {
  const [showAndroidDialog, setShowAndroidDialog] = useState(false);

  const handleGooglePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAndroidDialog(true);
  };

  return (
    <div className="min-h-screen bg-black text-white" id="main-content">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-amber-400 focus:text-black focus:p-2 focus:z-50 focus:font-semibold"
      >
        Skip to main content
      </a>

      <nav className="border-b border-amber-500/20 px-4 sm:px-6 py-4" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight shrink-0 hover:opacity-80 transition focus-visible:rounded"
            aria-label="Beerseeker - Home"
          >
            <span className="text-amber-400">{SITE_CONFIG.nav.logo.light}</span>
            <span>{SITE_CONFIG.nav.logo.dark}</span>
          </a>
          <div className="hidden md:flex gap-4 lg:gap-6 text-xs sm:text-sm">
            {SITE_CONFIG.nav.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-amber-400 transition whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="px-4 sm:px-6 py-16 sm:py-24 border-b border-amber-500/20"
        aria-label="Hero section - Your compass for travel"
        role="region"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block" aria-hidden="true">
            <Compass className="w-12 sm:w-16 h-12 sm:h-16 text-amber-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            {SITE_CONFIG.hero.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {SITE_CONFIG.hero.subtitle}
          </p>
          <a
            href="#download"
            className="inline-block bg-amber-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold hover:bg-amber-300 transition text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label="Download Beerseeker app now"
          >
            {SITE_CONFIG.hero.cta}
          </a>
        </div>
      </section>

      {/* Content Sections */}
      {SITE_CONFIG.sections.map((section) => {
        const IconComponent = section.icon;
        return (
          <section
            key={section.id}
            id={section.id}
            className="px-4 sm:px-6 py-16 sm:py-24 border-b border-amber-500/20"
            aria-labelledby={`${section.id}-heading`}
            role="region"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6 sm:mb-8" aria-hidden="true">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-amber-500/40 bg-gray-900/50 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                </div>
              </div>
              <h2
                id={`${section.id}-heading`}
                className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 px-2"
              >
                {section.title}
              </h2>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-11 h-0.5 bg-amber-500/40" />
              </div>
              <div className="space-y-3 sm:space-y-4 text-center px-2">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.highlights && (
                <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {section.highlights.map((item) => (
                    <FeatureCard key={item.title} feature={item} />
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      {/* Feature Grid */}
      <section
        id={SITE_CONFIG.features.id}
        className="px-4 sm:px-6 py-16 sm:py-24 border-b border-amber-500/20"
        aria-labelledby={`${SITE_CONFIG.features.id}-heading`}
        role="region"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            id={`${SITE_CONFIG.features.id}-heading`}
            className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 px-2"
          >
            {SITE_CONFIG.features.title}
          </h2>
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-11 h-0.5 bg-amber-500/40" />
          </div>
          <p className="text-sm sm:text-base text-gray-400 text-center mb-10 sm:mb-12 px-2">
            {SITE_CONFIG.features.subtitle}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SITE_CONFIG.features.items.map((item) => (
              <FeatureCard key={item.title} feature={item} />
            ))}
          </ul>
        </div>
      </section>

      {/* Download CTA */}
      <section
        id="download"
        className="px-4 sm:px-6 py-16 sm:py-24"
        aria-labelledby="download-heading"
        role="region"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="download-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6 px-2"
          >
            {SITE_CONFIG.download.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">
            {SITE_CONFIG.download.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            {SITE_CONFIG.download.buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                onClick={button.label === 'Google Play' ? handleGooglePlayClick : undefined}
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold transition text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  button.variant === 'light'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-amber-400 text-black hover:bg-amber-300'
                }`}
                aria-label={
                  button.label === 'App Store'
                    ? 'Download Beerseeker from Apple App Store'
                    : 'Download Beerseeker from Google Play Store'
                }
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-amber-500/20 px-4 sm:px-6 py-8"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-500">
              {SITE_CONFIG.footer.copyright}
            </div>
            <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm" aria-label="Footer">
              {SITE_CONFIG.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-amber-400 transition focus-visible:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
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
                We're actively developing Beerseeker for Android and would love your help with testing!
              </p>

              <p className="text-gray-400">
                If you're interested in becoming a beta tester, leave your email below and we'll get in touch:
              </p>

              <AndroidBetaForm />

              <p className="text-sm text-gray-400">
                In the meantime, grab the iOS version on the App Store to start exploring!
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
