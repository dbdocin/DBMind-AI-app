'use client';

interface MultiSelectChipsProps {
  options: readonly { value: string; label: string }[] | readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
  name: string;
}

function normalize(option: { value: string; label: string } | string): { value: string; label: string } {
  return typeof option === 'string' ? { value: option, label: option } : option;
}

export function MultiSelectChips({ options, selected, onChange, name }: MultiSelectChipsProps) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const { value, label } = normalize(opt);
        const isSelected = selected.includes(value);
        return (
          <button
            key={value}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => toggle(value)}
            className={`rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo ${
              isSelected
                ? 'border-indigo bg-indigo text-white'
                : 'border-line bg-white text-ink-mute hover:border-indigo/40 hover:text-navy'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
