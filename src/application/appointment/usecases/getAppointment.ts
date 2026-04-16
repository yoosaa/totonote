import { Appointment } from "@/src/domain/appointment/model/appointment";
import { AppointmentRepository } from "../ports/appointmentRepository";

type GetAppointmentParams = {
  repository: AppointmentRepository;
  appointmentId: string;
};

export const getAppointment = async ({
  repository,
  appointmentId,
}: GetAppointmentParams): Promise<Appointment | null> => {
  return repository.getById(appointmentId);
};
