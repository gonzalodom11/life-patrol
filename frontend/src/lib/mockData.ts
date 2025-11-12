import { Detection, SystemStatus } from "@/types/detection";

export const mockDetections: Detection[] = [
  {
    _id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "wildlife",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    species: "Domestic Cat",
    confidence: 0.95,
    temperature: 22,
    humidity: 65,
  },
  {
    _id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "wildlife",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    species: "Dog",
    confidence: 0.92,
    temperature: 21,
    humidity: 68,
  },
  {
    _id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "intruder",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    confidence: 0.88,
    temperature: 20,
    humidity: 70,
  },
  {
    _id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    type: "wildlife",
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
    species: "Bird",
    confidence: 0.87,
    temperature: 19,
    humidity: 72,
  },
  {
    _id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: "wildlife",
    imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400",
    species: "Squirrel",
    confidence: 0.91,
    temperature: 18,
    humidity: 75,
  },
];

export const mockSystemStatus: SystemStatus = {
  armed: true,
  lastUpdate: new Date(),
  activeAlerts: 1,
  totalDetections: 47,
};
