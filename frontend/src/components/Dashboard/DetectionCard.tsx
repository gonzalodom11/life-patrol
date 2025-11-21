import { Detection } from "@/types/detection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Thermometer, Droplets, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { time } from "console";

interface DetectionCardProps {
  detection: Detection;
  onTagSpecies?: (detection: Detection) => void;
}

export const DetectionCard = ({ detection, onTagSpecies }: DetectionCardProps) => {
  const typeColors = {
    wildlife: "bg-primary text-primary-foreground",
    intruder: "bg-orange-600 text-primary-foreground",
    unknown: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-medium">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={detection.imageUrl}
          alt="Detection"
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className={`absolute top-3 right-3 ${typeColors[detection.category]}`}>
          {detection.category.charAt(0).toUpperCase() + detection.category.slice(1)}
        </Badge>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium flex items-center gap-2">
              <Camera className="h-4 w-4" />
                {formatDistanceToNow(new Date(detection.timestamp), { addSuffix: true })}
            </div>
            {detection.tags && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Tag className="h-3 w-3" />
                {detection.tags.join(", ")}
              </p>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round(detection.confidence)}% confidence
          </div>
        </div>

        {(detection.temperature || detection.humidity) && (
          <div className="flex gap-4 text-xs text-muted-foreground">
            {detection.temperature && (
              <span className="flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                {detection.temperature}°C
              </span>
            )}
            {detection.humidity && (
              <span className="flex items-center gap-1">
                <Droplets className="h-3 w-3" />
                {detection.humidity}%
              </span>
            )}
          </div>
        )}

        {(detection.tags[0] === null || (detection.tags.length === 0 && detection.category === "wildlife")) && (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-orange-400"
            onClick={() => onTagSpecies?.(detection)}
          >
            <Tag className="h-4 w-4 mr-2 " />
            Tag Species
          </Button>
        )}
      </div>
    </Card>
  );
};
