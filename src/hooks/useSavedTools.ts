'use client';

import { useState, useEffect, useCallback } from 'react';

interface SavedState { favorites: string[]; compare: string[]; }
const STORAGE_KEY = 'todasia-saved';
const MAX_COMPARE = 4;

function load(): SavedState {
  if (typeof window === 'undefined') return { favorites: [], compare: [] };
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch {}
  return { favorites: [], compare: [] };
}
function save(state: SavedState) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); window.dispatchEvent(new CustomEvent('saved-changed', { detail: state })); } catch {}
}

export function useSavedTools() {
  const [state, setState] = useState<SavedState>({ favorites: [], compare: [] });
  useEffect(() => { setState(load()); const h = (e: Event) => setState((e as CustomEvent).detail); window.addEventListener('saved-changed', h); return () => window.removeEventListener('saved-changed', h); }, []);
  const toggleFavorite = useCallback((id: string) => { const n = load(); const i = n.favorites.indexOf(id); if (i >= 0) n.favorites.splice(i, 1); else n.favorites.push(id); save(n); }, []);
  const toggleCompare = useCallback((id: string) => { const n = load(); const i = n.compare.indexOf(id); if (i >= 0) n.compare.splice(i, 1); else if (n.compare.length < MAX_COMPARE) n.compare.push(id); save(n); }, []);
  const clearCompare = useCallback(() => { const n = load(); n.compare = []; save(n); }, []);
  const isFavorite = useCallback((id: string) => state.favorites.includes(id), [state.favorites]);
  const isComparing = useCallback((id: string) => state.compare.includes(id), [state.compare]);
  return { state, toggleFavorite, toggleCompare, clearCompare, isFavorite, isComparing, maxCompare: MAX_COMPARE };
}
