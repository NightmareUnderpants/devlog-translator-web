import type { TranslationLanguage } from "@/lib/translation-languages";

interface LanguageSelectProps {
  disabled?: boolean;
  languages: TranslationLanguage[];
  onChange: (languageCode: string) => void;
  value: string;
}

export default function LanguageSelect({
  disabled = false,
  languages,
  onChange,
  value,
}: LanguageSelectProps) {
  return (
    <label className="flex min-w-44 flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-white/60">
      Язык перевода
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-10 rounded-md border border-white/15 bg-black/35 px-3 text-sm font-semibold normal-case text-white outline-none transition-colors hover:bg-black/45 focus:border-white/45 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.title}
          </option>
        ))}
      </select>
    </label>
  );
}
