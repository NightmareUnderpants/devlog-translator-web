interface CardCoverProps {
  backgroundColor: string;
  imageSrc: string;
}

export default function CardCover({
  backgroundColor,
  imageSrc,
}: CardCoverProps) {
  return (
    <div
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 35%, ${backgroundColor} 100%)`,
        }}
      />
    </div>
  );
}
