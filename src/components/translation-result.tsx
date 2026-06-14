interface TranslationResultProps {
  detectedCode: string;
  text: string;
}

export default function TranslationResult({
  detectedCode,
  text,
}: TranslationResultProps) {
  if (!text) {
    return null;
  }

  return (
    <div className="rounded-md bg-white/10 p-4">
      <p className="text-sm font-semibold text-white/70">
        Перевод{detectedCode ? ` (${detectedCode})` : ""}
      </p>
      <p className="mt-2 leading-7 text-white">{text}</p>
    </div>
  );
}
