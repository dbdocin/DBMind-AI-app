import type { HaDrInfo, FieldErrors } from '@/types/assessment';
import { FormField, inputClass, textareaClass } from '@/components/FormField';

interface Props {
  value: HaDrInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<HaDrInfo>) => void;
}

export function ConditionalHaDrFields({ value, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-m border border-line bg-bg-soft/60 p-5">
      <p className="font-mono text-[11.5px] font-semibold text-indigo">HA/DR DETAILS</p>

      <FormField id="hadr-architecture" label="Current HA/DR architecture" required error={errors['haDr.currentArchitecture']}>
        <textarea
          id="hadr-architecture"
          className={textareaClass}
          rows={2}
          placeholder="e.g. single-region AlwaysOn availability group, manual failover"
          value={value.currentArchitecture}
          aria-invalid={!!errors['haDr.currentArchitecture']}
          onChange={(e) => onChange({ currentArchitecture: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="hadr-rpo" label="Target RPO" hint="Recovery point objective" error={errors['haDr.rpo']}>
          <input id="hadr-rpo" className={inputClass} placeholder="e.g. 15 minutes" value={value.rpo} onChange={(e) => onChange({ rpo: e.target.value })} />
        </FormField>
        <FormField id="hadr-rto" label="Target RTO" hint="Recovery time objective" error={errors['haDr.rto']}>
          <input id="hadr-rto" className={inputClass} placeholder="e.g. 1 hour" value={value.rto} onChange={(e) => onChange({ rto: e.target.value })} />
        </FormField>
      </div>

      <FormField id="hadr-availability" label="Major availability requirements" error={errors['haDr.availabilityRequirements']}>
        <textarea
          id="hadr-availability"
          className={textareaClass}
          rows={2}
          placeholder="e.g. must stay online during regional outages"
          value={value.availabilityRequirements}
          onChange={(e) => onChange({ availabilityRequirements: e.target.value })}
        />
      </FormField>
    </div>
  );
}
