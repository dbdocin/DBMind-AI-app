'use client';

import { useEffect, useMemo, useReducer, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepIndicator } from './StepIndicator';
import { ContactStep } from './ContactStep';
import { DatabaseStep } from './DatabaseStep';
import { ProjectStep } from './ProjectStep';
import { FormNavigation } from './FormNavigation';
import { ConsentSection } from '@/components/ConsentSection';
import { SuccessState } from '@/components/SuccessState';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { trackEvent } from '@/lib/cookieConsent';
import { PRIVACY_POLICY_VERSION, TERMS_VERSION, type ServiceValue } from '@/lib/constants';
import type {
  AssessmentFormState,
  ContactInfo,
  ServiceInfo,
  MigrationInfo,
  PerformanceInfo,
  SecurityInfo,
  HaDrInfo,
  ProjectInfo,
  ConsentInfo,
  FieldErrors,
  WizardStatus,
} from '@/types/assessment';
import type { LeadApiResponse } from '@/types/lead';

const TOTAL_STEPS = 3;

function emptyContact(): ContactInfo {
  return { name: '', email: '', company: '', role: '', country: '', phone: '' };
}
function emptyService(): ServiceInfo {
  return { requestedServices: [], databaseTechnologies: [], environment: '', databaseSize: '', databaseCount: '' };
}
function emptyMigration(): MigrationInfo {
  return { migrationType: 'not-sure', source: '', target: '', currentVersion: '', targetVersion: '', reason: '', downtime: '', targetDate: '' };
}
function emptyPerformance(): PerformanceInfo {
  return { symptoms: '', started: '', businessImpact: '' };
}
function emptySecurity(): SecurityInfo {
  return { description: '' };
}
function emptyHaDr(): HaDrInfo {
  return { currentArchitecture: '', rpo: '', rto: '', availabilityRequirements: '' };
}
function emptyProject(): ProjectInfo {
  return { description: '', timeline: '', estimatedSize: '' };
}
function emptyConsent(): ConsentInfo {
  return { privacy: false, terms: false, marketing: false };
}

interface WizardState {
  form: AssessmentFormState;
  step: number;
  status: WizardStatus;
  errors: FieldErrors;
  referenceId: string | null;
  submitError: string | null;
}

type Action =
  | { type: 'PATCH_CONTACT'; patch: Partial<ContactInfo> }
  | { type: 'PATCH_SERVICE'; patch: Partial<ServiceInfo> }
  | { type: 'PATCH_MIGRATION'; patch: Partial<MigrationInfo> }
  | { type: 'PATCH_PERFORMANCE'; patch: Partial<PerformanceInfo> }
  | { type: 'PATCH_SECURITY'; patch: Partial<SecurityInfo> }
  | { type: 'PATCH_HADR'; patch: Partial<HaDrInfo> }
  | { type: 'PATCH_PROJECT'; patch: Partial<ProjectInfo> }
  | { type: 'PATCH_CONSENT'; patch: Partial<ConsentInfo> }
  | { type: 'INIT_ATTRIBUTION_AND_SERVICE'; attribution: AssessmentFormState['attribution']; preselectedService: ServiceValue | null; idempotencyKey: string }
  | { type: 'SET_STEP'; step: number }
  | { type: 'JUMP_TO_STEP_WITH_ERRORS'; step: number; errors: FieldErrors }
  | { type: 'SET_ERRORS'; errors: FieldErrors }
  | { type: 'SET_STATUS'; status: WizardStatus }
  | { type: 'SUBMIT_SUCCESS'; referenceId: string }
  | { type: 'SUBMIT_ERROR'; message: string; fieldErrors?: FieldErrors };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'PATCH_CONTACT':
      return { ...state, form: { ...state.form, contact: { ...state.form.contact, ...action.patch } } };
    case 'PATCH_SERVICE':
      return { ...state, form: { ...state.form, service: { ...state.form.service, ...action.patch } } };
    case 'PATCH_MIGRATION':
      return { ...state, form: { ...state.form, migration: { ...state.form.migration, ...action.patch } } };
    case 'PATCH_PERFORMANCE':
      return { ...state, form: { ...state.form, performance: { ...state.form.performance, ...action.patch } } };
    case 'PATCH_SECURITY':
      return { ...state, form: { ...state.form, security: { ...state.form.security, ...action.patch } } };
    case 'PATCH_HADR':
      return { ...state, form: { ...state.form, haDr: { ...state.form.haDr, ...action.patch } } };
    case 'PATCH_PROJECT':
      return { ...state, form: { ...state.form, project: { ...state.form.project, ...action.patch } } };
    case 'PATCH_CONSENT':
      return { ...state, form: { ...state.form, consent: { ...state.form.consent, ...action.patch } } };
    case 'INIT_ATTRIBUTION_AND_SERVICE':
      return {
        ...state,
        form: {
          ...state.form,
          attribution: action.attribution,
          idempotencyKey: action.idempotencyKey,
          service: action.preselectedService
            ? { ...state.form.service, requestedServices: [action.preselectedService] }
            : state.form.service,
        },
      };
    case 'SET_STEP':
      return { ...state, step: action.step, errors: {} };
    case 'JUMP_TO_STEP_WITH_ERRORS':
      // Deliberately does NOT clear errors like SET_STEP does — this exists
      // specifically for "submit failed validation, jump to the offending
      // step AND show what's wrong there" in one atomic update. Using
      // SET_STEP followed by a separate SET_ERRORS dispatch was the bug:
      // SET_STEP unconditionally resets errors to {}, silently wiping out
      // the very error the second dispatch had just set — which is exactly
      // why an unchecked consent checkbox produced no visible feedback at all.
      return { ...state, step: action.step, errors: action.errors };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success', referenceId: action.referenceId, submitError: null };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', submitError: action.message, errors: action.fieldErrors ?? state.errors };
    default:
      return state;
  }
}

