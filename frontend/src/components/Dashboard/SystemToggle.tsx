import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, ShieldOff } from "lucide-react";

interface SystemToggleProps {
  armed: boolean;
  onToggle: (armed: boolean) => void;
}

export const SystemToggle = ({ armed, onToggle }: SystemToggleProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {armed ? (
            <div className="rounded-xl bg-gradient-nature p-3">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          ) : (
            <div className="rounded-xl bg-muted p-3">
              <ShieldOff className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-semibold">System Status</h3>
            <p className="text-sm text-muted-foreground">
              {armed ? "Armed - Monitoring active" : "Disarmed - Monitoring paused"}
            </p>
          </div>
        </div>
        <Switch checked={armed} onCheckedChange={onToggle} />
      </div>
    </Card>
  );
};
