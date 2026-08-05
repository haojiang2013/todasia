'use client';

import { useState } from 'react';

export default function ToolIcon({ domain, name, size = 48, originTag }: {
  domain: string; name: string; size?: number; originTag: string;
}) {
  const [error, setError] = useState(false);
  const isES = originTag === 'tag-es';
  const pad = Math.round(size * 0.17);

  return (
    <div style={{
      width: size, height: size, borderRadius: 'var(--radius-sm)', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 900, fontSize: Math.round(size * 0.375),
      background: isES ? 'var(--es-red-bg)' : 'var(--global-blue-bg)',
      color: isES ? 'var(--es-red)' : 'var(--global-blue)',
      position: 'relative', overflow: 'hidden'
    }}>
      {error ? (
        <span>{name.charAt(0)}</span>
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
            padding: pad, background: '#fff', borderRadius: 'inherit'
          }}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
