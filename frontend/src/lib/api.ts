import { Detection } from '@/types/detection';

const API_BASE = import.meta.env.VITE_API_URL;

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

// Auth helper to get token from localStorage
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Authentication APIs
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  message?: string;
}

export interface SessionResponse {
  user: AuthUser;
}

export async function signup(username: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await handleRes<AuthResponse>(res);
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleRes<AuthResponse>(res);
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  return data;
}

export async function getSession(): Promise<SessionResponse | null> {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/session`, {
      headers: getAuthHeaders(),
    });
    return await handleRes<SessionResponse>(res);
  } catch (error) {
    // If session is invalid, clear token
    localStorage.removeItem('auth_token');
    return null;
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem('auth_token');
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
}

// Detection APIs
export async function getDetections(): Promise<Detection[]> {
  const res = await fetch(`${API_BASE}/api/sensor/data`);
  return handleRes<Detection[]>(res);
}

export async function getDetectionsByDevice(deviceId: string): Promise<Detection[]> {
  const res = await fetch(`${API_BASE}/api/sensor/data/${encodeURIComponent(deviceId)}`);
  return handleRes<Detection[]>(res);
}

export async function getLatestByDevice(deviceId: string): Promise<Detection | null> {
  const res = await fetch(`${API_BASE}/api/sensor/data/latest/${encodeURIComponent(deviceId)}`);
  return handleRes<Detection | null>(res);
}

export async function getTags(category: string): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/sensor/tags/${encodeURIComponent(category)}`);
  return handleRes<string[]>(res);
}

export async function updateDetectionTags(detectionId: string, tags: string[]): Promise<Detection> {
  const res = await fetch(`${API_BASE}/api/sensor/data/${encodeURIComponent(detectionId)}/tags`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags }),
  });
  return handleRes<Detection>(res);
}

export default {
  signup,
  login,
  getSession,
  logout,
  getDetections,
  getDetectionsByDevice,
  getLatestByDevice,
  getTags,
  updateDetectionTags,
};
