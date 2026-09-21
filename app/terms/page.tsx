import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of the DBMind AI website and database consulting engagements.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      updated="Version 1.0 — last updated September 2026"
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
              Specific engagements are governed by a separate statement of work or engagement agreement, which takes
              precedence over these general terms for scope, deliverables, timeline, and fees.
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
              <li>Maintain your own current backups before any engagement that modifies a production system</li>
              <li>Review AI-assisted recommendations before applying them to production systems</li>
            </ul>
          ),
        },
        {
          id: 'confidentiality',
          title: 'Confidentiality',
          body: (
            <p>
              Information you share with us about your environment, architecture, or business is treated as
              confidential and is not disclosed to third parties except as necessary to deliver the Services or as
              required by law. A mutual non-disclosure agreement is available on request for active engagements.
            </p>
          ),
        },
        {
          id: 'ip',
          title: 'Intellectual property',
          body: (
            <p>
              Pre-existing tools, methodologies, and frameworks used to deliver Services remain the property of
              DBMind AI. Engagement-specific deliverables are addressed under the applicable engagement agreement.
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
          body: (
            <p>
              Services, including AI-assisted analysis, are provided based on the information made available to us.
              We are not responsible for outcomes resulting from incomplete, inaccurate, or withheld information about
              your environment.
            </p>
          ),
        },
        {
          id: 'warranties',
          title: 'Warranties',
          body: (
            <p>
              The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Except as
              expressly stated in a signed engagement agreement, DBMind AI makes no other warranties, express or
              implied, including any implied warranties of merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
          ),
        },
        {
          id: 'liability',
          title: 'Liability',
          body: (
            <p>
              To the maximum extent permitted by law, DBMind AI&apos;s total liability arising out of or relating to
              the Services will not exceed the total fees paid to DBMind AI for the specific engagement giving rise to
              the claim in the twelve (12) months preceding the event. DBMind AI is not liable for indirect,
              incidental, special, consequential, or punitive damages, including lost profits or data loss, even if
              advised of the possibility of such damages.
            </p>
          ),
        },
        {
          id: 'payment',
          title: 'Payment',
          body: (
            <p>
              Payment terms — fees, invoicing schedule, and due dates — for a given engagement are set out in the
              relevant statement of work or engagement agreement.
            </p>
          ),
        },
        {
          id: 'termination',
          title: 'Termination',
          body: (
            <p>
              Either party may terminate an ongoing engagement in accordance with the notice period specified in the
              applicable engagement agreement, or, where none is specified, with fourteen (14) days&apos; written
              notice. Fees for work performed up to the effective date of termination remain payable.
            </p>
          ),
        },
        {
          id: 'governing-law',
          title: 'Governing law',
          body: (
            <p>
              These terms are governed by the laws applicable to DBMind AI&apos;s place of business, without regard to
              conflict-of-laws principles.
            </p>
          ),
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
