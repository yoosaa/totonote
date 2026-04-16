import { Appointment } from "@/src/domain/appointment/model/appointment";
import { StatusBadge } from "@/src/presentation/entities/status-badge/ui/StatusBadge";

type Props = {
  appointment: Appointment;
};

const formatDateTime = (value: string): string => {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export function AppointmentSummary({ appointment }: Props) {
  return (
    <section className="space-y-4 rounded-lg border p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{appointment.customerName}</h2>
          <p className="text-sm text-muted-foreground">
            {appointment.serviceName}
          </p>
        </div>

        <StatusBadge status={appointment.status} />
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <dt className="text-sm font-medium">予約日時</dt>
          <dd className="text-sm text-muted-foreground">
            {formatDateTime(appointment.scheduledAt)}
          </dd>
        </div>

        <div className="space-y-1">
          <dt className="text-sm font-medium">作成日時</dt>
          <dd className="text-sm text-muted-foreground">
            {formatDateTime(appointment.createdAt)}
          </dd>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <dt className="text-sm font-medium">予約メモ</dt>
          <dd className="text-sm text-muted-foreground whitespace-pre-wrap">
            {appointment.note || "未入力"}
          </dd>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <dt className="text-sm font-medium">来店後メモ</dt>
          <dd className="text-sm text-muted-foreground whitespace-pre-wrap">
            {appointment.visitNote.body || "未入力"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
