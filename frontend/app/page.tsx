'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const SERVICES = [
  { name: 'Corte',    price: '$25.000', desc: 'Corte clásico o moderno a tu medida' },
  { name: 'Barba',    price: '$10.000', desc: 'Perfilado y arreglo completo de barba' },
  { name: 'Cejas',    price: '$5.000',  desc: 'Depilación y diseño de cejas' },
];

const SCHEDULE = [
  { day: 'Lunes',      hours: '9:00 AM – 7:00 PM' },
  { day: 'Martes',     hours: 'Cerrado',           closed: true },
  { day: 'Miércoles',  hours: '9:00 AM – 7:00 PM' },
  { day: 'Jueves',     hours: '9:00 AM – 7:00 PM' },
  { day: 'Viernes',    hours: '9:00 AM – 7:00 PM' },
  { day: 'Sábado',     hours: '9:00 AM – 5:00 PM' },
  { day: 'Domingo',    hours: '10:00 AM – 3:00 PM' },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.2rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontStyle: 'italic',
          color: 'var(--gold)',
          letterSpacing: '0.05em',
        }}>
          Barber Shop
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#servicios" className="btn btn-ghost" style={{ padding: '0.5rem 1.2rem', fontSize: '0.6rem' }}>
            Servicios
          </a>
          <Link href="/reservar" className="btn btn-primary">
            Reservar
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="animate-fade-up delay-1" style={{ marginBottom: '1.5rem' }}>
          <span className="section-label">Est. 2020 · Maestros del estilo</span>
          <div className="gold-line" style={{ height: '40px', margin: '1rem auto' }} />
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          maxWidth: '800px',
          marginBottom: '1.5rem',
          color: 'var(--white)',
        }}>
          El arte de verse<br />
          <span style={{ color: 'var(--gold)' }}>extraordinario</span>
        </h1>

        <p className="animate-fade-up delay-3" style={{
          maxWidth: '480px',
          marginBottom: '3rem',
          fontSize: '0.9rem',
          lineHeight: '1.9',
        }}>
          Reserva tu cita en minutos. Elige tus servicios, selecciona el horario
          que más te convenga y recibe confirmación instantánea.
        </p>

        <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/reservar" className="btn btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '0.7rem' }}>
            ✦ Reservar ahora
          </Link>
          <a href="#servicios" className="btn btn-outline">
            Ver servicios
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.4,
        }}>
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* ═══ SERVICIOS ═══ */}
      <section id="servicios" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-label">Nuestros Servicios</span>
            <div className="divider-gold" />
            <h2>Precios claros,<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>resultados precisos</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {SERVICES.map((s, i) => (
              <div key={s.name} className="card" style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontStyle: 'italic',
                  color: 'var(--gold)',
                  marginBottom: '0.5rem',
                  lineHeight: 1,
                }}>
                  {s.price}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{s.name}</h3>
                <p style={{ fontSize: '0.82rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/reservar" className="btn btn-primary">
              Reservar cita →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HORARIOS ═══ */}
      <section style={{
        padding: '6rem 2rem',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Horario de Atención</span>
            <div className="divider-gold" />
            <h2>¿Cuándo nos visitas?</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {SCHEDULE.map((s) => (
              <div key={s.day} className="service-row" style={{
                opacity: s.closed ? 0.45 : 1,
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-primary)',
                }}>
                  {s.day}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: s.closed ? 'var(--error)' : 'var(--gold)',
                }}>
                  {s.hours}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem 1.5rem',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}>
            ⚠ Horario de almuerzo: 12:00 PM – 1:00 PM no disponible para reservas
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section style={{
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span className="section-label">Tu momento</span>
        <div className="divider-gold" />
        <h2 style={{ marginBottom: '1.5rem' }}>
          Reserva en menos<br />
          <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>de dos minutos</span>
        </h2>
        <p style={{ marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Recibe confirmación instantánea por correo y WhatsApp. Sin llamadas, sin esperas.
        </p>
        <Link href="/reservar" className="btn btn-primary" style={{ padding: '1.1rem 3.5rem' }}>
          ✦ Agendar mi cita
        </Link>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '1rem' }}>
          La Barbería
        </span>
        <span style={{ margin: '0 1rem', color: 'var(--border)' }}>|</span>
        Todos los derechos reservados © {new Date().getFullYear()}
      </footer>
    </>
  );
}
