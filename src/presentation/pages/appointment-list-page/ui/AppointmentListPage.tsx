"use client";

import { Appointment } from "@/src/domain/appointment/model/appointment";
import Link from "next/link";
import { AppointmentList } from "../../../widgets/appointment-list/ui/AppointmentList";
import { useEffect, useState } from "react";
import { listAppointments } from "@/src/application/appointment/usecases/listAppointments";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";

export function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await listAppointments({
        repository: localStorageAppointmentRepository,
      });

      setAppointments(result);
      setIsLoading(false);
    };

    void load();
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">予約一覧</h1>
          <p className="text-sm text-muted-foreground">
            予約情報、事前準備、来店後メモをまとめて確認できます。
          </p>
          <p className="text-xs text-muted-foreground">
            保存された情報の取り扱いについては{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
        </div>

        <Link
          href="/appointments/new"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          新しい予約
        </Link>
      </header>

      {isLoading ? (
        <section className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">読み込み中です…</p>
        </section>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </main>
  );
}
