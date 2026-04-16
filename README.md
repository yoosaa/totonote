# Totonote

Totonote は、小規模店舗・個人事業向けの予約受付メモ＋来店準備管理ツールです。

予約情報、顧客メモ、事前準備、来店後メモをひとつの流れとして扱い、対応の抜け漏れを減らすことを目的としています。

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Vitest
- localStorage

## データ保存について

現在の MVP 版では、入力データはブラウザの localStorage に保存されます。  
サーバーや外部データベースには保存されません。

## セットアップ

```bash
pnpm install
pnpm dev
```
