'use client';

import { useState, useEffect } from 'react';
import { TOOLS, type Tool } from '@/lib/tools';

type FilterKey = 'origin' | 'category' | 'price';

interface FilterItem {
  id: string; label: string; count: number; filterKey: FilterKey; filterValue: string;
}

function useCounts() {
  const [counts, setCounts] = useState<{total:number;es:number;byCategory:Record<string,number>;free:number}>({
    total:0, es:0, byCategory:{}, free:0
  });
  useEffect(() => {
    const all = TOOLS.filter(Boolean);
    const byCategory: Record<string,number> = {};
    let es = 0, free = 0;
    all.forEach((t: any) => {
      if (t.originTag === 'tag-es') es++;
      if (t.free) free++;
      (t.categories || []).forEach((c: string) => {
        byCategory[c] = (byCategory[c] || 0) + 1;
      });
    });
    setCounts({ total: all.length, es, byCategory, free });
  }, []);
  return counts;
}

function emitFilter(key: FilterKey, value: string) {
  window.dispatchEvent(new CustomEvent('todasia-filter', { detail: { key, value } }));
}

const ORIGINS = [
  { id:'all', label:'Todas', filterKey:'origin' as const, filterValue:'all' },
  { id:'es', label:'🇪🇸 España & LatAm', filterKey:'origin' as const, filterValue:'es' },
  { id:'global', label:'🌎 Global', filterKey:'origin' as const, filterValue:'global' },
];

const PRICES = [
  { id:'all', label:'Todos', filterKey:'price' as const, filterValue:'all' },
  { id:'free', label:'🆓 Gratis', filterKey:'price' as const, filterValue:'free' },
  { id:'paid', label:'💶 De pago', filterKey:'price' as const, filterValue:'paid' },
];

const CAT_ORDER = ['Chat IA','Imágenes','Escritura','Programación','Video','Audio','Traducción','Negocios','Búsqueda','Educación','Diseño','Salud','Reuniones','Podcast','Email','Finanzas','Legal','Recursos Humanos','Ventas','Modelo/FW'];

export default function Sidebar() {
  const counts = useCounts();
  const [activeOrigin, setActiveOrigin] = useState('all');
  const [activeCat, setActiveCat] = useState('all');
  const [activePrice, setActivePrice] = useState('all');

  const isActive = (section: string, id: string) => {
    if (section === 'origin') return activeOrigin === id;
    if (section === 'cat') return activeCat === id;
    if (section === 'price') return activePrice === id;
    return false;
  };

  const handleClick = (section: string, item: FilterItem) => {
    if (section === 'origin') setActiveOrigin(item.id);
    if (section === 'cat') setActiveCat(item.id);
    if (section === 'price') setActivePrice(item.id);
    emitFilter(item.filterKey, item.filterValue);
    // Close mobile sidebar after selection
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sideOverlay')?.classList.remove('open');
  };

  const cats = CAT_ORDER.filter(c => counts.byCategory[c]).map(c => ({
    id: c.toLowerCase().replace(/[^a-z0-9]/g,'-'),
    label: c, filterKey: 'category' as const, filterValue: c,
    count: counts.byCategory[c] || 0
  }));

  const originItems = ORIGINS.map(o => ({
    ...o,
    count: o.id === 'all' ? counts.total : o.id === 'es' ? counts.es : counts.total - counts.es
  }));

  const priceItems = PRICES.map(p => ({
    ...p,
    count: p.id === 'all' ? counts.total : p.id === 'free' ? counts.free : counts.total - counts.free
  }));

  const allCatItem: FilterItem = { id:'all', label:'Todas las categorías', count:counts.total, filterKey:'category', filterValue:'all' };

  const renderSection = (title: string, items: FilterItem[], section: string) => (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>{title}</h4>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(section, item)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '8px 12px', border: 'none',
            borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13,
            textAlign: 'left', transition: 'background .15s',
            fontFamily: 'var(--font-sans)',
            background: isActive(section, item.id) ? 'var(--accent-light)' : 'transparent',
            color: isActive(section, item.id) ? 'var(--accent)' : 'var(--text-primary)',
            fontWeight: isActive(section, item.id) ? 600 : 400,
          }}
          onMouseEnter={e => { if (!isActive(section, item.id)) e.currentTarget.style.background = 'var(--bg-hover)'; }}
          onMouseLeave={e => { if (!isActive(section, item.id)) e.currentTarget.style.background = 'transparent'; }}
        >
          <span>{item.label}</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>{item.count}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      <div id="sideOverlay" data-side-overlay
        style={{ display: 'none' }}
        onClick={() => {
          document.getElementById('sidebar')?.classList.remove('open');
          document.getElementById('sideOverlay')?.classList.remove('open');
        }}
      />

      <aside id="sidebar" data-sidebar
        style={{
          width: 240, flexShrink: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius)',
          padding: '16px 14px',
          height: 'fit-content',
          position: 'sticky', top: 80
        }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid var(--border-default)' }}>🔍 Filtrar</h3>
        {renderSection('🌍 Origen', originItems, 'origin')}
        {renderSection('📂 Categoría', [allCatItem, ...cats], 'cat')}
        {renderSection('💰 Precio', priceItems, 'price')}
      </aside>
    </>
  );
}