function initialState(): WizardState {
  return {
    form: {
      contact: emptyContact(),
      service: emptyService(),
      migration: emptyMigration(),
      performance: emptyPerformance(),
      security: emptySecurity(),
      haDr: emptyHaDr(),
      project: emptyProject(),
      consent: emptyConsent(),
      attribution: { landingPage: '', referrer: '', utmSource: '', utmMedium: '', utmCampaign: '', utmTerm: '', utmContent: '' },
      idempotencyKey: '',
    },
    step: 0,
    status: 'editing',
    errors: {},
    referenceId: null,
    submitError: null,
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step: number, form: AssessmentFormState): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (!form.contact.name.trim()) errors['contact.name'] = 'Name is required';
    if (!form.contact.email.trim()) {
      errors['contact.email'] = 'Work email is required';
    } else if (!EMAIL_RE.test(form.contact.email.trim())) {
      errors['contact.email'] = 'Enter a valid email address';
    }
  }

  if (step === 1) {
    if (form.service.requestedServices.length === 0) errors['services'] = 'Select at least one service';
    if (form.service.databaseTechnologies.length === 0) errors['database.technologies'] = 'Select at least one database technology';
    if (!form.service.environment) errors['database.environment'] = 'Select an environment';

    if (form.service.requestedServices.includes('migration')) {
      if (!form.migration.source.trim()) errors['migration.source'] = 'Source database is required';
      if (!form.migration.target.trim()) errors['migration.target'] = 'Target database is required';
    }
    if (form.service.requestedServices.includes('performance')) {
      if (!form.performance.symptoms.trim()) errors['performance.symptoms'] = 'Describe the primary symptoms';
    }
    if (form.service.requestedServices.includes('ha-dr')) {
      if (!form.haDr.currentArchitecture.trim()) errors['haDr.currentArchitecture'] = 'Describe your current HA/DR architecture';
    }
  }

  if (step === 2) {
    if (!form.consent.privacy) errors['consent.privacy'] = 'You must agree to this to submit the form';
    if (!form.consent.terms) errors['consent.terms'] = 'You must accept the Terms of Service to submit the form';
  }

  return errors;
}

