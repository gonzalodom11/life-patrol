import { Detection } from '@/types/detection';

const API_BASE = import.meta.env.VITE_API_URL;

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

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

export default {
  getDetections,
  getDetectionsByDevice,
  getLatestByDevice,
  getTags,
};
