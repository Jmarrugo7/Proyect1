'use client';

import Link from 'next/link';

export default function ConfirmacionPage() {
  return (
    <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
      <span className="section-label">Confirmación</span>
      <div className="divider-gold" />
      <h2 style={{ marginBottom: '1.5rem' }}>✅ ¡Reserva confirmada!</h2>
      <p style={{ maxWidth: '500px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
        Tu cita ha sido registrada exitosamente.  
        Recibirás un correo electrónico y un mensaje de WhatsApp con los detalles de tu reserva.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/" className="btn btn-outline">Volver al inicio</Link>
        <Link href="/reservar" className="btn btn-primary">Nueva reserva</Link>
      </div>
    </div>
  );
}
