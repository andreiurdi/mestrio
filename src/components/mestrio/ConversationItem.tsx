import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function ConversationItem({ name, preview, unread }: { name: string; preview: string; unread?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 cursor-pointer">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-medium truncate">{name}</div>
          {unread ? <Badge variant="secondary">New</Badge> : null}
        </div>
        <div className="text-sm text-muted-foreground truncate">{preview}</div>
      </div>
    </div>
  );
}
