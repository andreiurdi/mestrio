import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProviderCardProps = {
  name: string;
  category: string;
  location: string;
  rating: number | string;
  verified: boolean;
};

export function ProviderCard({ name, category, location, rating, verified }: ProviderCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-semibold">{name}</span>
              <span className="text-sm text-muted-foreground">
                {category} · {location}
              </span>
            </div>
          </div>
          {verified ? <Badge variant="secondary">Verified</Badge> : null}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">★ {rating}</span>
          <Button>Message</Button>
        </div>
      </CardContent>
    </Card>
  );
}
