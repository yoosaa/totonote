import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© Totonote</p>

        <nav className="flex items-center gap-4">
          <Link href="/appointments" className="hover:underline">
            予約一覧
          </Link>
          <Link href="/privacy" className="hover:underline">
            プライバシーポリシー
          </Link>
        </nav>
      </div>
    </footer>
  );
}
