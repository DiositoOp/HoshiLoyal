'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  ['/admin', 'Resumen'],
  ['/admin/clientes', 'Clientes'],
  ['/admin/promocion', 'Promoción'],
];

export default function AdminTabs() {
  const path = usePathname();
  return (
    <nav className="tabs" aria-label="Secciones">
      {TABS.map(([href, label]) => (
        <Link key={href} href={href} className={path === href ? 'on' : ''} aria-current={path === href ? 'page' : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
