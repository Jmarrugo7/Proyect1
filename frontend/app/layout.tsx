import type { Metadata } from 'next';
import './globals.css';
 
export const metadata: Metadata = {
  title: 'Barbería — Reserva tu Cita',
  description: 'Reserva tu cita de forma rápida y sencilla. Cortes, barba y cejas con los mejores profesionales.',
  openGraph: {
    title: 'Barbería — Reserva tu Cita',
    description: 'Agenda tu próxima cita en segundos.',
    type: 'website',
  },
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-texture">
        {children}
      </body>
    </html>
  );
}
