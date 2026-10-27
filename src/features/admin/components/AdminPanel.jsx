import { useState } from 'react';
import { Link } from 'react-router-dom';
import { env } from '../../../config/env';
import { courses } from '../../../config/content';
import { REGISTRATION_STATUS, PERMIT_STATUS, labelOf } from '../../registration';
import { useRegistrations } from '../hooks/useRegistrations';
import { maskValue } from '../utils/mask';
import { RegistrationDetail } from './RegistrationDetail';
import styles from './AdminPanel.module.css';

const courseTitle = (id) => courses.find((c) => c.id === id)?.title ?? '—';

export const AdminPanel = () => {
  const { items, total, loading, error, query, setQuery, statusFilter, setStatusFilter, updateStatus } = useRegistrations();
  const [selectedId, setSelectedId] = useState(null);
  const selected = items.find((r) => r.id === selectedId);

  return (
    <main className={`container ${styles.panel}`}>
      <header className={styles.head}>
        <div>
          <Link to="/" className={styles.back}>← Volver al sitio</Link>
          <h1>Inscripciones</h1>
          <p className={styles.muted}>{total} registradas{env.useMockApi && ' · modo demo (datos guardados en este navegador)'}</p>
        </div>
        <div className={styles.filters}>
          <label className="visually-hidden" htmlFor="admin-search">Buscar</label>
          <input id="admin-search" type="search" placeholder="Buscar por nombre, cédula o correo" value={query}
            onChange={(e) => setQuery(e.target.value)} />
          <label className="visually-hidden" htmlFor="admin-status">Estado</label>
          <select id="admin-status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos los estados</option>
            {REGISTRATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </header>

      {loading && <p>Cargando…</p>}
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {!loading && !error && items.length === 0 && <p className={styles.muted}>No hay inscripciones que coincidan.</p>}

      <div className={styles.layout}>
        {items.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr><th>Nombre</th><th>Identificación</th><th>Curso</th><th>Permiso</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className={r.id === selectedId ? styles.selected : ''}>
                  <td>
                    <button type="button" className={styles.linkBtn} onClick={() => setSelectedId(r.id)}>
                      {r.firstName} {r.lastName}
                    </button>
                  </td>
                  <td>{maskValue(r.idNumber)}</td>
                  <td>{courseTitle(r.courseId)}</td>
                  <td>{labelOf(PERMIT_STATUS, r.permitStatus)}</td>
                  <td><span className={`${styles.status} ${styles[r.status]}`}>{labelOf(REGISTRATION_STATUS, r.status)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selected && (
          <RegistrationDetail key={selected.id} registration={selected} onStatusChange={updateStatus} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </main>
  );
};
