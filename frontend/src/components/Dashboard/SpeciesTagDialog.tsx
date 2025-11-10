import { useState } from "react";
import { Detection } from "@/types/detection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SpeciesTagDialogProps {
  detection: Detection | null;
  open: boolean;
  onClose: () => void;
  onSave: (species: string) => void;
}

export const SpeciesTagDialog = ({ detection, open, onClose, onSave }: SpeciesTagDialogProps) => {
  const [species, setSpecies] = useState("");

  const handleSave = () => {
    if (species.trim()) {
      onSave(species);
      setSpecies("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tag Species</DialogTitle>
          <DialogDescription>
            Identify the species detected in this image
          </DialogDescription>
        </DialogHeader>
        {detection && (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                src={detection.imageUrl}
                alt="Detection"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species Name</Label>
              <Input
                id="species"
                placeholder="e.g., Red Fox, Eastern Gray Squirrel"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
