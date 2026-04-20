"use client";

import { useRouter } from "next/navigation";
import RegisterPage from "../_components/RegisterPage";

export default function RegisterRoutePage() {
  const router = useRouter();

  return (
    <RegisterPage
      brandName="UI Common Components"
      title="Create your project account"
      subtitle="Register with your name, email, and password to start using your Next.js application."
      loginHref="/login"
      onSubmit={async (credentials) => {
        const params = new URLSearchParams({
          name: credentials.fullName,
          email: credentials.email,
          mobile: credentials.mobileNumber,
        });

        router.push(`/user?${params.toString()}`);
      }}
    />
  );
}
