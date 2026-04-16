import { Appointment } from "@/src/domain/appointment/model/appointment";
import { AppointmentListSection } from "./AppointmentListSection";

type Props = {
  appointments: Appointment[];
};

const isSameLocalDate = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export function AppointmentList({ appointments }: Props) {
  const now = new Date();

  const todayAppointments = appointments.filter((appointment) =>
    isSameLocalDate(new Date(appointment.scheduledAt), now)
  );

  const upComingAppointments = appointments.filter((appointment) => {
    const scheduledAt = new Date(appointment.scheduledAt);

    if (isSameLocalDate(scheduledAt, now)) {
      return false;
    }

    return scheduledAt > now;
  });

  const pastAppointments = appointments.filter((appointment) => {
    const scheduledAt = new Date(appointment.scheduledAt);

    return !isSameLocalDate(scheduledAt, now) && scheduledAt < now;
  });

  return (
    <div className="space-y-6">
      <AppointmentListSection
        title="今日の予約"
        description="本日対応予定の予約です。"
        appointments={todayAppointments}
        emptyMessage="今日の予約はありません。"
      />

      <AppointmentListSection
        title="今後の予約"
        description="明日以降に予定されている予約です。"
        appointments={upComingAppointments}
        emptyMessage="今日の予約はありません。"
      />

      <AppointmentListSection
        title="過去の予約"
        description="対応日を過ぎた予約です。"
        appointments={pastAppointments}
        emptyMessage="過去の予約はありません。"
      />
    </div>
  );
}
