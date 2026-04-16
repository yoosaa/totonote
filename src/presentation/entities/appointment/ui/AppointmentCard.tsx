import { Appointment } from "@/src/domain/appointment/model/appointment";
import { calculatePreparationProgress } from "@/src/domain/appointment/services/calculatePreparationProgress";
import Link from "next/link";
import { StatusBadge } from "../../status-badge/ui/StatusBadge";

type Props = {
  appointment: Appointment;
};

const formatScheduleAt = (value: string): string => {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export function AppointmentCard({ appointment }: Props) {
  const progress = calculatePreparationProgress(appointment.preparationItems);
  const hasVisitNote = appointment.visitNote.body.trim().length > 0;

  return (
    <Link
      href={`/appointments/${appointment.id}`}
      className="block rounded-lg border p-4 transition hover:bg-muted/40"
    >
      <article className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-lg font-semibold">{appointment.customerName}</p>
            <p className="text-sm text-muted-foreground">
              {appointment.serviceName}
            </p>
          </div>

          <StatusBadge status={appointment.status} />
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="space-y-1">
            <dt className="text-muted-foreground">予約日時</dt>
            <dd>{formatScheduleAt(appointment.scheduledAt)}</dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">事前準備</dt>
            <dd>
              {progress.totalCount === 0
                ? "未登録"
                : `${progress.checkedCount}/${progress.totalCount} 完了`}
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">予約メモ</dt>
            <dd>{hasVisitNote ? "あり" : "なし"}</dd>
          </div>
        </dl>

        {appointment.note ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {appointment.note}
          </p>
        ) : null}
      </article>
    </Link>
  );
}
