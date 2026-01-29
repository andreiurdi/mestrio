import { PageHeader } from "@/components/mestrio/PageHeader";
import { StatCard } from "@/components/mestrio/StatCard";
import { ConversationItem } from "@/components/mestrio/ConversationItem";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Quick overview of your activity" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active conversations" value={3} />
        <StatCard label="Pending replies" value={1} />
        <StatCard label="Favorites" value={5} />
        <StatCard label="Reviews given" value={2} />
      </div>

      <div className="space-y-3">
        <div className="text-lg font-semibold">Recent messages</div>
        <div className="grid gap-3">
          <ConversationItem name="Ion Electrician" preview="Sure, I can come tomorrow morning." unread />
          <ConversationItem name="Mihai Zugrav" preview="Can you share a few photos of the room?" />
          <ConversationItem name="Ana Instalator" preview="My rate is 150 RON/hour. Works for you?" />
        </div>
      </div>
    </div>
  );
}
