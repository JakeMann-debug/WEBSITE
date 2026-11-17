// app/terms/page.tsx
// Terms & Conditions — template content, edit before launch

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

export const metadata = { title: "Terms & Conditions — MOVIEBOOK" };

const sections: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: (
      <p>
        By creating an account or booking tickets on MOVIEBOOK, you agree to these Terms &amp;
        Conditions. If you do not agree, please do not use the service.
      </p>
    ),
  },
  {
    heading: "Your account",
    body: (
      <>
        <p>
          You must provide accurate information when you register and keep your password secure.
          You are responsible for all activity that happens under your account.
        </p>
        <p>
          You must be at least 16 years old to create an account. If you are younger, a parent or
          guardian must book on your behalf.
        </p>
      </>
    ),
  },
  {
    heading: "Bookings and payments",
    body: (
      <>
        <p>
          A booking is confirmed only after payment succeeds and you receive a confirmation with
          your seats and showtime. Prices are shown before you pay and may include service fees.
        </p>
        <p>
          Seats are held for a short time while you check out. If payment is not completed in time,
          the seats are released.
        </p>
      </>
    ),
  },
  {
    heading: "Cancellations and refunds",
    body: (
      <p>
        Tickets can be cancelled or changed up to 2 hours before the showtime. Refunds are issued
        to the original payment method within 5 business days. If a cinema cancels a screening,
        you will receive a full refund or the option to rebook.
      </p>
    ),
  },
  {
    heading: "Age ratings and cinema rules",
    body: (
      <p>
        Movies carry age ratings and you may be asked to show ID at the cinema. Each cinema sets its
        own house rules (outside food, late entry, and so on), which you must follow.
      </p>
    ),
  },
  {
    heading: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Use bots or scripts to buy tickets or hold seats.</li>
          <li>Resell tickets for profit.</li>
          <li>Attempt to access other users&apos; accounts or disrupt the service.</li>
          <li>Provide false or misleading information.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The MOVIEBOOK name, design and software belong to us. Movie titles, posters and trailers
        belong to their respective owners and are used for ticketing purposes only.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        We provide the service &quot;as is&quot;. To the extent allowed by law, we are not liable
        for indirect losses, such as missing a screening because of a delay, or for cinema
        scheduling changes outside our control.
      </p>
    ),
  },
  {
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. If we make significant changes, we will let you
        know by email or on the website. Continued use means you accept the updated terms.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        Questions about these terms? Email us at{" "}
        <a href="mailto:support@moviebook.example" className="text-white underline-offset-2 hover:underline">
          support@moviebook.example
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="November 14, 2026"
      intro="Please read these terms carefully. They explain the rules for using MOVIEBOOK to browse movies, book seats and manage your tickets."
      sections={sections}
    />
  );
}
