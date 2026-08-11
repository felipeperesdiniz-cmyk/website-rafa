"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";
import ImageFallback from "@/components/ImageFallback";

type PortfolioImageProps = ImageProps & {
  fallbackSrc?: ImageProps["src"];
  fallbackVariant?: "tile" | "hero" | "lightbox";
};

export default function PortfolioImage({
  src,
  alt,
  fallbackSrc,
  fallbackVariant = "tile",
  onError,
  className,
  ...props
}: PortfolioImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
  }, [src]);

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        return;
      }
      setFailed(true);
      onError?.(event);
    },
    [fallbackSrc, currentSrc, onError]
  );

  if (failed) {
    return (
      <ImageFallback
        alt={typeof alt === "string" ? alt : undefined}
        variant={fallbackVariant}
        className={className}
        fill={props.fill}
      />
    );
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
