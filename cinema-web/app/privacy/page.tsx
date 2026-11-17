// app/privacy/page.tsx
// Privacy Policy — template content, edit before launch

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

export const metadata = { title: "Privacy Policy — MOVIEBOOK" };

const sections: LegalSection[] = [
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We collect only what we need to run the service:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <span className="text-white/80">Account details:</span> your name, email address, phone
            number and password (stored hashed, never in plain text).
          </li>
          <li>
            <span className="text-white/80">Booking details:</span> movies, cinemas, showtimes and
            seats you book.
          </li>
          <li>
            <span className="text-white/80">Payment information:</span> handled by our payment
            provider. We do not store full card numbers.
          </li>
          <li>
            <span className="text-white/80">Usage data:</span> device, browser and pages visited, to
            keep the site working and improve it.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>To create your account and process bookings.</li>
        <li>To send confirmations, reminders and important service messages.</li>
        <li>To prevent fraud and keep the platform secure.</li>
        <li>To improve our features and fix problems.</li>
      </ul>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>We do not sell your personal data. We share it only with:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Cinemas, so they can honor your booking.</li>
          <li>Payment and email providers that help us run the service.</li>
          <li>Authorities, when required by law.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        We use cookies to keep you signed in, remember your preferences and understand how the site
        is used. You can block cookies in your browser, but parts of the site may stop working.
      </p>
    ),
  },
  {
    heading: "How long we keep your data",
    body: (
      <p>
        We keep your account and booking history while your account is active. If you delete your
        account, we remove or anonymize your personal data within 30 days, except where we must
        keep records by law.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You can ask to access, correct or delete your personal data, or to opt out of marketing
        emails at any time. Contact us using the details below and we will respond promptly.
      </p>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        We use encryption, hashed passwords and access controls to protect your data. No system is
        completely secure, so please use a strong, unique password.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        MOVIEBOOK is not intended for children under 16 to use on their own, and we do not knowingly
        collect their data.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy as the service changes. We will post the new version here with an
        updated date, and notify you of significant changes.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        Privacy questions or requests? Email{" "}
        <a href="mailto:privacy@moviebook.example" className="text-white underline-offset-2 hover:underline">
          privacy@moviebook.example
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="November 14, 2026"
      intro="Your privacy matters to us. This policy explains what information MOVIEBOOK collects, why we collect it, and the choices you have."
      sections={sections}
    />
  );
}
