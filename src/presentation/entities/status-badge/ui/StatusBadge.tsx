import { AppointmentStatus } from "@/src/domain/appointment/model/appointmentStatus";

type Props = {
  status: AppointmentStatus;
};

const statusLabelMap: Record<AppointmentStatus, string> = {
  accepted: "受付済み",
  preparing: "準備中",
  completed: "対応完了",
};

const statusClassNameMap: Record<AppointmentStatus, string> = {
  accepted: "border-slate-300 bg-slate-50 text-slate-700",
  preparing: "border-amber-300 bg-amber-50 text-amber-700",
  completed: "border-emerald-300 bg-emerald-50 text-emerald-700",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${statusClassNameMap[status]}`}
    >
      {statusLabelMap[status]}
    </span>
  );
}
