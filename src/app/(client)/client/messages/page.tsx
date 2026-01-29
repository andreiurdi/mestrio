import { PageHeader } from "@/components/mestrio/PageHeader";
import { Card } from "@/components/ui/card";
import { ConversationItem } from "@/components/mestrio/ConversationItem";
import { Input } from "@/components/ui/input";

export default function ClientMessagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle="Chat with workers" />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="p-4 space-y-4">
          <Input placeholder="Search conversations..." />
          <div className="space-y-3">
            <ConversationItem name="Ion Electrician" preview="Sure, I can come tomorrow morning." unread />
            <ConversationItem name="Mihai Zugrav" preview="Can you share a few photos of the room?" />
            <ConversationItem name="Ana Instalator" preview="My rate is 150 RON/hour. Works for you?" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Select a conversation to view messages.</div>

          <div className="mt-6 h-[420px] rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">Chat area placeholder</div>
        </Card>
      </div>
    </div>
  );
}
