import type { ServiceInfo, MigrationInfo, PerformanceInfo, SecurityInfo, HaDrInfo, FieldErrors } from '@/types/assessment';
import { FormField, inputClass } from '@/components/FormField';
import { MultiSelectChips } from './MultiSelectChips';
import { ConditionalMigrationFields } from './ConditionalMigrationFields';
import { ConditionalPerformanceFields } from './ConditionalPerformanceFields';
import { ConditionalSecurityFields } from './ConditionalSecurityFields';
import { ConditionalHaDrFields } from './ConditionalHaDrFields';
import { SERVICE_OPTIONS, DATABASE_TECHNOLOGY_OPTIONS, ENVIRONMENT_OPTIONS, DATABASE_SIZE_OPTIONS } from '@/lib/constants';

interface DatabaseStepProps {
  service: ServiceInfo;
  migration: MigrationInfo;
  performance: PerformanceInfo;
  security: SecurityInfo;
  haDr: HaDrInfo;
  errors: FieldErrors;
  onServiceChange: (patch: Partial<ServiceInfo>) => void;
  onMigrationChange: (patch: Partial<MigrationInfo>) => void;
  onPerformanceChange: (patch: Partial<PerformanceInfo>) => void;
  onSecurityChange: (patch: Partial<SecurityInfo>) => void;
  onHaDrChange: (patch: Partial<HaDrInfo>) => void;
}

export function DatabaseStep({
  service,
  migration,
  performance,
  security,
  haDr,
  errors,
  onServiceChange,
  onMigrationChange,
  onPerformanceChange,
  onSecurityChange,
  onHaDrChange,
}: DatabaseStepProps) {
  const services = service.requestedServices;

  return (
    <div className="flex flex-col gap-6">
      <FormField id="services" label="What do you need help with?" required error={errors['services']} hint="Select everything that applies.">
        <MultiSelectChips
          name="Requested services"
          options={SERVICE_OPTIONS}
          selected={services}
          onChange={(next) => onServiceChange({ requestedServices: next as ServiceInfo['requestedServices'] })}
        />
      </FormField>

      <FormField id="db-tech" label="Database technologies" required error={errors['database.technologies']}>
        <MultiSelectChips
          name="Database technologies"
          options={DATABASE_TECHNOLOGY_OPTIONS}
          selected={service.databaseTechnologies}
          onChange={(next) => onServiceChange({ databaseTechnologies: next })}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FormField id="environment" label="Environment" required error={errors['database.environment']}>
          <select id="environment" className={inputClass} value={service.environment} onChange={(e) => onServiceChange({ environment: e.target.value })}>
            <option value="">Select an environment</option>
            {ENVIRONMENT_OPTIONS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="db-size" label="Approx. database size" error={errors['database.size']}>
          <select id="db-size" className={inputClass} value={service.databaseSize} onChange={(e) => onServiceChange({ databaseSize: e.target.value })}>
            <option value="">Select a range</option>
            {DATABASE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="db-count" label="Number of databases" error={errors['database.databaseCount']}>
          <input
            id="db-count"
            type="number"
            min={0}
            className={inputClass}
            value={service.databaseCount}
            onChange={(e) => onServiceChange({ databaseCount: e.target.value })}
          />
        </FormField>
      </div>

      {/* Progressive disclosure — only the questions relevant to what was
          actually selected. Order mirrors the priority the services carry in
          lead scoring, but any/all/none can be shown depending on selection. */}
      {services.includes('migration') && (
        <ConditionalMigrationFields value={migration} errors={errors} onChange={onMigrationChange} />
      )}
      {services.includes('performance') && (
        <ConditionalPerformanceFields value={performance} errors={errors} onChange={onPerformanceChange} />
      )}
      {services.includes('security') && (
        <ConditionalSecurityFields value={security} errors={errors} onChange={onSecurityChange} />
      )}
      {services.includes('ha-dr') && <ConditionalHaDrFields value={haDr} errors={errors} onChange={onHaDrChange} />}
    </div>
  );
}
