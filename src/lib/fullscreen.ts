type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

export function getFullscreenElement(): Element | null {
  const doc = document as FullscreenDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export async function requestElementFullscreen(element: HTMLElement): Promise<void> {
  const el = element as FullscreenElement;
  if (el.requestFullscreen) {
    await el.requestFullscreen();
    return;
  }
  if (el.webkitRequestFullscreen) {
    await el.webkitRequestFullscreen();
    return;
  }
  if (el.msRequestFullscreen) {
    await el.msRequestFullscreen();
  }
}

export async function exitElementFullscreen(): Promise<void> {
  const doc = document as FullscreenDocument;
  if (doc.exitFullscreen) {
    await doc.exitFullscreen();
    return;
  }
  if (doc.webkitExitFullscreen) {
    await doc.webkitExitFullscreen();
    return;
  }
  if (doc.msExitFullscreen) {
    await doc.msExitFullscreen();
  }
}

export function bindFullscreenChange(listener: () => void): () => void {
  document.addEventListener("fullscreenchange", listener);
  document.addEventListener("webkitfullscreenchange", listener);
  return () => {
    document.removeEventListener("fullscreenchange", listener);
    document.removeEventListener("webkitfullscreenchange", listener);
  };
}
