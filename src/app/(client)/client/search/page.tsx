import { PageHeader } from "@/components/mestrio/PageHeader";
import { Card } from "@/components/ui/card";
import { ProviderCard } from "@/components/mestrio/ProviderCard";

export default function ClientSearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Search" subtitle="Find trusted local workers" />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="p-4 space-y-4 h-fit">
          <div className="font-semibold">Filters</div>
          <div className="text-sm text-muted-foreground">(We’ll add Category, City, Rating, Verified in the next step)</div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <ProviderCard />
          <ProviderCard />
          <ProviderCard />
          <ProviderCard />
        </div>
      </div>
    </div>
  );
}
