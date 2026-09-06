import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-cloud bg-paper">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink">
          OmniHub
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate">
          <Link href="/" className="hover:text-ink">
            Dashboard
          </Link>
          <Link href="/celebrities" className="hover:text-ink">
            Directory
          </Link>
        </nav>
      </div>
    </header>
  );
}
