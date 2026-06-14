interface CardHeaderProps {
  author?: string;
  createdAt?: string;
  title: string;
}

export default function CardHeader({
  author,
  createdAt,
  title,
}: CardHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      {(author || createdAt) && (
        <p className="text-sm text-white/65">
          {[author, createdAt].filter(Boolean).join(" | ")}
        </p>
      )}
    </div>
  );
}
