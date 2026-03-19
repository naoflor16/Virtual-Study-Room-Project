import React, { useMemo, useState } from 'react';

export default function LaptopMenu({ isOpen, onClose }) {
  const [tab, setTab] = useState('calendario');

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState('2026-03-13');

  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState('2026-03-13');
  const [taskTime, setTaskTime] = useState('08:00');
  const [taskType, setTaskType] = useState('tarea');

  const [alarmTitle, setAlarmTitle] = useState('');
  const [alarmDate, setAlarmDate] = useState('2026-03-13');
  const [alarmTime, setAlarmTime] = useState('09:00');

  const [classSubject, setClassSubject] = useState('');
  const [classDay, setClassDay] = useState('Lunes');
  const [classStart, setClassStart] = useState('08:00');
  const [classEnd, setClassEnd] = useState('10:00');
  const [classRoom, setClassRoom] = useState('');
  const [classColor, setClassColor] = useState('class-matcha');

  const [notes, setNotes] = useState(
    'Notas del día:\n- Revisar calendario\n- Probar alarmas\n- Organizar horario semanal'
  );

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Terminar avance del proyecto',
      done: false,
      date: '2026-03-13',
      time: '08:00',
      type: 'tarea',
    },
    {
      id: 2,
      text: 'Preparar exposición',
      done: true,
      date: '2026-03-13',
      time: '10:30',
      type: 'entrega',
    },
    {
      id: 3,
      text: 'Revisar la interfaz',
      done: false,
      date: '2026-03-14',
      time: '16:00',
      type: 'recordatorio',
    },
  ]);

  const [alarms, setAlarms] = useState([
    {
      id: 101,
      title: 'Clase en 15 min',
      date: '2026-03-13',
      time: '07:45',
      active: true,
    },
    {
      id: 102,
      title: 'Break terminado',
      date: '2026-03-13',
      time: '18:00',
      active: false,
    },
  ]);

  const [classes, setClasses] = useState([
    {
      id: 201,
      subject: 'Programación',
      dayName: 'Lunes',
      start: '08:00',
      end: '10:00',
      room: 'Aula 4',
      color: 'class-blue',
    },
    {
      id: 202,
      subject: 'Base de Datos',
      dayName: 'Martes',
      start: '14:00',
      end: '16:00',
      room: 'Laboratorio 2',
      color: 'class-strawberry',
    },
    {
      id: 203,
      subject: 'Marketing',
      dayName: 'Miércoles',
      start: '09:00',
      end: '11:00',
      room: 'Bloque B',
      color: 'class-matcha',
    },
    {
      id: 204,
      subject: 'Streaming',
      dayName: 'Jueves',
      start: '18:00',
      end: '20:00',
      room: 'Sala Multimedia',
      color: 'class-rose',
    },
  ]);

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const colorOptions = [
    { value: 'class-matcha', label: 'Matcha' },
    { value: 'class-strawberry', label: 'Strawberry' },
    { value: 'class-cream', label: 'Cream' },
    { value: 'class-butter', label: 'Butter' },
    { value: 'class-rose', label: 'Rose' },
    { value: 'class-lavender', label: 'Lavender' },
    { value: 'class-blue', label: 'Blue' },
  ];

  const toDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const formatShortDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getDayNameFromDateString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const jsDay = date.getDay();

    const map = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado',
    };

    return map[jsDay];
  };

  const getTypeLabel = (type) => {
    if (type === 'clase') return 'Clase';
    if (type === 'entrega') return 'Entrega';
    if (type === 'recordatorio') return 'Recordatorio';
    return 'Tarea';
  };

  const getTypeClass = (type) => {
    if (type === 'clase') return 'event-class';
    if (type === 'entrega') return 'event-delivery';
    if (type === 'recordatorio') return 'event-reminder';
    return 'event-task';
  };

  const getSortedClassesByDay = (day) => {
    return classes
      .filter((item) => item.dayName === day)
      .sort((a, b) => a.start.localeCompare(b.start));
  };

  const addTask = () => {
    const cleanText = taskText.trim();
    if (!cleanText) return;

    const newTask = {
      id: Date.now(),
      text: cleanText,
      done: false,
      date: taskDate || selectedDate,
      time: taskTime,
      type: taskType,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addAlarm = () => {
    const cleanTitle = alarmTitle.trim();
    if (!cleanTitle) return;

    const newAlarm = {
      id: Date.now(),
      title: cleanTitle,
      date: alarmDate,
      time: alarmTime,
      active: true,
    };

    setAlarms((prev) => [newAlarm, ...prev]);
    setAlarmTitle('');
  };

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((alarm) => (alarm.id === id ? { ...alarm, active: !alarm.active } : alarm))
    );
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  const addClass = () => {
    const cleanSubject = classSubject.trim();
    if (!cleanSubject) return;

    const newClass = {
      id: Date.now(),
      subject: cleanSubject,
      dayName: classDay,
      start: classStart,
      end: classEnd,
      room: classRoom,
      color: classColor,
    };

    setClasses((prev) =>
      [...prev, newClass].sort((a, b) => {
        if (a.dayName === b.dayName) return a.start.localeCompare(b.start);
        return weekDays.indexOf(a.dayName) - weekDays.indexOf(b.dayName);
      })
    );

    setClassSubject('');
    setClassRoom('');
    setClassStart('08:00');
    setClassEnd('10:00');
    setClassColor('class-matcha');
  };

  const deleteClass = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
  };

  const changeMonth = (direction) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let firstWeekDay = firstDayOfMonth.getDay();
    firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

    const totalCells = 42;
    const days = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstWeekDay + 1;
      const cellDate = new Date(year, month, dayNumber);
      const dateKey = toDateKey(cellDate);

      days.push({
        date: cellDate,
        dateKey,
        dayNumber: cellDate.getDate(),
        isCurrentMonth: cellDate.getMonth() === month,
      });
    }

    return days;
  }, [currentMonth]);

  const tasksForSelectedDay = tasks.filter((task) => task.date === selectedDate);

  const alarmsForSelectedDay = alarms.filter((alarm) => alarm.date === selectedDate);

  const classesForSelectedDay = classes
    .filter((item) => item.dayName === getDayNameFromDateString(selectedDate))
    .sort((a, b) => a.start.localeCompare(b.start));

  const eventsForCalendarDay = (dateKey) => {
    const dayTasks = tasks.filter((task) => task.date === dateKey);
    const dayAlarms = alarms.filter((alarm) => alarm.date === dateKey);
    const dayClasses = classes
      .filter((item) => item.dayName === getDayNameFromDateString(dateKey))
      .sort((a, b) => a.start.localeCompare(b.start));

    return { dayTasks, dayAlarms, dayClasses };
  };

  if (!isOpen) return null;

  return (
    <div className="widget-overlay">
      <div className="widget-box laptop-box giant-laptop-box">
        <div className="widget-header">
          <div>
            <p className="widget-tag">Zona de productividad</p>
            <h2 className="widget-title">💻 ESPACIO DE TRABAJO</h2>
          </div>
          <button className="close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="laptop-tabs colorful-tabs">
          <button
            className={`tab-button ${tab === 'lista' ? 'active-tab' : ''}`}
            onClick={() => setTab('lista')}
          >
            ✅ Lista
          </button>

          <button
            className={`tab-button ${tab === 'calendario' ? 'active-tab' : ''}`}
            onClick={() => setTab('calendario')}
          >
            📅 Calendario
          </button>

          <button
            className={`tab-button ${tab === 'alarmas' ? 'active-tab' : ''}`}
            onClick={() => setTab('alarmas')}
          >
            ⏰ Alarmas
          </button>

          <button
            className={`tab-button ${tab === 'horario' ? 'active-tab' : ''}`}
            onClick={() => setTab('horario')}
          >
            🎓 Horario
          </button>

          <button
            className={`tab-button ${tab === 'notas' ? 'active-tab' : ''}`}
            onClick={() => setTab('notas')}
          >
            📒 Notas
          </button>
        </div>

        <div className="laptop-content">
          {tab === 'lista' && (
            <div className="task-layout">
              <div className="task-note-card pretty-card">
                <h3 className="section-title">Mis tareas</h3>

                <div className="task-input-group better-grid">
                  <input
                    type="text"
                    placeholder="Escribe una tarea..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="task-input"
                  />

                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="task-date-input"
                  />

                  <input
                    type="time"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="task-date-input"
                  />

                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    className="task-date-input"
                  >
                    <option value="tarea">Tarea</option>
                    <option value="clase">Clase</option>
                    <option value="entrega">Entrega</option>
                    <option value="recordatorio">Recordatorio</option>
                  </select>

                  <button className="pixel-button" onClick={addTask}>
                    Agregar
                  </button>
                </div>

                <div className="task-list-board colorful-board">
                  {tasks.length === 0 ? (
                    <p className="empty-text">No hay tareas todavía.</p>
                  ) : (
                    tasks.map((task) => (
                      <div key={task.id} className="task-row-card prettier-row">
                        <label className="task-check-line">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                          />
                          <div>
                            <span className={`main-strong-text ${task.done ? 'task-done' : ''}`}>
                              {task.text}
                            </span>

                            <div className="task-row-extra">
                              <span className={`event-pill ${getTypeClass(task.type)}`}>
                                {getTypeLabel(task.type)}
                              </span>
                              <span className="task-date-badge">
                                {formatShortDate(task.date)} · {task.time}
                              </span>
                            </div>
                          </div>
                        </label>

                        <div className="task-meta">
                          <button
                            className="task-delete-button"
                            onClick={() => deleteTask(task.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="task-side-info">
                <div className="mini-info-card soft-pink">
                  <h4>COLORES</h4>
                  <p>Clasifica tareas, entregas y recordatorios.</p>
                </div>

                <div className="mini-info-card soft-green">
                  <h4>CHECK</h4>
                  <p>Marca tus tareas completadas para ver tu avance.</p>
                </div>

                <div className="mini-info-card soft-blue">
                  <h4>ENLACE</h4>
                  <p>Todo se conecta con calendario, horario y alarmas.</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'calendario' && (
            <div className="calendar-page colorful-calendar-page">
              <div className="calendar-topbar">
                <div>
                  <p className="calendar-mini-label">Plan mensual</p>
                  <h3 className="calendar-main-title">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <span className="calendar-subtitle">
                    Tareas, clases y recordatorios organizados por día
                  </span>
                </div>

                <div className="calendar-top-actions">
                  <button className="mini-top-btn" onClick={() => changeMonth(-1)}>
                    ← Mes anterior
                  </button>
                  <button className="mini-top-btn" onClick={() => changeMonth(1)}>
                    Mes siguiente →
                  </button>
                </div>
              </div>

              <div className="calendar-header-box colorful-header-box">
                <div>
                  <p className="calendar-mini-label">Día seleccionado</p>
                  <h3>{selectedDate}</h3>
                </div>
                <div className="selected-date-pill">{getDayNameFromDateString(selectedDate)}</div>
              </div>

              <div className="calendar-main-grid wide-calendar-grid">
                <div className="calendar-month-board">
                  <div className="calendar-week-header">
                    {weekDays.map((day) => (
                      <div key={day} className="weekday-label">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="calendar-month-grid">
                    {calendarDays.map((dayItem) => {
                      const { dayTasks, dayAlarms, dayClasses } = eventsForCalendarDay(dayItem.dateKey);
                      const isActive = selectedDate === dayItem.dateKey;

                      return (
                        <button
                          key={dayItem.dateKey}
                          className={`month-day-cell ${
                            dayItem.isCurrentMonth ? 'current-month-day' : 'other-month-day'
                          } ${isActive ? 'selected-month-day' : ''}`}
                          onClick={() => setSelectedDate(dayItem.dateKey)}
                        >
                          <div className="month-day-number">{dayItem.dayNumber}</div>

                          <div className="month-day-events">
                            {dayClasses.slice(0, 2).map((item) => (
                              <div key={item.id} className={`mini-event-chip mini-class-chip ${item.color}`}>
                                {item.start} {item.subject}
                              </div>
                            ))}

                            {dayTasks.slice(0, 2).map((task) => (
                              <div key={task.id} className={`mini-event-chip ${getTypeClass(task.type)}`}>
                                {task.time} {task.text}
                              </div>
                            ))}

                            {dayAlarms.slice(0, 1).map((alarm) => (
                              <div key={alarm.id} className="mini-event-chip alarm-mini-chip">
                                ⏰ {alarm.time} {alarm.title}
                              </div>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="calendar-detail-panel extra-pretty-panel">
                  <h4 className="agenda-title">Agenda del {selectedDate}</h4>

                  <div className="day-section-block">
                    <h5>📚 Clases</h5>
                    {classesForSelectedDay.length === 0 ? (
                      <p className="empty-text">No hay clases para este día.</p>
                    ) : (
                      <div className="calendar-task-list">
                        {classesForSelectedDay.map((item) => (
                          <div key={item.id} className={`calendar-event-card ${item.color}`}>
                            <div>
                              <strong>{item.subject}</strong>
                              <p>
                                {item.start} - {item.end}
                                {item.room ? ` · ${item.room}` : ''}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="day-section-block">
                    <h5>📝 Tareas y eventos</h5>
                    {tasksForSelectedDay.length === 0 ? (
                      <p className="empty-text">No hay tareas para este día.</p>
                    ) : (
                      <div className="calendar-task-list">
                        {tasksForSelectedDay.map((task) => (
                          <div key={task.id} className={`calendar-event-card ${getTypeClass(task.type)}`}>
                            <div>
                              <strong>{task.text}</strong>
                              <p>
                                {task.time} · {getTypeLabel(task.type)} · {task.done ? 'Hecho' : 'Pendiente'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="day-section-block">
                    <h5>⏰ Alarmas</h5>
                    {alarmsForSelectedDay.length === 0 ? (
                      <p className="empty-text">No hay alarmas para este día.</p>
                    ) : (
                      <div className="calendar-task-list">
                        {alarmsForSelectedDay.map((alarm) => (
                          <div
                            key={alarm.id}
                            className={`calendar-event-card ${
                              alarm.active ? 'alarm-on-card' : 'alarm-off-card'
                            }`}
                          >
                            <div>
                              <strong>{alarm.title}</strong>
                              <p>{alarm.time} · {alarm.active ? 'Activa' : 'Apagada'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'alarmas' && (
            <div className="alarm-page">
              <div className="content-card pretty-card">
                <h3 className="section-title">Alarmas y recordatorios</h3>

                <div className="task-input-group better-grid">
                  <input
                    type="text"
                    placeholder="Ej: Clase en 15 min"
                    value={alarmTitle}
                    onChange={(e) => setAlarmTitle(e.target.value)}
                    className="task-input"
                  />

                  <input
                    type="date"
                    value={alarmDate}
                    onChange={(e) => setAlarmDate(e.target.value)}
                    className="task-date-input"
                  />

                  <input
                    type="time"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className="task-date-input"
                  />

                  <button className="pixel-button" onClick={addAlarm}>
                    Crear alarma
                  </button>
                </div>

                <div className="alarm-list">
                  {alarms.length === 0 ? (
                    <p className="empty-text">No tienes alarmas todavía.</p>
                  ) : (
                    alarms.map((alarm) => (
                      <div key={alarm.id} className="alarm-row">
                        <div>
                          <strong className="main-strong-text">{alarm.title}</strong>
                          <p>
                            {alarm.date} · {alarm.time}
                          </p>
                        </div>

                        <div className="alarm-actions">
                          <button
                            className={`alarm-toggle ${alarm.active ? 'alarm-active' : 'alarm-inactive'}`}
                            onClick={() => toggleAlarm(alarm.id)}
                          >
                            {alarm.active ? 'Activa' : 'Apagada'}
                          </button>
                          <button
                            className="task-delete-button"
                            onClick={() => deleteAlarm(alarm.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === 'horario' && (
            <div className="schedule-page compact-schedule-page">
              <div className="schedule-intro">
                <div>
                  <p className="calendar-mini-label">Planner semanal</p>
                  <h3 className="schedule-main-title">Horario de clases</h3>
                  <span className="calendar-subtitle">
                    Se conecta automáticamente con el calendario
                  </span>
                </div>

                <div className="schedule-color-dots">
                  <span className="mini-color-pill class-matcha">Matcha</span>
                  <span className="mini-color-pill class-strawberry">Strawberry</span>
                  <span className="mini-color-pill class-cream">Cream</span>
                  <span className="mini-color-pill class-rose">Rose</span>
                </div>
              </div>

              <div className="compact-schedule-top">
                <div className="schedule-form-box">
                  <div className="compact-schedule-form">
                    <input
                      type="text"
                      placeholder="Materia"
                      value={classSubject}
                      onChange={(e) => setClassSubject(e.target.value)}
                      className="task-input"
                    />

                    <select
                      value={classDay}
                      onChange={(e) => setClassDay(e.target.value)}
                      className="task-date-input"
                    >
                      {weekDays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <input
                      type="time"
                      value={classStart}
                      onChange={(e) => setClassStart(e.target.value)}
                      className="task-date-input"
                    />

                    <input
                      type="time"
                      value={classEnd}
                      onChange={(e) => setClassEnd(e.target.value)}
                      className="task-date-input"
                    />

                    <input
                      type="text"
                      placeholder="Aula / lugar"
                      value={classRoom}
                      onChange={(e) => setClassRoom(e.target.value)}
                      className="task-input"
                    />

                    <select
                      value={classColor}
                      onChange={(e) => setClassColor(e.target.value)}
                      className="task-date-input"
                    >
                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <button className="pixel-button" onClick={addClass}>
                      Agregar clase
                    </button>
                  </div>
                </div>

                <div className="schedule-preview-mini">
                  <p className="schedule-preview-title">Vista previa</p>
                  <div className={`schedule-preview-mini-card ${classColor}`}>
                    <strong>{classSubject || 'Materia'}</strong>
                    <span>
                      {classDay} · {classStart} - {classEnd}
                    </span>
                    <small>{classRoom || 'Aula / lugar'}</small>
                  </div>
                </div>
              </div>

              <div className="compact-week-grid">
                {weekDays.map((day) => {
                  const dayClasses = getSortedClassesByDay(day);

                  return (
                    <div key={day} className="compact-day-column">
                      <div className="compact-day-header">
                        <h4>{day}</h4>
                        <span>{dayClasses.length}</span>
                      </div>

                      <div className="compact-day-list">
                        {dayClasses.length === 0 ? (
                          <p className="compact-empty-text">Sin clases</p>
                        ) : (
                          dayClasses.map((item) => (
                            <div key={item.id} className={`compact-class-card ${item.color}`}>
                              <button
                                className="mini-delete-class"
                                onClick={() => deleteClass(item.id)}
                              >
                                ✕
                              </button>

                              <strong>{item.subject}</strong>
                              <p>
                                {item.start} - {item.end}
                              </p>
                              {item.room && <span>{item.room}</span>}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'notas' && (
            <div className="content-card pretty-card">
              <h3 className="section-title">Cuadernito</h3>
              <textarea
                className="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escribe tus notas aquí..."
              />
            </div>
          )}
        </div>

        <div className="widget-actions">
          <button className="pixel-button" onClick={onClose}>
            Portátil Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}