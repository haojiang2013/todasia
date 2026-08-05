'use client';
import { useSavedTools } from '@/hooks/useSavedTools';

export default function FavoriteButton({ id, size }: { id: string; size?: 'sm' | 'md' }) {
  const { isFavorite, toggleFavorite } = useSavedTools();
  const a = isFavorite(id);
  const s = size === 'sm' ? { w: 30, h: 30, f: 13 } : { w: 38, h: 38, f: 16 };
  return <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id); }}
    title={a ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    style={{ width: s.w, height: s.h, borderRadius: '50%', border: a ? '2px solid var(--es-red)' : '2px solid var(--border-default)', background: a ? 'var(--es-red-bg)' : 'var(--bg-surface)', cursor: 'pointer', fontSize: s.f, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', flexShrink: 0, lineHeight: 1 }}
    aria-label={a ? 'Quitar de favoritos' : 'Añadir a favoritos'}>{a ? '❤️' : '🤍'}</button>;
}
