import Link from 'next/link';
import { Logo } from '@/components/ui';

export default function Home() {
  return (
    <main className="screen white">
      <div className="row" style={{ justifyContent: 'flex-start' }}>
        <Logo size={64} decorative />
        <div className="stack" style={{ gap: 0 }}>
          <span className="display" style={{ fontSize: 22 }}>Hoshito</span>
          <span className="small muted">Sushi japo-mex · Minatitlán</span>
        </div>
      </div>
      <h1 className="display h1">Tarjeta de cliente frecuente</h1>
      <p className="muted">
        Para registrarte o sumar un sello, acerca tu teléfono a la etiqueta de tu mesa o escanea el código QR en el restaurante.
      </p>
      <Link className="btn wide" href="/mi-tarjeta">Ver mi tarjeta</Link>
      <p className="small muted center push">
        <Link href="/staff/login">Acceso del personal</Link> · <Link href="/privacidad">Aviso de privacidad</Link>
      </p>
    </main>
  );
}
