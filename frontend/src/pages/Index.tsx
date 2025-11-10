import { useEffect, useState } from "react";
import { mockDetections, mockSystemStatus } from "@/lib/mockData";
import { Detection, DetectionType } from "@/types/detection";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { DetectionCard } from "@/components/Dashboard/DetectionCard";
import { SystemToggle } from "@/components/Dashboard/SystemToggle";
import { SpeciesTagDialog } from "@/components/Dashboard/SpeciesTagDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, AlertTriangle, Leaf, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { set } from "date-fns";
import { get } from "http";
import { useQuery } from '@tanstack/react-query';
import { getDetections } from '@/lib/api';

const Index = () => {
  const [detections, setDetections] = useState([]);
  const [systemStatus, setSystemStatus] = useState(mockSystemStatus);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<DetectionType | "all">("all");

  const filteredDetections = detections.filter(
    (d) => filter === "all" || d.type === filter
  );

  const wildlifeCount = detections.filter((d) => d.category === "wildlife").length;
  const intruderCount = detections.filter((d) => d.category === "intruder").length;
  const speciesCount = new Set(detections.map((d) => d.species).filter(Boolean)).size;

  useEffect(() => {
  getDetections()
    .then(setDetections)
    .catch(err => console.error('Error retrieving detections', err));
}, []);


  const handleToggleSystem = (armed: boolean) => {
    setSystemStatus({ ...systemStatus, armed });
    toast.success(armed ? "System armed" : "System disarmed");
  };

  const handleTagSpecies = (detection: Detection) => {
    setSelectedDetection(detection);
    setDialogOpen(true);
  };

  const handleSaveSpecies = (species: string) => {
    if (selectedDetection) {
      setDetections(
        detections.map((d) =>
          d.id === selectedDetection.id ? { ...d, species } : d
        )
      );
      toast.success("Species tagged successfully");
    }
    setDialogOpen(false);
    setSelectedDetection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
                {/* Use the public asset at /life-patrol-logo.png — Vite serves files in public/ at root */}
                <img
                  src="/life-patrol-logo.png"
                  alt="LifePatrol logo"
                  className="h-10 w-10 object-contain"
                />
              <div>
                <h1 className="text-2xl font-bold">LifePatrol Monitor</h1>
                <p className="text-sm text-muted-foreground">
                  Smart Detection & Conservation Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* System Toggle */}
        <SystemToggle armed={systemStatus.armed} onToggle={handleToggleSystem} />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Detections"
            value={systemStatus.totalDetections}
            icon={Camera}
            trend="+12% from last week"
          />
          <StatsCard
            title="Wildlife Spotted"
            value={wildlifeCount}
            icon={Leaf}
          />
          <StatsCard
            title="Intrusion Alerts"
            value={intruderCount}
            icon={AlertTriangle}
            variant="alert"
          />
          <StatsCard
            title="Species Identified"
            value={speciesCount}
            icon={TrendingUp}
          />
        </div>

        {/* Detection Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Detections</h2>
            <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                <TabsTrigger value="intruder">Intruders</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDetections.map((detection) => (
              <DetectionCard
                key={detection.id}
                detection={detection}
                onTagSpecies={handleTagSpecies}
              />
            ))}
          </div>

          {filteredDetections.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No detections found for this filter
            </div>
          )}
        </div>
      </main>

      {/* Species Tag Dialog */}
      <SpeciesTagDialog
        detection={selectedDetection}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveSpecies}
      />
    </div>
  );
};

export default Index;
