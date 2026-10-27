import { env } from '../config/env';

const DEFAULT_TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Cliente HTTP base: todas las llamadas de red pasan por aquí. */
export const request = async (path, { method = 'GET', body, timeout = DEFAULT_TIMEOUT_MS } = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(`${env.apiUrl}${path}`, {
      method,
      signal: controller.signal,
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
      credentials: 'include',
    });
    if (!response.ok) throw new ApiError('No se pudo completar la solicitud.', response.status);
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new ApiError('El servidor tardó demasiado en responder.', 0);
    throw error;
  } finally {
    clearTimeout(timer);
  }
};
