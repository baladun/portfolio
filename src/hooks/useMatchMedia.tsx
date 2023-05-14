import { useSyncExternalStore } from 'react';

export function useMatchMedia(media: string) {
  return useSyncExternalStore(subscribe, getSnapshot(media), getServerSnapshot);
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot(media: string) {
  return () => window.matchMedia(media).matches;
}

function getServerSnapshot() {
  return false;
}
