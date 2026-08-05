'use client';
import { useSavedTools } from '@/hooks/useSavedTools';
import Link from 'next/link';

export default function CompareBar() {
  const { state, clearCompare } = useSavedTools();
  const n = state.compare.length;
  if (n < 2) return null;
  return <div data-compare-bar="true" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, background: 'var(--bg-surface)', borderTop: '2px solid var(--accent)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: '0 -4px 20px rgba(0,0,0,.12)' }}>
    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n} seleccionados (máx. 4)</span>
    <Link href={`/comparar?ids=${state.compare.join(',')}`} className="btn-primary" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: 14, fontWeight: 700 }}>📊 Comparar</Link>
    <button onClick={clearCompare} style={{ padding: '8px 16px', borderRadius: 99, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>Limpiar</button>
  </div>;
}
