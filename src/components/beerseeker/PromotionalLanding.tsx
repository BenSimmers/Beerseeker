'use client';

import React, { useState } from 'react';
import { Compass, MapPin, Download, Users, X } from 'lucide-react';

const SITE_CONFIG = {
  nav: {
    logo: {
      light: 'beer',
      dark: 'seeker',
    },
    links: [
      { href: '#about', label: 'Beerseeker' },
      { href: '#explore', label: 'Browse' },
      { href: '#compass', label: 'Compass' },
      { href: '#hello', label: 'About Us' },
      { href: '#download', label: 'Download' },
    ],
  },
  hero: {
    title: 'Your compass for travel',
    subtitle: 'Explore new places on your journey. Find amazing pubs, bars, breweries and wine bars anywhere you go. Point the phone, follow the needle, arrive thirsty.',
    cta: 'Download Now',
  },
  sections: [
     {
      id: 'about',
      icon: Compass,
      title: 'Beerseeker',
      body: [
        'Your travel companion for discovering great drinks anywhere.',
        "Whether you're exploring a new city, on a road trip, or just wandering your local area, Beerseeker guides you to the best pubs, bars, breweries and wine bars nearby.",
      ],
    },

    {
      id: 'hello',
      icon: Users,
      title: 'About Us',
      body: [
        "Hi, we're the creators of the beer seeker app",
        "We're massive history buffs. One fact we love was that in the Middle Ages most people couldn't read, so they navigated by landmarks instead - a sign had to be vivid enough for anyone to recognise at a glance, which is why England still has The Blue Boar, The White Hart and The King's Head.",
        'A habit the Romans started, hanging vine leaves outside a tavern to show it sold wine.',
        "That's where Beer Seeker came from. We built it as a return to true form for travelling and looking for pubs and places to eat and drink",
      ],
    },
   
    {
      id: 'explore',
      icon: MapPin,
      title: 'Explore & Browse',
      body: [
        'Find pubs, bars, sports bars, breweries, wine bars, bottle shops and bottle-os nearby - all sorted by distance.',
        'Filter by venue type or search by name. View ratings, opening hours, phone numbers and directions for every spot.',
      ],
    },
    {
      id: 'compass',
      icon: Compass,
      title: 'The Compass',
      body: [
        "The needle reads your device's magnetometer and swings to the closest pub, bar, brewery, wine bar or bottle shop. It turns as you move, always pointing to the nearest drink.",
        'Tap the map underneath for a closer look, or switch between the Modern and Classic faces in Settings.',
      ],
    },
  ],
  download: {
    title: 'Get Started',
    subtitle: 'Download Beerseeker on iOS or Android and start your journey.',
    buttons: [
      { label: 'App Store', href: 'https://apps.apple.com/au/app/beer-seeker/id6776191099', variant: 'light' },
      { label: 'Google Play', href: '#', variant: 'amber' },
    ],
  },
  footer: {
    copyright: '© 2026 Beer Seeker. All rights reserved.',
    links: [
      { label: 'Privacy', href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md' },
      { label: 'Terms', href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md' },
      { label: 'Contact', href: 'mailto:bej1380@gmail.com' },
    ],
  },
};

export const PromotionalLanding = () => {
  const [showAndroidDialog, setShowAndroidDialog] = useState(false);

  const handleGooglePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAndroidDialog(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-amber-500/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-amber-400">{SITE_CONFIG.nav.logo.light}</span>
            <span>{SITE_CONFIG.nav.logo.dark}</span>
          </div>
          <div className="flex gap-6 text-sm">
            {SITE_CONFIG.nav.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-amber-400 transition">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <Compass className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            {SITE_CONFIG.hero.title}
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {SITE_CONFIG.hero.subtitle}
          </p>
          <a
            href="#download"
            className="inline-block bg-amber-400 text-black px-8 py-3 rounded font-semibold hover:bg-amber-300 transition"
          >
            {SITE_CONFIG.hero.cta}
          </a>
        </div>
      </section>

      {/* Content Sections */}
      {SITE_CONFIG.sections.map((section) => {
        const IconComponent = section.icon;
        return (
          <section key={section.id} id={section.id} className="px-6 py-24 border-b border-amber-500/20">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full border border-amber-500/40 bg-gray-900/50 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center mb-6">{section.title}</h2>
              <div className="flex justify-center mb-8">
                <div className="w-11 h-0.5 bg-amber-500/40" />
              </div>
              <div className="space-y-4 text-center">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-gray-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Download CTA */}
      <section id="download" className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            {SITE_CONFIG.download.title}
          </h2>
          <p className="text-gray-400 mb-8">
            {SITE_CONFIG.download.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {SITE_CONFIG.download.buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                onClick={button.label === 'Google Play' ? handleGooglePlayClick : undefined}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded font-semibold transition ${
                  button.variant === 'light'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-amber-400 text-black hover:bg-amber-300'
                }`}
              >
                <Download className="w-5 h-5" />
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              {SITE_CONFIG.footer.copyright}
            </div>
            <div className="flex gap-6 text-sm">
              {SITE_CONFIG.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-amber-400 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Android Development Dialog */}
      {showAndroidDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-amber-500/30 rounded-lg max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-amber-400">Android Coming Soon</h3>
              <button
                onClick={() => setShowAndroidDialog(false)}
                className="text-gray-400 hover:text-amber-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                We're actively developing Beerseeker for Android and would love your help with testing!
              </p>

              <p className="text-gray-400">
                If you're interested in becoming a beta tester, please reach out to us:
              </p>

              <div className="bg-gray-800 border border-amber-500/20 rounded p-4">
                <p className="text-amber-400 font-semibold break-all">
                  bej1380@gmail.com
                </p>
              </div>

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
