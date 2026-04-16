import { AppointmentEditor } from "@/src/presentation/widgets/appointment-editor/ui/AppointmentEditor";

export function AppointmentCreatePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">新しい予約</h1>
        <p className="text-sm text-muted-foreground">
          顧客情報、事前準備、来店後のメモの初期内容を確認できます。
        </p>
      </header>

      <AppointmentEditor mode="create" />
    </main>
  );
}
