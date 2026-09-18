import type { SecurityInfo, FieldErrors } from '@/types/assessment';
import { FormField, textareaClass } from '@/components/FormField';

interface Props {
  value: SecurityInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<SecurityInfo>) => void;
}

export function ConditionalSecurityFields({ value, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-m border border-line bg-bg-soft/60 p-5">
      <p className="font-mono text-[11.5px] font-semibold text-indigo">SECURITY ASSESSMENT DETAILS</p>
      <FormField
        id="sec-description"
        label="What security or compliance concerns should we know about?"
        error={errors['security.description']}
        hint="Authentication, encryption, access control, auditing, compliance frameworks — whatever's relevant."
      >
        <textarea
          id="sec-description"
          className={textareaClass}
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </FormField>
    </div>
  );
}
