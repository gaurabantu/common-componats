"use client";

import React, { useMemo, useState } from "react";
import { Button, CheckBox, Form, Hyperlink, Input, TextView } from "../../src";

/** Login screen: layout and copy use UX Governance tokens (spacing 8px grid, radii, semantic colours). */
export interface LoginPageProps {
  brandName?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  rememberPasswordLabel?: string;
  forgotPasswordLabel?: string;
  forgotPasswordHref?: string;
  registerPrompt?: string;
  registerLabel?: string;
  registerHref?: string;
  defaultEmail?: string;
  defaultRememberPassword?: boolean;
  onSubmit?: (credentials: {
    email: string;
    password: string;
    rememberPassword: boolean;
  }) => void | Promise<void>;
}

const shellBackgroundClass =
  "bg-[linear-gradient(135deg,var(--color-accent-sky-10)_0%,var(--color-accent-mint-10)_42%,var(--color-bg-page)_100%)]";

export default function LoginPage({
  brandName = "Common Component Library",
  title = "Welcome back",
  subtitle = "Sign in with your email and password to access your project dashboard.",
  submitLabel = "Sign in",
  rememberPasswordLabel = "Save password",
  forgotPasswordLabel = "Forgot password?",
  forgotPasswordHref = "#",
  registerPrompt = "Don't have an account?",
  registerLabel = "Register",
  registerHref = "/register",
  defaultEmail = "",
  defaultRememberPassword = false,
  onSubmit,
}: LoginPageProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(defaultRememberPassword);
  const [emailValidationError, setEmailValidationError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailRequiredError = hasAttemptedSubmit && !email.trim() ? "Email is required." : null;
  const passwordRequiredError =
    hasAttemptedSubmit && !password.trim() ? "Password is required." : null;
  const emailError = emailRequiredError ?? emailValidationError;

  const canSubmit = useMemo(() => {
    return Boolean(email.trim() && password.trim() && !emailValidationError);
  }, [email, password, emailValidationError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    setSuccessMessage("");

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      const credentials = {
        email: email.trim(),
        password,
        rememberPassword,
      };

      if (onSubmit) {
        await onSubmit(credentials);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }

      setSuccessMessage(`Signed in successfully as ${credentials.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const successBannerStyle: React.CSSProperties = {
    borderRadius: "var(--radius-card)",
    padding: "var(--space-2) var(--space-3)",
    background: "var(--color-accent-mint-10)",
    border: "1px solid var(--color-border-default)",
    borderLeftWidth: "var(--space-1)",
    borderLeftColor: "var(--color-state-success)",
    borderLeftStyle: "solid",
  };

  return (
    <Form
      badge={brandName}
      title={title}
      description={subtitle}
      maxWidth={464}
      gap={16}
      shellClassName={shellBackgroundClass}
      onSubmit={handleSubmit}
      actions={
        <>
          <div
            className="flex min-h-[44px] flex-wrap items-center justify-between gap-[var(--space-2)]"
            style={{ rowGap: "var(--space-2)" }}
          >
            <CheckBox
              label={rememberPasswordLabel}
              name="rememberPassword"
              value="rememberPassword"
              checked={rememberPassword}
              onChange={(event) => setRememberPassword(event.target.checked)}
            />
            <Hyperlink href={forgotPasswordHref} className="inline-flex min-h-[44px] items-center">
              {forgotPasswordLabel}
            </Hyperlink>
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
          <TextView as="p" variant="secondary" color="secondary" className="m-0">
            This page is composed from reusable library components.
          </TextView>
          <TextView as="p" variant="secondary" color="secondary" className="m-0">
            {registerPrompt}{" "}
            <Hyperlink href={registerHref}>{registerLabel}</Hyperlink>
          </TextView>
          {successMessage && (
            <div role="status" aria-live="polite" style={successBannerStyle}>
              <TextView
                as="p"
                variant="secondary"
                color="success"
                fontWeight="semibold"
                className="m-0"
              >
                {successMessage}
              </TextView>
            </div>
          )}
        </>
      }
    >
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
          <TextView as="p" variant="small" color="error" className="mt-[var(--space-2)] m-0">
            {emailRequiredError}
          </TextView>
        )}
      </div>

      <div>
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (hasAttemptedSubmit) setSuccessMessage("");
          }}
          showToggleIcon
          fullWidth
          rounded="5"
          status={passwordRequiredError ? "error" : undefined}
        />
        {passwordRequiredError && (
          <TextView as="p" variant="small" color="error" className="mt-[var(--space-2)] m-0">
            {passwordRequiredError}
          </TextView>
        )}
      </div>
    </Form>
  );
}
