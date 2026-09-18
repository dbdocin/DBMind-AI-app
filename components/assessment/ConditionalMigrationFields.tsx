import type { MigrationInfo, FieldErrors } from '@/types/assessment';
import { FormField, inputClass, textareaClass } from '@/components/FormField';
import { MIGRATION_TYPE_OPTIONS, DOWNTIME_OPTIONS } from '@/lib/constants';

interface Props {
  value: MigrationInfo;
  errors: FieldErrors;
  onChange: (patch: Partial<MigrationInfo>) => void;
}

const MIGRATION_TYPE_LABELS: Record<string, string> = {
  homogeneous: 'Homogeneous — same database technology',
  heterogeneous: 'Heterogeneous — moving to a different technology',
  'not-sure': "I'm not sure yet",
};

export function ConditionalMigrationFields({ value, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-m border border-line bg-bg-soft/60 p-5">
      <p className="font-mono text-[11.5px] font-semibold text-indigo">MIGRATION DETAILS</p>

      <FormField id="mig-type" label="Migration type" error={errors['migration.type']}>
        <select id="mig-type" className={inputClass} value={value.migrationType} onChange={(e) => onChange({ migrationType: e.target.value })}>
          {MIGRATION_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {MIGRATION_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="mig-source" label="Source database" required error={errors['migration.source']}>
          <input
            id="mig-source"
            className={inputClass}
            value={value.source}
            placeholder="e.g. SQL Server 2016"
            aria-invalid={!!errors['migration.source']}
            onChange={(e) => onChange({ source: e.target.value })}
          />
        </FormField>
        <FormField id="mig-target" label="Target database" required error={errors['migration.target']}>
          <input
            id="mig-target"
            className={inputClass}
            value={value.target}
            placeholder="e.g. PostgreSQL 17 on Azure"
            aria-invalid={!!errors['migration.target']}
            onChange={(e) => onChange({ target: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="mig-current-version" label="Current version" error={errors['migration.currentVersion']}>
          <input id="mig-current-version" className={inputClass} value={value.currentVersion} onChange={(e) => onChange({ currentVersion: e.target.value })} />
        </FormField>
        <FormField id="mig-target-version" label="Target version" error={errors['migration.targetVersion']}>
          <input id="mig-target-version" className={inputClass} value={value.targetVersion} onChange={(e) => onChange({ targetVersion: e.target.value })} />
        </FormField>
      </div>

      <FormField id="mig-reason" label="What's driving this migration?" error={errors['migration.reason']}>
        <textarea id="mig-reason" className={textareaClass} rows={2} value={value.reason} onChange={(e) => onChange({ reason: e.target.value })} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="mig-downtime" label="Acceptable downtime" error={errors['migration.downtime']}>
          <select id="mig-downtime" className={inputClass} value={value.downtime} onChange={(e) => onChange({ downtime: e.target.value })}>
            <option value="">Select an option</option>
            {DOWNTIME_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="mig-target-date" label="Target migration date" error={errors['migration.targetDate']}>
          <input id="mig-target-date" type="date" className={inputClass} value={value.targetDate} onChange={(e) => onChange({ targetDate: e.target.value })} />
        </FormField>
      </div>
    </div>
  );
}
