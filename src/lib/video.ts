interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * True when the visitor should get the smaller showreel encode: phones/tablets,
 * Data Saver, or a connection the browser reports as slow.
 */
export function prefersLightVideo(): boolean {
  if (typeof window === "undefined") return false;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;

  if (connection?.saveData) return true;
  if (connection?.effectiveType && /2g|3g/.test(connection.effectiveType)) {
    return true;
  }

  return window.matchMedia(
    "(max-width: 767px), (max-width: 1024px) and (pointer: coarse)"
  ).matches;
}

/** Seconds of media already buffered ahead of the playhead. */
export function bufferedAhead(video: HTMLVideoElement): number {
  const { buffered, currentTime } = video;

  for (let i = 0; i < buffered.length; i += 1) {
    if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
      return buffered.end(i) - currentTime;
    }
  }

  return 0;
}

/**
 * Pauses every other video on the page and returns a resume callback. Phones
 * only have so much decode capacity and bandwidth, so the background hero loop
 * is what makes a fullscreen reel stutter.
 */
export function pauseBackgroundVideos(except?: HTMLVideoElement | null) {
  if (typeof document === "undefined") return () => {};

  const paused: HTMLVideoElement[] = [];

  document.querySelectorAll("video").forEach((video) => {
    if (video === except || video.paused) return;
    video.pause();
    paused.push(video);
  });

  return () => {
    paused.forEach((video) => {
      video.play().catch(() => {});
    });
  };
}
