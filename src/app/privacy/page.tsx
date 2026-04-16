import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
        <p className="text-sm text-muted-foreground">
          Totonote における情報の取り扱いについて説明します。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. 取得する情報</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Totonote
          は、ユーザーが入力した予約情報、事前準備項目、来店後メモなどを取り扱います。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. 情報の保存場所</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          現在の MVP 版では、入力された情報はユーザーのブラウザ内の localStorage
          に保存されます。 運営者のサーバーへ送信・保存されることはありません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. アクセス解析について</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          今後、サービス改善のためにアクセス解析ツールを利用する場合があります。
          その際は、本ポリシーを更新し、利用する情報の内容を明記します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. 免責事項</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          ユーザー自身の端末・ブラウザ環境に起因するデータ消失や不具合について、開発者は責任を負いません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. 改定</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          本ポリシーは、必要に応じて変更されることがあります。
        </p>
      </section>
    </main>
  );
}
