"use client";

import React, { useMemo, useState } from "react";
import { Button, CheckBox, Form, Hyperlink, Input } from "../../src";

export interface RegisterCredentials {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface RegisterPageProps {
  brandName?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  loginPrompt?: string;
  loginLabel?: string;
  loginHref?: string;
  acceptTermsLabel?: string;
  defaultEmail?: string;
  defaultFullName?: string;
  defaultMobileNumber?: string;
  onSubmit?: (credentials: RegisterCredentials) => void | Promise<void>;
}

export default function RegisterPage({
  brandName = "Common Component Library",
  title = "Create your account",
  subtitle = "Register with your details to start using your Next.js project with this component library.",
  submitLabel = "Register",
  loginPrompt = "Already have an account?",
  loginLabel = "Sign in",
  loginHref = "/login",
  acceptTermsLabel = "I agree to the terms and privacy policy",
  defaultEmail = "",
  defaultFullName = "",
  defaultMobileNumber = "",
  onSubmit,
}: RegisterPageProps) {
  const [fullName, setFullName] = useState(defaultFullName);
  const [email, setEmail] = useState(defaultEmail);
  const [mobileNumber, setMobileNumber] = useState(defaultMobileNumber);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);
  const [mobileValidationError, setMobileValidationError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fullNameError = hasAttemptedSubmit && !fullName.trim() ? "Full name is required." : null;
  const emailRequiredError = hasAttemptedSubmit && !email.trim() ? "Email is required." : null;
  const mobileRequiredError =
    hasAttemptedSubmit && !mobileNumber.trim() ? "Mobile number is required." : null;
  const passwordError = hasAttemptedSubmit && !password.trim() ? "Password is required." : null;
  const confirmPasswordError =
    hasAttemptedSubmit && !confirmPassword.trim()
      ? "Please confirm your password."
      : hasAttemptedSubmit && password !== confirmPassword
        ? "Passwords do not match."
        : null;
  const termsError =
    hasAttemptedSubmit && !acceptTerms ? "Please accept the terms to continue." : null;

  const emailError = emailRequiredError ?? emailValidationError;
  const mobileError = mobileRequiredError ?? mobileValidationError;

  const canSubmit = useMemo(() => {
    return Boolean(
      fullName.trim() &&
        email.trim() &&
        mobileNumber.trim() &&
        password.trim() &&
        confirmPassword.trim() &&
        password === confirmPassword &&
        acceptTerms &&
        !emailValidationError &&
        !mobileValidationError
    );
  }, [
    acceptTerms,
    confirmPassword,
    email,
    emailValidationError,
    fullName,
    mobileNumber,
    mobileValidationError,
    password,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    setSuccessMessage("");

    if (!canSubmit) return;

    const credentials: RegisterCredentials = {
      fullName: fullName.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      password,
      confirmPassword,
      acceptTerms,
    };

    try {
      setIsSubmitting(true);

      if (onSubmit) {
        await onSubmit(credentials);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }

      setSuccessMessage(`Account created successfully for ${credentials.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      badge={brandName}
      title={title}
      description={subtitle}
      maxWidth={520}
      shellClassName="bg-[linear-gradient(135deg,var(--color-accent-lavender-10)_0%,var(--color-accent-sky-10)_50%,var(--color-bg-page)_100%)]"
      onSubmit={handleSubmit}
      actions={
        <>
          <div>
            <CheckBox
              label={acceptTermsLabel}
              name="acceptTerms"
              value="acceptTerms"
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
            />
            {termsError && (
              <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
                {termsError}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={!canSubmit && hasAttemptedSubmit}
          >
            {submitLabel}
          </Button>
        </>
      }
      footer={
        <>
          <p className="m-0 text-[13px] leading-5 text-[var(--color-text-secondary)]">
            This page uses the reusable form shell plus your field components.
          </p>
          <p className="m-0 text-[13px] leading-5 text-[var(--color-text-secondary)]">
            {loginPrompt} <Hyperlink href={loginHref}>{loginLabel}</Hyperlink>
          </p>
          {successMessage && (
            <div className="rounded-xl bg-[var(--color-accent-mint-10)] px-3.5 py-3 text-[13px] leading-5 text-[var(--color-state-success)]">
              {successMessage}
            </div>
          )}
        </>
      }
    >
      <div>
        <Input
          label="Full name"
          placeholder="Enter your full name"
          validation="name"
          value={fullName}
          onChange={(value) => {
            setFullName(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          allowClear
          fullWidth
          rounded="5"
          status={fullNameError ? "error" : undefined}
        />
        {fullNameError && (
          <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
            {fullNameError}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Email address"
          placeholder="name@example.com"
          type="email"
          validation="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          onErrorChange={setEmailValidationError}
          allowClear
          fullWidth
          rounded="5"
          status={emailError ? "error" : undefined}
        />
        {emailRequiredError && (
          <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
            {emailRequiredError}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Mobile number"
          placeholder="Enter your mobile number"
          type="tel"
          validation="mobile"
          value={mobileNumber}
          onChange={(value) => {
            setMobileNumber(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          onErrorChange={setMobileValidationError}
          allowClear
          fullWidth
          rounded="5"
          status={mobileError ? "error" : undefined}
        />
        {mobileRequiredError && (
          <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
            {mobileRequiredError}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Password"
          placeholder="Create a password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          showToggleIcon
          fullWidth
          rounded="5"
          status={passwordError ? "error" : undefined}
        />
        {passwordError && (
          <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
            {passwordError}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Confirm password"
          placeholder="Re-enter your password"
          type="password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          showToggleIcon
          fullWidth
          rounded="5"
          status={confirmPasswordError ? "error" : undefined}
        />
        {confirmPasswordError && (
          <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-state-error)]">
            {confirmPasswordError}
          </p>
        )}
      </div>
    </Form>
  );
}
