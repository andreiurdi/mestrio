import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProviderCard() {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">John Doe</div>
          <div className="text-sm text-muted-foreground">Electrician · Bucharest</div>
        </div>
        <Badge>Verified</Badge>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">⭐ 4.8</div>
        <Button size="sm">Message</Button>
      </div>
    </Card>
  );
}
