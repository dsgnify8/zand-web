import type { Metadata } from "next";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy Policy — ZAND",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        ZAND (“we,” “our,” or “us”) operates the ZAND mobile
        application and the website at zandapplication.com. This Privacy Policy explains what
        information we collect, how we use it, and your choices.
      </p>

      <h2>Information we collect</h2>
      <p>When you create an account, we collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your phone number (if provided)</li>
      </ul>

      <p>When you use the app, we collect:</p>
      <ul>
        <li>Your activity within the app (lessons completed, articles viewed, businesses saved)</li>
        <li>Your location, only if you choose to share it (to show nearby businesses)</li>
        <li>Device information and app usage analytics to improve the experience</li>
      </ul>

      <p>If you submit a business listing, we collect:</p>
      <ul>
        <li>Business name, description, category, and contact information</li>
        <li>Business address and location coordinates</li>
        <li>Photos you upload</li>
        <li>This information is published on the app and website so that users can discover your business</li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and maintain the ZAND app and website</li>
        <li>Personalise your learning experience and track your progress</li>
        <li>Show you relevant businesses near your location (when enabled)</li>
        <li>Send you notifications about your account or learning progress (when enabled)</li>
        <li>Improve and develop new features</li>
      </ul>

      <h2>Information sharing</h2>
      <p>
        We do not sell your personal information. We may share information with service providers
        who help us operate the app (such as hosting and analytics), and we will share information
        if required by law.
      </p>

      <h2>Data storage</h2>
      <p>
        Your data is stored securely using Supabase, with servers located in the European Union.
        We retain your information for as long as your account is active or as needed to provide
        you with our services.
      </p>

      <h2>Your rights</h2>
      <p>You can:</p>
      <ul>
        <li>Access, update, or delete your account information at any time through the app</li>
        <li>Disable location sharing in your device settings</li>
        <li>Request deletion of your account and associated data by contacting us</li>
      </ul>

      <h2>Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at{" "}
        <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>.
      </p>
    </div>
  );
}
