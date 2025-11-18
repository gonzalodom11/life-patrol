import { useEffect, useState } from "react";
import { mockDetections, mockSystemStatus } from "@/lib/mockData";
import { Detection, DetectionCategory } from "@/types/detection";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { DetectionCard } from "@/components/Dashboard/DetectionCard";
import { SystemToggle } from "@/components/Dashboard/SystemToggle";
import { SpeciesTagDialog } from "@/components/Dashboard/SpeciesTagDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Camera, AlertTriangle, Leaf, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { getDetections, getTags } from '@/lib/api';

const Index = () => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [systemStatus, setSystemStatus] = useState(mockSystemStatus);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<DetectionCategory | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredDetections = detections.filter(
    (d) => filter === "all" || d.category === filter
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredDetections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDetections = filteredDetections.slice(startIndex, endIndex);

  const wildlifeCount = detections.filter((d) => d.category === "wildlife").length;
  const intruderCount = detections.filter((d) => d.category === "intruder").length;
  const speciesCount = new Set(species).size;

  
  const fetchDetections = async () => {
    try {
      const data = await getDetections();
      // Backend already sorts by timestamp DESC, but we sort client-side
      // as a safeguard to ensure consistent chronological ordering
      const sorted = (data || []).slice().sort((a, b) => {
        const aDate = new Date(a.timestamp).getTime();
        const bDate = new Date(b.timestamp).getTime();
        return bDate - aDate; // newest first
      });
      setDetections(sorted);
    } catch (err) {
      console.error('Error retrieving detections', err);
    }
  };

  useEffect(() => {
    fetchDetections();
    getTags('wildlife')
      .then(setSpecies)
      .catch(err => console.error('Error retrieving species tags', err));
  }, []);


  const handleToggleSystem = (armed: boolean) => {
    setSystemStatus({ ...systemStatus, armed });
    toast.success(armed ? "System armed" : "System disarmed");
  };

  const handleTagSpecies = (detection: Detection) => {
    setSelectedDetection(detection);
    setDialogOpen(true);
  };

  const handleSaveSpecies = async (species: string) => {
    if (selectedDetection) {
      // re-fetch detections to get the latest data after tagging
      await fetchDetections();
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
            value={detections.length}
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
            <Tabs value={filter} onValueChange={(v) => {
              setFilter(v as DetectionCategory | "all");
              setCurrentPage(1); // Reset to first page when filter changes
            }}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                <TabsTrigger value="intruder">Intruders</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedDetections.map((detection) => (
              <DetectionCard
                key={detection._id}
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

          {/* Pagination Controls */}
          {filteredDetections.length > 0 && totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
