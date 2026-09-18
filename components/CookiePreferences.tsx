'use client';

import { useState, useId } from 'react';

interface CookiePreferencesProps {
  initialAnalytics: boolean;
  initialMarketing: boolean;
  onSave: (choices: { analytics: boolean; marketing: boolean }) => void;
}

/**
 * Pure preference-toggle UI. Rendered from exactly one place —
 * CookieBanner — whether it's showing because no choice has been made yet
 * or because the visitor reopened it from the footer's "Cookie Preferences"
 * link. There is intentionally no second implementation of this control.
 */
export function CookiePreferences({ initialAnalytics, initialMarketing, onSave }: CookiePreferencesProps) {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [marketing, setMarketing] = useState(initialMarketing);
  const analyticsId = useId();
  const marketingId = useId();

  return (
    <div className="flex flex-col gap-4 border-t border-line pt-4">
      <PreferenceRow
        id={`essential-${analyticsId}`}
        title="Essential"
        description="Required for the site to function. Always on."
        checked
        disabled
        onChange={() => {}}
      />
      <PreferenceRow
        id={analyticsId}
        title="Analytics"
        description="Helps us understand how the site is used."
        checked={analytics}
        onChange={setAnalytics}
      />
      <PreferenceRow
        id={marketingId}
        title="Marketing"
        description="Used to measure campaign performance."
        checked={marketing}
        onChange={setMarketing}
      />
      <button
        type="button"
        onClick={() => onSave({ analytics, marketing })}
        className="self-start rounded-s bg-indigo px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3049C4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
      >
        Save preferences
      </button>
    </div>
  );
}

function PreferenceRow({
  id,
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="block text-sm font-semibold text-navy">
          {title}
        </label>
        <span className="text-xs text-ink-faint">{description}</span>
      </div>
      <button
        role="switch"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative h-[22px] w-[38px] flex-shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo ${
          checked ? 'bg-indigo' : 'bg-line'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-card transition-transform ${
            checked ? 'translate-x-[19px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
}
