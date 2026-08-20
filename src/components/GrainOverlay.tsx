export default function GrainOverlay() {
  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="grain-overlay"
        style={{ filter: "url(#grain-filter)" }}
        aria-hidden="true"
      />
    </>
  );
}