function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `idem-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AssessmentWizard() {
  const searchParams = useSearchParams();
  const { consent } = useCookieConsent();
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    const preselected = searchParams.get('service') as ServiceValue | null;
    const attribution = {
      landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      utmSource: searchParams.get('utm_source') ?? '',
      utmMedium: searchParams.get('utm_medium') ?? '',
      utmCampaign: searchParams.get('utm_campaign') ?? '',
      utmTerm: searchParams.get('utm_term') ?? '',
      utmContent: searchParams.get('utm_content') ?? '',
    };
    dispatch({ type: 'INIT_ATTRIBUTION_AND_SERVICE', attribution, preselectedService: preselected, idempotencyKey: generateIdempotencyKey() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!consent || hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent(consent, 'assessment_started', { landingPage: state.form.attribution.landingPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consent]);

  function handleServiceChange(patch: Partial<ServiceInfo>) {
    dispatch({ type: 'PATCH_SERVICE', patch });
    if (patch.requestedServices && consent) {
      trackEvent(consent, 'assessment_service_selected', { services: patch.requestedServices.join(',') });
    }
  }

  function handleNext() {
    const errors = validateStep(state.step, state.form);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }
    if (consent) trackEvent(consent, 'assessment_step_completed', { step: String(state.step + 1) });
    dispatch({ type: 'SET_STEP', step: Math.min(state.step + 1, TOTAL_STEPS - 1) });
  }

  function handleBack() {
    dispatch({ type: 'SET_STEP', step: Math.max(state.step - 1, 0) });
  }

  async function handleSubmit() {
    if (state.status === 'submitting' || state.status === 'validating') return; // duplicate-submit guard

    // Defensive re-check of every step, not just the current one — a user
    // could in principle reach here with stale data from a browser back/
    // forward navigation. The server re-validates everything regardless.
    const allErrors = { ...validateStep(0, state.form), ...validateStep(1, state.form), ...validateStep(2, state.form) };
    if (Object.keys(allErrors).length > 0) {
      const firstErrorStep = allErrors['consent.privacy'] || allErrors['consent.terms']
        ? 2
        : Object.keys(allErrors).some((k) => k.startsWith('contact.'))
          ? 0
          : 1;
      dispatch({ type: 'JUMP_TO_STEP_WITH_ERRORS', step: firstErrorStep, errors: allErrors });
      return;
    }

    dispatch({ type: 'SET_STATUS', status: 'submitting' });

    const services = state.form.service.requestedServices;
    const payload = {
      contact: { ...state.form.contact },
      services,
      database: {
        technologies: state.form.service.databaseTechnologies,
        environment: state.form.service.environment,
        size: state.form.service.databaseSize || undefined,
        databaseCount: state.form.service.databaseCount ? Number(state.form.service.databaseCount) : undefined,
      },
      migration: services.includes('migration') ? { ...state.form.migration } : undefined,
      performance: services.includes('performance') ? { ...state.form.performance } : undefined,
      security: services.includes('security') ? { ...state.form.security } : undefined,
      haDr: services.includes('ha-dr') ? { ...state.form.haDr } : undefined,
      project: { ...state.form.project },
      consent: {
        privacy: state.form.consent.privacy,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
        privacyTimestamp: new Date().toISOString(),
        terms: state.form.consent.terms,
        termsVersion: TERMS_VERSION,
        marketing: state.form.consent.marketing,
      },
      attribution: { ...state.form.attribution },
      idempotencyKey: state.form.idempotencyKey,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: LeadApiResponse = await res.json();

      if (data.success) {
        if (consent) trackEvent(consent, 'assessment_submitted', { referenceId: data.referenceId });
        dispatch({ type: 'SUBMIT_SUCCESS', referenceId: data.referenceId });
      } else {
        if (consent) trackEvent(consent, 'assessment_submission_failed', {});
        dispatch({ type: 'SUBMIT_ERROR', message: data.message, fieldErrors: data.fieldErrors });
      }
    } catch {
      if (consent) trackEvent(consent, 'assessment_submission_failed', {});
      dispatch({ type: 'SUBMIT_ERROR', message: 'Unable to submit your request. Please check your connection and try again.' });
    }
  }

  const stepContent = useMemo(() => {
    if (state.step === 0) {
      return <ContactStep value={state.form.contact} errors={state.errors} onChange={(patch) => dispatch({ type: 'PATCH_CONTACT', patch })} />;
    }
    if (state.step === 1) {
      return (
        <DatabaseStep
          service={state.form.service}
          migration={state.form.migration}
          performance={state.form.performance}
          security={state.form.security}
          haDr={state.form.haDr}
          errors={state.errors}
          onServiceChange={handleServiceChange}
          onMigrationChange={(patch) => dispatch({ type: 'PATCH_MIGRATION', patch })}
          onPerformanceChange={(patch) => dispatch({ type: 'PATCH_PERFORMANCE', patch })}
          onSecurityChange={(patch) => dispatch({ type: 'PATCH_SECURITY', patch })}
          onHaDrChange={(patch) => dispatch({ type: 'PATCH_HADR', patch })}
        />
      );
    }
    return (
      <>
        <ProjectStep value={state.form.project} errors={state.errors} onChange={(patch) => dispatch({ type: 'PATCH_PROJECT', patch })} />
        <ConsentSection value={state.form.consent} errors={state.errors} onChange={(patch) => dispatch({ type: 'PATCH_CONSENT', patch })} />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step, state.form, state.errors]);

  if (state.status === 'success' && state.referenceId) {
    return (
      <div className="rounded-l border border-line bg-white p-8 shadow-elevated sm:p-10">
        <SuccessState referenceId={state.referenceId} />
      </div>
    );
  }

  return (
    <div className="rounded-l border border-line bg-white p-6 shadow-elevated sm:p-8">
      <StepIndicator currentStep={state.step} />

      {stepContent}

      {state.status === 'error' && state.submitError && (
        <div role="alert" className="mt-5 rounded-s border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
          {state.submitError}
        </div>
      )}

      <FormNavigation step={state.step} totalSteps={TOTAL_STEPS} status={state.status} onBack={handleBack} onNext={handleNext} onSubmit={handleSubmit} />
    </div>
  );
}
