'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SERVICES = [
  { name: 'Corte', price: 25000 },
  { name: 'Barba', price: 10000 },
  { name: 'Cejas', price: 5000 },
];

// Horarios por día (bloque de apertura/cierre)
const SCHEDULE: Record<string, { start: number; end: number }> = {
  Lunes: { start: 9, end: 19 },
  Martes: { start: 0, end: 0 }, // cerrado
  Miércoles: { start: 9, end: 19 },
  Jueves: { start: 9, end: 19 },
  Viernes: { start: 9, end: 19 },
  Sábado: { start: 9, end: 17 },
  Domingo: { start: 10, end: 15 },
};

// Genera intervalos de 1 hora excluyendo almuerzo
function generateSlots(day: string) {
  const config = SCHEDULE[day];
  if (!config || config.start === 0) return [];
  const slots: string[] = [];
  for (let h = config.start; h < config.end; h++) {
    if (h === 12) continue; // excluir almuerzo
    const start = new Date(0, 0, 0, h, 0);
    const end = new Date(0, 0, 0, h + 1, 0);
    const fmt = (d: Date) =>
      d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    slots.push(`${fmt(start)} - ${fmt(end)}`);
  }
  return slots;
}

export default function ReservarPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const total = selectedServices.reduce((acc, s) => {
    const service = SERVICES.find(x => x.name === s);
    return acc + (service?.price || 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !date || !time || selectedServices.length === 0) {
      alert('Por favor completa todos los campos');
      return;
    }
    router.push('/confirmacion');
  };

  // Determinar día de la semana seleccionado
  const dayName = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long' })
    : '';
  const slots = dayName ? generateSlots(capitalize(dayName)) : [];

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <span className="section-label">Reserva tu cita</span>
      <div className="divider-gold" />
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Agenda en minutos</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <div>
          <label className="field-label">Nombre completo</label>
          <input
            type="text"
            className="input-field"
            placeholder="Ej: Juan Pérez"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="field-label">Correo electrónico</label>
          <input
            type="email"
            className="input-field"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="field-label">WhatsApp</label>
          <input
            type="tel"
            className="input-field"
            placeholder="+57 300 000 0000"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="field-label">Fecha</label>
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        {dayName && (
          <div>
            <label className="field-label">Horario disponible</label>
            {dayName === 'martes' ? (
              <p style={{ color: 'var(--error)' }}>⚠ Los martes no hay atención</p>
            ) : (
              <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '0.8rem',
                    marginTop: '0.5rem',
                }}
                >
                {slots.map(slot => {
                    const selected = time === slot;

                    return (
                    <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        style={{
                        padding: '0.9rem',
                        borderRadius: '12px',
                        border: selected
                            ? '2px solid var(--gold)'
                            : '1px solid rgba(255,255,255,0.1)',
                        background: selected
                            ? 'rgba(212, 175, 55, 0.15)'
                            : 'rgba(255,255,255,0.03)',
                        color: selected ? 'var(--gold)' : 'white',
                        fontWeight: selected ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        backdropFilter: 'blur(6px)',
                        }}
                    >
                        {slot}
                    </button>
                    );
                })}
                </div>
            )}
          </div>
        )}

        <div>
          <label className="field-label">Servicios</label>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {SERVICES.map(s => (
              <label key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(s.name)}
                  onChange={() => toggleService(s.name)}
                />
                <span>{s.name} (${s.price.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontWeight: 600 }}>
          Total: ${total.toLocaleString()}
        </div>

        <button type="submit" className="btn btn-primary">Confirmar reserva</button>
      </form>
    </div>
  );
}
