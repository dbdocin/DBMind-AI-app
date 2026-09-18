import Link from 'next/link';
import type { ConsentInfo, FieldErrors } from '@/types/assessment';

interface ConsentSectionProps {
  value: ConsentInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<ConsentInfo>) => void;
}

/**
 * Privacy consent, Terms acceptance, and marketing opt-in are three
 * independent booleans — never collapsed into a single "I agree" checkbox.
 * Only `privacy` is required to submit the form; `terms` and `marketing`
 * are always optional (spec #40, #57).
 */
export function ConsentSection({ value, errors, onChange }: ConsentSectionProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-5">
      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={value.privacy}
          onChange={(e) => onChange({ privacy: e.target.checked })}
          aria-invalid={!!errors['consent.privacy']}
          aria-describedby={errors['consent.privacy'] ? 'consent-privacy-error' : undefined}
          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 accent-indigo"
          required
        />
        <span className="text-[13.5px] leading-relaxed text-ink">
          I agree to DBMind AI processing the information I provide to respond to my request and provide the
          requested services.
          <span className="mt-0.5 block text-xs text-ink-faint">
            Your information will be handled in accordance with our{' '}
            <Link href="/privacy" className="font-semibold text-indigo underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </span>
      </label>
      {errors['consent.privacy'] && (
        <p id="consent-privacy-error" role="alert" className="-mt-2 text-xs font-medium text-red-600">
          {errors['consent.privacy']}
        </p>
      )}

      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={value.terms}
          onChange={(e) => onChange({ terms: e.target.checked })}
          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 accent-indigo"
        />
        <span className="text-[13.5px] leading-relaxed text-ink">
          I have read and agree to the{' '}
          <Link href="/terms" className="font-semibold text-indigo underline underline-offset-2">
            Terms of Service
          </Link>
          . <span className="text-ink-faint">(optional at this stage)</span>
        </span>
      </label>

      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={value.marketing}
          onChange={(e) => onChange({ marketing: e.target.checked })}
          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 accent-indigo"
        />
        <span className="text-[13.5px] leading-relaxed text-ink">
          I&apos;d like to receive occasional updates, database engineering insights, and DBMind AI news.{' '}
          <span className="text-ink-faint">(optional)</span>
        </span>
      </label>

      <p className="text-xs leading-relaxed text-ink-faint">
        We&apos;ll only use the information you provide to respond to your request and deliver relevant services. You
        can review our <Link href="/privacy" className="font-semibold text-indigo">Privacy Policy</Link> for more
        information.
      </p>
    </div>
  );
}
