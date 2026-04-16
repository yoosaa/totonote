"use client";

import { getAppointment } from "@/src/application/appointment/usecases/getAppointment";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";
import { AppointmentEditor } from "@/src/presentation/widgets/appointment-editor/ui/AppointmentEditor";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  appointmentId: string;
};

export function AppointmentEditPage({ appointmentId }: Props) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await getAppointment({
        repository: localStorageAppointmentRepository,
        appointmentId,
      });

      setAppointment(result);
      setIsLoading(false);
    };

    void load();
  }, [appointmentId]);

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-8">
        <section className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">読み込み中です...</p>
        </section>
      </main>
    );
  }

  if (!appointment) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-8">
        <section className="space-y-4 rounded-lg border p-6">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">予約が見つかりません</h1>
            <p className="text-sm text-muted-foreground">
              指定された予約は存在しないか、削除された可能性があります。
            </p>
          </div>

          <Link
            href="/appointments"
            className="inline-flex rounded-md border px-4 py-2 text-sm font-medium"
          >
            予約一覧へ戻る
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">予約を編集</h1>
          <p className="text-sm text-muted-foreground">
            顧客情報やメモを更新できます。
          </p>
        </div>

        <Link
          href={`/appointments/${appointment.id}`}
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          詳細へ戻る
        </Link>
      </header>

      <AppointmentEditor mode="edit" appointment={appointment} />
    </main>
  );
}
