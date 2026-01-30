import { PublicHeader } from "./PublicHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      {children}
    </div>
  );
}
