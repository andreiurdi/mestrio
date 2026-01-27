import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-background p-4">
      <nav className="space-y-2">
        <Link href="/" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
          Dashboard
        </Link>

        <Link href="/search" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
          Search
        </Link>

        <Link href="/messages" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
          Messages
        </Link>
      </nav>
    </aside>
  );
}
