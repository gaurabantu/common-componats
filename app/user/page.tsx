import UserProfilePage from "../_components/UserProfilePage";

type UserPageProps = {
  searchParams?: Promise<{
    name?: string;
    email?: string;
    mobile?: string;
  }>;
};

export default async function UserRoutePage({ searchParams }: UserPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <UserProfilePage
      brandName="UI Common Components"
      title="User profile"
      subtitle="Your account has been created. Add a short about us introduction below."
      fullName={params.name || "New User"}
      email={params.email || "user@example.com"}
      mobileNumber={params.mobile || "+91 9876543210"}
      loginHref="/login"
      registerHref="/register"
    />
  );
}
