import { ProviderCard } from "@/components/mestrio/ProviderCard";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Find local workers</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
      </div>
    </div>
  );
}
