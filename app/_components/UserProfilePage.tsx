"use client";

import React, { useMemo, useState } from "react";
import { Avtar, Button, Form, Hyperlink, TextArea } from "../../src";

export interface UserProfilePageProps {
  brandName?: string;
  title?: string;
  subtitle?: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  avatarSrc?: string;
  submitLabel?: string;
  loginHref?: string;
  registerHref?: string;
  defaultAbout?: string;
  onSubmitAbout?: (about: string) => void | Promise<void>;
}

export default function UserProfilePage({
  brandName = "Common Component Library",
  title = "Your user page",
  subtitle = "Review your account details and share a short about us description.",
  fullName = "New User",
  email = "user@example.com",
  mobileNumber = "+91 9876543210",
  avatarSrc,
  submitLabel = "Submit about us",
  loginHref = "/login",
  registerHref = "/register",
  defaultAbout = "",
  onSubmitAbout,
}: UserProfilePageProps) {
  const [about, setAbout] = useState(defaultAbout);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const initials = useMemo(() => {
    return (
      fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "U"
    );
  }, [fullName]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    try {
      setIsSubmitting(true);

      if (onSubmitAbout) {
        await onSubmitAbout(about.trim());
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }

      setSuccessMessage("Your about us information has been submitted successfully.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      badge={brandName}
      title={title}
      description={subtitle}
      maxWidth={760}
      shellClassName="bg-[linear-gradient(135deg,var(--color-accent-sky-10)_0%,var(--color-accent-lavender-10)_100%)]"
      onSubmit={handleSubmit}
      actions={
        <div className="mt-1 flex items-center justify-between gap-3 flex-wrap">
          <p className="m-0 text-[13px] leading-5 text-[var(--color-text-secondary)]">
            Need to switch account? <Hyperlink href={loginHref}>Login</Hyperlink> or{" "}
            <Hyperlink href={registerHref}>register</Hyperlink> again.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={!about.trim()}
          >
            {submitLabel}
          </Button>
        </div>
      }
      footer={
        successMessage ? (
          <div className="rounded-xl bg-[var(--color-accent-mint-10)] px-3.5 py-3 text-[13px] leading-5 text-[var(--color-state-success)]">
            {successMessage}
          </div>
        ) : undefined
      }
    >
      <div className="mb-2 grid grid-cols-[auto,1fr] items-center gap-5 max-sm:grid-cols-1">
        <Avtar
          src={avatarSrc}
          alt={fullName}
          size={96}
          icon={<span style={{ fontSize: 28, fontWeight: 700 }}>{initials}</span>}
          backgroundColor="var(--button-primary-default-bg, #2563EB)"
          iconColor="#FFFFFF"
          className="shrink-0"
        />
        <div>
          <p className="m-0 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]">
            {fullName}
          </p>
          <p className="mt-1.5 text-[14px] leading-6 text-[var(--color-text-secondary)]">
            Email: {email}
          </p>
          <p className="mt-1.5 text-[14px] leading-6 text-[var(--color-text-secondary)]">
            Mobile: {mobileNumber}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-[18px] font-bold leading-6 text-[var(--color-text-primary)]">
          About us
        </h2>
        <TextArea
          label="Tell us about yourself"
          placeholder="Write a short introduction, your role, interests, or what you want to build."
          value={about}
          onChange={(value) => {
            setAbout(value);
            setSuccessMessage("");
          }}
          rows={5}
          maxLength={300}
          showCount
          helperText="This text can be used as your profile introduction."
          rounded="5"
        />
      </div>
    </Form>
  );
}
