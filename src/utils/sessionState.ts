/**
 * Tracks session-level state for the portfolio experience.
 * Ensures the cinematic flowing landing intro plays only the very first time
 * the visitor opens the website, and never repeats on subsequent visits to the landing page.
 */

const HAS_SEEN_LANDING_FLOW_KEY = 'poushali_has_seen_landing_flow';

// In-memory fallback across SPA navigation
let memorySeenFlow = false;

export const hasSeenLandingFlow = (): boolean => {
  if (memorySeenFlow) return true;
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = window.sessionStorage.getItem(HAS_SEEN_LANDING_FLOW_KEY);
      if (stored === 'true') {
        memorySeenFlow = true;
        return true;
      }
    }
  } catch {
    // Ignore private browsing or storage errors
  }
  return false;
};

export const markLandingFlowSeen = (): void => {
  memorySeenFlow = true;
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(HAS_SEEN_LANDING_FLOW_KEY, 'true');
    }
  } catch {
    // Ignore storage errors
  }
};
