'use client';

import React, { useState } from 'react';

// Set NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local (see .env.example).
// Must be inlined at build time, so reference process.env.<NAME> literally.
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const AndroidBetaForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        setStatus('success');
        return;
      }

      const data = await response.json().catch(() => null);
      setError(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (!FORM_ID) {
    return (
      <div className="bg-gray-800 border border-amber-500/20 rounded p-4 text-center">
        <p className="text-sm text-gray-400">
          The signup form is unavailable right now. Please try again later.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        className="bg-gray-800 border border-amber-500/20 rounded p-4 text-center"
        role="status"
      >
        <p className="text-amber-400 font-semibold mb-1">Thanks for signing up!</p>
        <p className="text-sm text-gray-400">
          We&apos;ll be in touch when the Android beta is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate={false}>
      <div>
        <label htmlFor="beta-email" className="block text-sm text-gray-400 mb-1">
          Email address
        </label>
        <input
          id="beta-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === 'submitting'}
          className="w-full bg-gray-800 border border-amber-500/20 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-amber-400 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="beta-message" className="block text-sm text-gray-400 mb-1">
          Message <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          id="beta-message"
          name="message"
          rows={3}
          placeholder="Tell us about your device or anything else."
          disabled={status === 'submitting'}
          className="w-full bg-gray-800 border border-amber-500/20 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-amber-400 disabled:opacity-60 resize-none"
        />
      </div>

      {/* Subject line shown in the Formspree notification email */}
      <input type="hidden" name="_subject" value="Beerseeker Android beta tester signup" />

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-amber-400 text-black px-6 py-2 rounded font-semibold hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {status === 'submitting' ? 'Sending...' : 'Sign me up'}
      </button>
    </form>
  );
};
