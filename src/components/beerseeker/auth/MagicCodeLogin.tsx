'use client';

import React from "react";
import { db } from "@/lib/db";

export const MagicCodeLogin = () => {
  const [sentEmail, setSentEmail] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const codeRef = React.useRef<HTMLInputElement | null>(null);

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value?.trim();
    if (!email) {
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await db.auth.sendMagicCode({ email });
      setSentEmail(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send code';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sentEmail) {
      return;
    }
    const code = codeRef.current?.value?.trim();
    if (!code) {
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await db.auth.signInWithMagicCode({ email: sentEmail, code });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      setError(message);
      if (codeRef.current) {
        codeRef.current.value = '';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="panel-eyebrow">Secure sign in</p>
      <h2 className="panel-title">Use a one-time access code</h2>
      {!sentEmail ? (
        <form className="form-stack" onSubmit={handleSendCode}>
          <label className="form-field">
            <span>Work email</span>
            <input
              ref={emailRef}
              type="email"
              required
              placeholder="you@govmail.au"
              className="form-input"
            />
          </label>
          <button type="submit" className="gov-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending' : 'Send access code'}
          </button>
          {error ? <p className="form-error">{error}</p> : null}
        </form>
      ) : (
        <form className="form-stack" onSubmit={handleVerify}>
          <p className="form-hint">
            Code sent to <strong>{sentEmail}</strong>. Enter it below.
          </p>
          <label className="form-field">
            <span>6-digit code</span>
            <input ref={codeRef} type="text" required placeholder="123456" className="form-input" />
          </label>
          <button type="submit" className="gov-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying' : 'Verify & continue'}
          </button>
          <button type="button" className="gov-link" onClick={() => setSentEmail(null)}>
            Use a different email
          </button>
          {error ? <p className="form-error">{error}</p> : null}
        </form>
      )}
    </div>
  );
};
