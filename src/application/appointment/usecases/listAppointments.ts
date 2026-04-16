import { Appointment } from "@/src/domain/appointment/model/appointment";
import { AppointmentRepository } from "../ports/appointmentRepository";

type ListAppointmentsParams = {
  repository: AppointmentRepository;
};

const compareByScheduleAtAsc = (a: Appointment, b: Appointment): number => {
  return a.scheduledAt.localeCompare(b.scheduledAt);
};

export const listAppointments = async ({
  repository,
}: ListAppointmentsParams): Promise<Appointment[]> => {
  const appointments = await repository.list();

  return [...appointments].sort(compareByScheduleAtAsc);
};
