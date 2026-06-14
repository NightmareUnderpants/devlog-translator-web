interface TranslateButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function TranslateButton({
  loading,
  onClick,
}: TranslateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-gray-950 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={loading}
    >
      {loading ? "Перевожу..." : "Перевести"}
    </button>
  );
}
