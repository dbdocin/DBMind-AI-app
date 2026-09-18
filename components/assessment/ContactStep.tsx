import type { ContactInfo } from '@/types/assessment';
import type { FieldErrors } from '@/types/assessment';
import { FormField, inputClass } from '@/components/FormField';
import { ROLE_OPTIONS, COUNTRY_OPTIONS } from '@/lib/constants';

interface ContactStepProps {
  value: ContactInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<ContactInfo>) => void;
}

export function ContactStep({ value, errors, onChange }: ContactStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="contact-name" label="Name" required error={errors['contact.name']}>
          <input
            id="contact-name"
            className={inputClass}
            value={value.name}
            aria-invalid={!!errors['contact.name']}
            aria-describedby={errors['contact.name'] ? 'contact-name-error' : undefined}
            onChange={(e) => onChange({ name: e.target.value })}
            autoComplete="name"
          />
        </FormField>
        <FormField id="contact-email" label="Work email" required error={errors['contact.email']}>
          <input
            id="contact-email"
            type="email"
            className={inputClass}
            value={value.email}
            aria-invalid={!!errors['contact.email']}
            aria-describedby={errors['contact.email'] ? 'contact-email-error' : undefined}
            onChange={(e) => onChange({ email: e.target.value })}
            autoComplete="email"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="contact-company" label="Company" error={errors['contact.company']}>
          <input
            id="contact-company"
            className={inputClass}
            value={value.company}
            onChange={(e) => onChange({ company: e.target.value })}
            autoComplete="organization"
          />
        </FormField>
        <FormField id="contact-role" label="Role" error={errors['contact.role']}>
          <select id="contact-role" className={inputClass} value={value.role} onChange={(e) => onChange({ role: e.target.value })}>
            <option value="">Select a role</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="contact-country" label="Country" error={errors['contact.country']}>
          <select
            id="contact-country"
            className={inputClass}
            value={value.country}
            onChange={(e) => onChange({ country: e.target.value })}
          >
            <option value="">Select a country</option>
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="contact-phone" label="Phone number" error={errors['contact.phone']} hint="We'll only use this if you ask us to call.">
          <input
            id="contact-phone"
            type="tel"
            className={inputClass}
            value={value.phone}
            aria-invalid={!!errors['contact.phone']}
            aria-describedby={errors['contact.phone'] ? 'contact-phone-error' : 'contact-phone-hint'}
            onChange={(e) => onChange({ phone: e.target.value })}
            autoComplete="tel"
          />
        </FormField>
      </div>
    </div>
  );
}
