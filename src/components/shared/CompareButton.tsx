'use client';
import { useSavedTools } from '@/hooks/useSavedTools';

export default function CompareButton({ id }: { id: string }) {
  const { isComparing, toggleCompare, state } = useSavedTools();
  const c = isComparing(id);
  const full = state.compare.length >= 4 && !c;
  return <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleCompare(id); }} disabled={full}
    title={c ? 'Quitar de comparar' : full ? 'Máximo 4' : 'Añadir a comparar'}
    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, border: c ? '2px solid var(--accent)' : '2px solid var(--border-default)', background: c ? 'var(--accent-light)' : 'var(--bg-surface)', cursor: full ? 'default' : 'pointer', fontSize: 11, fontWeight: 700, color: c ? 'var(--accent)' : 'var(--text-tertiary)', transition: 'all .15s', opacity: full ? 0.4 : 1, fontFamily: 'var(--font-sans)' }}
    aria-label={c ? 'Quitar de comparar' : 'Añadir a comparar'}>{c ? '☑ Comparando' : '☐ Comparar'}</button>;
}
