import type { ProjectInfo, FieldErrors } from '@/types/assessment';
import { FormField, inputClass, textareaClass } from '@/components/FormField';
import { TIMELINE_OPTIONS, ESTIMATED_SIZE_OPTIONS } from '@/lib/constants';

interface ProjectStepProps {
  value: ProjectInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<ProjectInfo>) => void;
}

export function ProjectStep({ value, errors, onChange }: ProjectStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <FormField id="project-description" label="Tell us more about what you're trying to solve" error={errors['project.description']}>
        <textarea
          id="project-description"
          className={textareaClass}
          rows={4}
          placeholder="Goals, constraints, or anything else that would help us prepare"
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
        <div className="mt-2.5 flex items-start gap-2 rounded-s border border-warn/30 bg-warn/10 px-3.5 py-2.5">
          <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 flex-shrink-0 text-warn" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
          <p className="text-xs leading-relaxed text-[#8A5A22]">
            Please do not include passwords, connection strings, credentials, API keys, customer personal data, or
            other sensitive information in this field.
          </p>
        </div>
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="project-timeline" label="Timeline" error={errors['project.timeline']}>
          <select id="project-timeline" className={inputClass} value={value.timeline} onChange={(e) => onChange({ timeline: e.target.value })}>
            <option value="">Select a timeframe</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="project-size" label="Estimated project size" error={errors['project.estimatedSize']}>
          <select id="project-size" className={inputClass} value={value.estimatedSize} onChange={(e) => onChange({ estimatedSize: e.target.value })}>
            <option value="">Select a size</option>
            {ESTIMATED_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-navy">
          Attachments <span className="ml-1 font-medium text-ink-faint">(coming soon)</span>
        </label>
        <div className="rounded-s border-[1.5px] border-dashed border-line bg-bg-soft p-4 text-center text-[13px] text-ink-faint">
          <b className="mb-1 block text-[13.5px] font-semibold text-ink-mute">File upload isn&apos;t enabled yet</b>
          Soon you&apos;ll be able to attach diagnostic files, assessment reports, execution plans, or migration
          inventories here. When available: do not upload credentials, passwords, connection strings, secrets, or
          unnecessary personal/customer data.
        </div>
      </div>
    </div>
  );
}
