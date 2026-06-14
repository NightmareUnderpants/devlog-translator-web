"use client";

interface PageBackgroundProps {
  imageSrc: string;
  isTransitioning: boolean;
  previousImageSrc: string | null;
}

export default function PageBackground({
  imageSrc,
  isTransitioning,
  previousImageSrc,
}: PageBackgroundProps) {
  return (
    <>
      {previousImageSrc && (
        <BackgroundLayer
          imageSrc={previousImageSrc}
          opacityClass={isTransitioning ? "opacity-0" : "opacity-30"}
        />
      )}
      <BackgroundLayer
        imageSrc={imageSrc}
        opacityClass={
          previousImageSrc && !isTransitioning ? "opacity-0" : "opacity-30"
        }
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen bg-gradient-to-b from-transparent via-transparent to-black" />
    </>
  );
}

function BackgroundLayer({
  imageSrc,
  opacityClass,
}: {
  imageSrc: string;
  opacityClass: string;
}) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-x-0 top-0 h-screen bg-contain bg-top bg-no-repeat transition-opacity duration-700 ease-out",
        opacityClass,
      ].join(" ")}
      style={{ backgroundImage: `url(${imageSrc})` }}
    />
  );
}
