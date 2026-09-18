import type { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Every field in the wizard goes through this wrapper so label, hint, and
 * error state stay visually and semantically consistent. The actual <input>/
 * <select>/<textarea> is rendered by the caller (so it can be any control
 * type) but must set `id={id}`, `aria-invalid={!!error}`, and
 * `aria-describedby` pointing at `${id}-error` / `${id}-hint` to match what
 * this wrapper renders.
 */
export function FormField({ id, label, error, hint, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-navy">
        {label}
        {!required && <span className="ml-1 font-medium text-ink-faint">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'w-full rounded-s border border-line bg-white px-3.5 py-2.5 text-[14.5px] text-ink transition focus:border-indigo focus:outline-none focus:ring-[3px] focus:ring-indigo/10 aria-[invalid=true]:border-red-400';

export const textareaClass = `${inputClass} min-h-[96px] resize-y`;
