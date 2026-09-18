import type { PerformanceInfo, FieldErrors } from '@/types/assessment';
import { FormField, inputClass, textareaClass } from '@/components/FormField';

interface Props {
  value: PerformanceInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<PerformanceInfo>) => void;
}

export function ConditionalPerformanceFields({ value, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-m border border-line bg-bg-soft/60 p-5">
      <p className="font-mono text-[11.5px] font-semibold text-indigo">PERFORMANCE DETAILS</p>

      <FormField id="perf-symptoms" label="Primary symptoms" required error={errors['performance.symptoms']}>
        <textarea
          id="perf-symptoms"
          className={textareaClass}
          rows={3}
          placeholder="e.g. slow queries during peak hours, timeouts, high CPU"
          value={value.symptoms}
          aria-invalid={!!errors['performance.symptoms']}
          onChange={(e) => onChange({ symptoms: e.target.value })}
        />
      </FormField>

      <FormField id="perf-started" label="When did this start?" error={errors['performance.started']}>
        <input id="perf-started" className={inputClass} placeholder="e.g. about 2 weeks ago, after a recent deploy" value={value.started} onChange={(e) => onChange({ started: e.target.value })} />
      </FormField>

      <FormField id="perf-impact" label="Business impact" error={errors['performance.businessImpact']}>
        <textarea
          id="perf-impact"
          className={textareaClass}
          rows={2}
          placeholder="e.g. customer-facing checkout is timing out"
          value={value.businessImpact}
          onChange={(e) => onChange({ businessImpact: e.target.value })}
        />
      </FormField>
    </div>
  );
}
