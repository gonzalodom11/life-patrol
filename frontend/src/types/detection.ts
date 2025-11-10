export type DetectionType = "wildlife" | "intruder" | "unknown";

export interface Detection {
  id: string;
  timestamp: Date;
  type: DetectionType;
  imageUrl: string;
  species?: string;
  confidence: number;
  temperature?: number;
  humidity?: number;
  location?: string;
}

export interface SystemStatus {
  armed: boolean;
  lastUpdate: Date;
  activeAlerts: number;
  totalDetections: number;
}
