import { env } from '../../../config/env';
import { request } from '../../../services/httpClient';

const STORAGE_KEY = 'oldemar.registrations';
const FILE_FIELDS = ['idDocument', 'permitDocument'];

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};
const writeStore = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
const newId = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()));

/** En modo demo los archivos se guardan solo como metadatos (nombre, tamaño, tipo). */
export const toRecord = (values) => {
  const record = { ...values };
  FILE_FIELDS.forEach((field) => {
    const file = values[field];
    record[field] = file ? { name: file.name, size: file.size, type: file.type } : null;
  });
  return record;
};

const toFormData = (values) => {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    data.append(key, value instanceof File ? value : String(value));
  });
  return data;
};

const mockApi = {
  async create(values) {
    const item = { id: newId(), createdAt: new Date().toISOString(), status: 'pendiente', ...toRecord(values) };
    writeStore([item, ...readStore()]);
    return item;
  },
  async list() {
    return readStore();
  },
  async getById(id) {
    const item = readStore().find((r) => r.id === id);
    if (!item) throw new Error('Inscripción no encontrada.');
    return item;
  },
  async updateStatus(id, status) {
    const items = readStore().map((r) => (r.id === id ? { ...r, status } : r));
    writeStore(items);
    return items.find((r) => r.id === id);
  },
};

/** Contrato esperado del backend (ver README). */
const httpApi = {
  create: (values) => request('/registrations', { method: 'POST', body: toFormData(values) }),
  list: () => request('/registrations'),
  getById: (id) => request(`/registrations/${encodeURIComponent(id)}`),
  updateStatus: (id, status) =>
    request(`/registrations/${encodeURIComponent(id)}`, { method: 'PATCH', body: { status } }),
};

export const registrationService = env.useMockApi ? mockApi : httpApi;
