export type DetectionCategory = "wildlife" | "intruder" | "unknown";

export interface Detection {
  _id: string;
  timestamp: Date;
  category: DetectionCategory;
  imageUrl: string;
  tags?: string[];
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
