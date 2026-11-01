export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new ApiError(0, 'EXPO_PUBLIC_API_URL is not set (see .env.local)');
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new ApiError(0, 'Cannot reach the server');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, typeof body === 'string' ? body : response.statusText);
  }
  return response.json();
}

export function apiGet<T>(path: string) {
  return request<T>(path);
}

function sendJson<T>(method: 'POST' | 'PUT', path: string, body: unknown) {
  return request<T>(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function apiPost<T>(path: string, body: unknown) {
  return sendJson<T>('POST', path, body);
}

export function apiPut<T>(path: string, body: unknown) {
  return sendJson<T>('PUT', path, body);
}
