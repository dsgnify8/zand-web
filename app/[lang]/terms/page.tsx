import type { Metadata } from "next";
import "../privacy/privacy.css";

export const metadata: Metadata = {
  title: "Terms & Conditions — ZAND",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="legal-page">
      <h1>Terms & Conditions</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        Welcome to ZAND. By using our mobile application or website at zandapplication.com,
        you agree to these terms. Please read them carefully.
      </p>

      <h2>Using ZAND</h2>
      <p>
        ZAND provides language learning tools, educational content about Iranian history and
        culture, and a directory of Iranian-owned businesses. You must be at least 13 years old
        to create an account.
      </p>
      <p>
        You are responsible for your account and for keeping your login credentials secure.
        You agree not to use the platform for any unlawful purpose or in any way that could
        harm other users or the service.
      </p>

      <h2>Content</h2>
      <p>
        The educational content, articles, and learning materials on ZAND are created by us
        or our editorial partners. You may not reproduce, distribute, or republish this content
        without our written permission.
      </p>

      <h2>Business listings</h2>
      <p>
        If you submit a business listing, you confirm that you are authorised to represent that
        business and that the information you provide is accurate. We reserve the right to review,
        edit, or remove any listing at our discretion.
      </p>
      <p>
        Business listings are published publicly on both the app and the website. By submitting
        a listing, you consent to this information being visible to all users and indexed by
        search engines.
      </p>

      <h2>User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Post false, misleading, or harmful content</li>
        <li>Harass, abuse, or threaten other users</li>
        <li>Attempt to access other users’ accounts or data</li>
        <li>Use the platform for spam, advertising, or solicitation</li>
        <li>Interfere with the operation of the app or website</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        ZAND, its logo, design, and all original content are the property of ZAND. The Persian
        Mag (TPM) content within the app is provided under a content partnership and remains the
        property of TPM.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your account if you violate these terms. You may delete your
        account at any time through the app or by contacting us.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        ZAND is provided as-is. We do our best to ensure accuracy but do not guarantee that all
        content is error-free. We are not liable for any damages arising from your use of the
        platform.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. We will notify you of significant changes
        through the app or by email.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>.
      </p>
    </div>
  );
}
