import { Appointment } from "@/src/domain/appointment/model/appointment";
import { AppointmentCard } from "@/src/presentation/entities/appointment/ui/AppointmentCard";

type Props = {
  title: string;
  description?: string;
  appointments: Appointment[];
  emptyMessage: string;
};

export function AppointmentListSection({
  title,
  description,
  appointments,
  emptyMessage,
}: Props) {
  return (
    <section className="space-y-4 rounded-lg border p-4">
      <header className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <span className="text-sm text-muted-foreground">
            {appointments.length}件
          </span>
        </div>

        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>

      {appointments.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </section>
  );
}
