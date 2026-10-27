import { describe, it, expect } from 'vitest';
import { isValidId, ageOn, isValidPhone, validateStep } from './validation';
import { initialValues } from './initialValues';

const TODAY = new Date('2026-10-26T12:00:00');

describe('isValidId', () => {
  it('acepta cédula de 9 dígitos con o sin guiones', () => {
    expect(isValidId('cedula', '1-0234-0567')).toBe(true);
    expect(isValidId('cedula', '102340567')).toBe(true);
  });
  it('rechaza cédulas con largo o caracteres inválidos', () => {
    expect(isValidId('cedula', '12345')).toBe(false);
    expect(isValidId('cedula', '1-0234-056A')).toBe(false);
  });
  it('valida DIMEX y pasaporte', () => {
    expect(isValidId('dimex', '155812345678')).toBe(true);
    expect(isValidId('dimex', '1558123')).toBe(false);
    expect(isValidId('pasaporte', 'AB123456')).toBe(true);
    expect(isValidId('pasaporte', 'AB-12')).toBe(false);
  });
});

describe('ageOn', () => {
  it('calcula la edad respetando el cumpleaños', () => {
    expect(ageOn('2008-10-26', TODAY)).toBe(18);
    expect(ageOn('2008-10-27', TODAY)).toBe(17);
    expect(ageOn('', TODAY)).toBeNaN();
  });
});

describe('isValidPhone', () => {
  it('acepta 8 dígitos o formato internacional', () => {
    expect(isValidPhone('8888-8888')).toBe(true);
    expect(isValidPhone('+506 8888 8888')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });
});

describe('validateStep', () => {
  it('bloquea a menores de edad en datos personales', () => {
    const errors = validateStep(0, { ...initialValues, birthDate: '2010-01-01' }, TODAY);
    expect(errors.birthDate).toMatch(/mayor de 18/);
  });

  it('exige número y vencimiento cuando el permiso está vigente', () => {
    const errors = validateStep(1, { ...initialValues, permitStatus: 'vigente', psychExam: 'aprobado', practicalExam: 'aprobado' }, TODAY);
    expect(errors.permitNumber).toBeDefined();
    expect(errors.permitExpiry).toBeDefined();
  });

  it('detecta permiso vencido por fecha', () => {
    const errors = validateStep(1, {
      ...initialValues, permitStatus: 'vigente', permitNumber: 'P-1', permitExpiry: '2025-01-01', psychExam: 'aprobado', practicalExam: 'aprobado',
    }, TODAY);
    expect(errors.permitExpiry).toMatch(/vencido/);
  });

  it('no pide datos de permiso si la persona no tiene', () => {
    const errors = validateStep(1, { ...initialValues, permitStatus: 'no', psychExam: 'no', practicalExam: 'no' }, TODAY);
    expect(errors).toEqual({});
  });

  it('rechaza archivos de tipo o tamaño no permitido', () => {
    const big = { name: 'x.pdf', type: 'application/pdf', size: 6 * 1024 * 1024 };
    const exe = { name: 'x.exe', type: 'application/x-msdownload', size: 10 };
    expect(validateStep(3, { ...initialValues, idDocument: big }, TODAY).idDocument).toMatch(/5 MB/);
    expect(validateStep(3, { ...initialValues, idDocument: exe }, TODAY).idDocument).toMatch(/Formato/);
  });
});
