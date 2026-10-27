import { describe, it, expect } from 'vitest';
import { registrationService, toRecord } from './registrationService';
import { initialValues } from '../utils/initialValues';

describe('registrationService (modo demo)', () => {
  it('guarda una inscripción y la devuelve al listar', async () => {
    const created = await registrationService.create({ ...initialValues, firstName: 'Ana', idNumber: '102340567' });
    expect(created.status).toBe('pendiente');
    const list = await registrationService.list();
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ firstName: 'Ana', idNumber: '102340567' });
    expect(await registrationService.getById(created.id)).toMatchObject({ id: created.id });
  });

  it('actualiza el estado', async () => {
    const created = await registrationService.create(initialValues);
    const updated = await registrationService.updateStatus(created.id, 'aprobado');
    expect(updated.status).toBe('aprobado');
  });

  it('convierte archivos a metadatos', () => {
    const file = new File(['x'], 'cedula.png', { type: 'image/png' });
    expect(toRecord({ ...initialValues, idDocument: file }).idDocument).toEqual({ name: 'cedula.png', size: 1, type: 'image/png' });
  });
});
