import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How DBMind AI collects, uses, and protects information submitted through this website and in the course of database consulting engagements.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="Version 1.0 — last updated September 2026"
      sections={[
        {
          id: 'introduction',
          title: 'Introduction',
          body: (
            <p>
              DBMind AI (&quot;DBMind AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides database
              consulting, migration, performance optimization, reliability engineering, and AI-assisted database
              analysis services. This policy describes how we collect, use, and protect information in connection
              with this website and our services.
            </p>
          ),
        },
        {
          id: 'information-we-collect',
          title: 'Information we collect',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Contact details you provide (name, work email, phone number)</li>
              <li>Company, role, and country, if provided</li>
              <li>Information about your database environment, provided to scope an assessment</li>
              <li>Communications you send us directly</li>
              <li>Basic technical data collected automatically (see Cookies &amp; Analytics)</li>
              <li>Attribution data (landing page, UTM parameters, referrer) captured with an assessment request</li>
            </ul>
          ),
        },
        {
          id: 'how-we-use',
          title: 'How we use information',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Responding to assessment requests and consulting inquiries</li>
              <li>Scoping, delivering, and supporting engagements</li>
              <li>Internal prioritization and record-keeping</li>
              <li>Sending requested updates, where you have opted in (see Marketing Communications)</li>
              <li>Meeting legal, security, and compliance obligations</li>
            </ul>
          ),
        },
        {
          id: 'lead-info',
          title: 'Lead & consultation information',
          body: (
            <>
              <p>
                When you submit an assessment request, we record the information you provide together with consent
                details, tracked separately rather than as a single generic consent flag:
              </p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                <li>Privacy consent status, policy version, and timestamp</li>
                <li>Terms of Service acceptance status, version, and timestamp</li>
                <li>Marketing opt-in status and timestamp, tracked independently of service consent</li>
              </ul>
              <p>Marketing consent is never required to submit a service request.</p>
            </>
          ),
        },
        {
          id: 'technical-info',
          title: 'Database/technical information',
          body: (
            <p>
              Our intake form is designed to avoid collecting credentials, connection strings, API keys, or customer
              personal data, and asks users not to submit these directly. Any technical or diagnostic material shared
              during an engagement is treated as confidential business information.
            </p>
          ),
        },
        {
          id: 'cookies',
          title: 'Cookies & analytics',
          body: (
            <>
              <p>This site distinguishes between three categories of cookies:</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                <li><strong>Essential</strong> — required for core site functionality; cannot be disabled</li>
                <li><strong>Analytics</strong> — help us understand aggregate site usage; optional</li>
                <li><strong>Marketing</strong> — used to measure campaign performance; optional</li>
              </ul>
              <p>
                Non-essential cookies default to OFF until you choose otherwise. See our{' '}
                <a href="/cookies" className="font-semibold text-indigo">Cookie Policy</a> for full detail, or use{' '}
                &quot;Cookie Preferences&quot; in the footer to change your choice at any time.
              </p>
            </>
          ),
        },
        {
          id: 'marketing',
          title: 'Marketing communications',
          body: (
            <p>
              We only send marketing communications to contacts who explicitly opted in via the marketing checkbox on
              our forms. You may withdraw consent at any time by emailing us or using the unsubscribe link included
              in any marketing message.
            </p>
          ),
        },
        {
          id: 'retention',
          title: 'Data retention',
          body: (
            <p>
              We retain lead and consultation information for as long as necessary to respond to your request,
              deliver any engagement, and meet our own record-keeping and legal obligations — generally no longer
              than 24 months after our last contact with you, unless a longer period is required by law or by an
              active engagement. You may request earlier deletion at any time (see Data Subject Rights below).
            </p>
          ),
        },
        {
          id: 'security',
          title: 'Data security',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Lead records are never exposed in client-side code or public APIs</li>
              <li>All lead operations are validated and authorized server-side</li>
              <li>Access to customer information is limited to personnel who need it to deliver services</li>
            </ul>
          ),
        },
        {
          id: 'third-party',
          title: 'Third-party services',
          body: (
            <>
              <p>We use a small number of third-party providers to operate this site and respond to inquiries:</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                <li><strong>Vercel</strong> — website hosting and infrastructure</li>
                <li><strong>Resend</strong> — transactional email delivery (assessment confirmations and internal notifications)</li>
              </ul>
              <p>We do not sell personal information to third parties.</p>
            </>
          ),
        },
        {
          id: 'rights',
          title: 'Data subject rights',
          body: (
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the use of
              your personal information, and to withdraw consent previously given. To exercise any of these rights,
              contact us using the details below and we will respond within a reasonable time.
            </p>
          ),
        },
        {
          id: 'transfers',
          title: 'International data transfers',
          body: (
            <p>
              Our hosting and email providers may process data in countries other than your own. Where this occurs,
              we rely on the safeguards those providers make available (such as standard contractual clauses) to
              protect information in transit and at rest.
            </p>
          ),
        },
        {
          id: 'children',
          title: "Children's privacy",
          body: <p>This site and our services are directed at business professionals and are not intended for use by children.</p>,
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          body: <p>We may update this policy from time to time. Material changes are reflected by an updated version number and date at the top of this page.</p>,
        },
        {
          id: 'contact',
          title: 'Contact information',
          body: (
            <p>
              Questions about this policy: <a href="mailto:databasedoctor@dbmindai.com" className="font-semibold text-indigo">databasedoctor@dbmindai.com</a>
            </p>
          ),
        },
      ]}
    />
  );
}
