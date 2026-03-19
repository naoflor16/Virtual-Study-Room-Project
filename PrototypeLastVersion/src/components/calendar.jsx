export default function CalendarWidget({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="widget-overlay">
      <div className="widget-box">
        <h2>📅 AGENDA SEMANAL</h2>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Lunes: Clase de Programación</li>
          <li>Miércoles: Proyecto Persona 5</li>
          <li>Viernes: Entrega Final</li>
        </ul>
        <button onClick={onClose} style={{ marginTop: '15px' }}>Cerrar</button>
      </div>
    </div>
  );
}