"use client";

import { useSyncExternalStore } from "react";

type Device = "mobile" | "desktop";

function getDevice(): Device {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useDevice(): Device {
  return useSyncExternalStore(subscribe, getDevice, () => "desktop");
}
