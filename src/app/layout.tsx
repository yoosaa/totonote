import type { Metadata } from "next";
import "./globals.css";
import { AppFooter } from "../presentation/widgets/app-footer/ui/AppFooter";
import { ClarityProvider } from "../presentation/widgets/clarity-provider/ui/ClarityProvider";

export const metadata: Metadata = {
  title: {
    default: "Totonote",
    template: "%s | Totonote",
  },
  description:
    "Totonoteは、小規模店舗・個人事業向けの予約受付メモと来店準備管理をまとめて行える軽量ツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-background text-foreground">
        <div className="flex min-h-dvh flex-col">
          <div className="flex-1">{children}</div>
          <AppFooter />
        </div>
        <ClarityProvider
          projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""}
        />
      </body>
    </html>
  );
}
