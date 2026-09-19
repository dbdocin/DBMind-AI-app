import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'DBMind AI terms of service — a placeholder structure covering engagements, confidentiality, AI-assisted analysis, and liability, pending legal review.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      updated="Placeholder version 1.0 — last updated September 2026"
      disclaimer="This page is a design and content placeholder for the DBMind AI prototype. It is not legal advice and should not be treated as a finalized, enforceable terms of service. Before publishing, this content should be drafted, reviewed, and approved by qualified legal counsel."
      sections={[
        {
          id: 'services',
          title: 'Services',
          body: (
            <p>
              DBMind AI provides database consulting, migration and modernization, performance optimization,
              reliability engineering, automation, and AI-assisted database analysis services (&quot;Services&quot;).
            </p>
          ),
        },
        {
          id: 'engagements',
          title: 'Consulting engagements',
          body: (
            <p>
              Specific engagements would be governed by a separate statement of work or engagement agreement, which
              takes precedence over these general terms for scope, deliverables, timeline, and fees.
            </p>
          ),
        },
        {
          id: 'responsibilities',
          title: 'Customer responsibilities',
          body: (
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>Provide accurate information about your environment and requirements</li>
              <li>Avoid submitting credentials, connection strings, API keys, or unnecessary personal data</li>
              <li>Maintain necessary authorizations for us to advise on your database environment</li>
              <li>Review AI-assisted recommendations before applying them to production systems</li>
            </ul>
          ),
        },
        {
          id: 'confidentiality',
          title: 'Confidentiality',
          body: (
            <p>
              Information shared about your environment, architecture, or business is treated as confidential. A full
              mutual confidentiality clause should be finalized by legal counsel, typically reinforced by a signed NDA
              for active engagements.
            </p>
          ),
        },
        {
          id: 'ip',
          title: 'Intellectual property',
          body: (
            <p>
              Placeholder: pre-existing tools, methodologies, and frameworks used to deliver Services remain the
              property of DBMind AI. Engagement-specific deliverables are addressed under the applicable agreement.
            </p>
          ),
        },
        {
          id: 'third-party',
          title: 'Third-party services',
          body: (
            <p>
              Our Services may reference third-party platforms (e.g. Azure, AWS, database vendors). We are not
              responsible for the terms, availability, or performance of services outside our control.
            </p>
          ),
        },
        {
          id: 'ai-assisted',
          title: 'AI-assisted analysis',
          body: (
            <>
              <p>
                AI-assisted analysis is reviewed by database engineering professionals before recommendations are
                provided to clients.
              </p>
              <p>
                AI-generated recommendations are advisory in nature and should be validated against your specific
                environment before implementation. DBMind AI does not apply AI-generated changes to production systems
                without appropriate review and authorization.
              </p>
            </>
          ),
        },
        {
          id: 'limitations',
          title: 'Limitations',
          body: <p>Services, including AI-assisted analysis, are provided based on the information made available to us.</p>,
        },
        {
          id: 'warranties',
          title: 'Warranties',
          body: <p>Placeholder disclaimer language would be finalized by legal counsel and defined per engagement.</p>,
        },
        {
          id: 'liability',
          title: 'Liability',
          body: <p>Placeholder: any limitation of liability would be defined here and/or in the applicable engagement agreement.</p>,
        },
        {
          id: 'payment',
          title: 'Payment',
          body: <p>Payment terms for a given engagement would be defined in the relevant statement of work.</p>,
        },
        {
          id: 'termination',
          title: 'Termination',
          body: <p>Placeholder: termination conditions would be specified in the relevant engagement agreement.</p>,
        },
        {
          id: 'governing-law',
          title: 'Governing law',
          body: <p>Placeholder — to be specified once the company&apos;s registered entity and jurisdiction are confirmed.</p>,
        },
        {
          id: 'contact',
          title: 'Contact',
          body: (
            <p>
              Questions about these terms: <a href="mailto:databasedoctor@dbmindai.com" className="font-semibold text-indigo">databasedoctor@dbmindai.com</a>
            </p>
          ),
        },
      ]}
    />
  );
}
