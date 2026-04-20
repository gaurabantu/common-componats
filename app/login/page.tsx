import LoginPage from "../_components/LoginPage";

export default function LoginRoutePage() {
  return (
    <LoginPage
      brandName="UI Common Components"
      title="Project login"
      subtitle="Use your company email and password to securely sign in to your Next.js application."
      forgotPasswordHref="#"
      registerHref="/register"
    />
  );
}
